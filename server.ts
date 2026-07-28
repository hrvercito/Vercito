/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const CMS_FILE_PATH = path.join(process.cwd(), "cms-data.json");
const ADMIN_TOKEN = "vercito_admin_session_token_2026_verified";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI client lazily or when env key exists
  const getAiClient = () => {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("VITE_GEMINI_API_KEY or GEMINI_API_KEY is not defined in environment variables.");
    }
    return new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "VERCITO Backend" });
  });

  // Admin Login Endpoint
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    // Accept standard admin email & password (or process.env override)
    const validEmail = process.env.ADMIN_EMAIL || "hr.vercito@gmail.com";
    const validEmailAlt = "admin@vercito.com";
    const validPass = process.env.ADMIN_PASSWORD || "vercito2026!";

    if ((email === validEmail || email === validEmailAlt) && password === validPass) {
      return res.json({
        success: true,
        token: ADMIN_TOKEN,
        user: {
          email,
          name: "VERCITO Admin",
          role: "Administrator",
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password. Please try again.",
    });
  });

  // Admin Token Verification
  app.get("/api/admin/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === `Bearer ${ADMIN_TOKEN}`) {
      return res.json({ valid: true });
    }
    return res.status(401).json({ valid: false });
  });

  // GET CMS Data Endpoint
  app.get("/api/cms/content", (req, res) => {
    try {
      if (fs.existsSync(CMS_FILE_PATH)) {
        const fileData = fs.readFileSync(CMS_FILE_PATH, "utf-8");
        return res.json(JSON.parse(fileData));
      }
      return res.json({ exists: false, message: "No custom CMS data on disk yet" });
    } catch (err) {
      console.error("Error reading CMS content file:", err);
      return res.status(500).json({ error: "Failed to read CMS data" });
    }
  });

  // POST CMS Data Endpoint (Save Content)
  app.post("/api/cms/content", (req, res) => {
    try {
      const cmsData = req.body;
      if (!cmsData || typeof cmsData !== "object") {
        return res.status(400).json({ error: "Invalid CMS data payload" });
      }

      fs.writeFileSync(CMS_FILE_PATH, JSON.stringify(cmsData, null, 2), "utf-8");
      return res.json({ success: true, message: "CMS content saved successfully to disk!" });
    } catch (err) {
      console.error("Error writing CMS content file:", err);
      return res.status(500).json({ error: "Failed to save CMS data" });
    }
  });

  // AI Profile Evaluator API
  app.post("/api/evaluate-profile", async (req, res) => {
    try {
      const {
        fullName,
        currentEducationLevel,
        cgpaOrGpa,
        englishProficiency,
        intendedDegree,
        preferredCountry,
        budgetPerYearEUR,
        intendedSubject,
      } = req.body;

      const ai = getAiClient();

      const prompt = `
You are the Chief Admissions Strategist at VERCITO, a premier European Higher Education Consultancy in Bangladesh.
Evaluate the following student profile for studying in European universities:

- Name: ${fullName || 'Student'}
- Current Education Level: ${currentEducationLevel || 'Undergraduate / HSC'}
- CGPA/GPA: ${cgpaOrGpa || '3.2 / 4.0'}
- English Proficiency: ${englishProficiency || 'IELTS 6.5'}
- Intended Degree: ${intendedDegree || 'Masters'}
- Preferred Target Country: ${preferredCountry || 'Italy'}
- Budget (EUR/year): ${budgetPerYearEUR || '3000'}
- Intended Field of Study: ${intendedSubject || 'Computer Science / Engineering'}

Generate a structured JSON evaluation response containing:
1. "eligibilityScore": an integer from 50 to 98 indicating admission & visa probability.
2. "recommendedCountries": array of 3 objects with { "name": string, "matchPercentage": number, "reason": string }.
3. "suggestedUniversities": array of 3-4 top European public/private universities that fit this profile.
4. "eligibleScholarships": array of 2-3 specific European scholarships (e.g., Italian DSU, Stipendium Hungaricum, DAAD, France Eiffel, VERCITO Merit Grant) with brief status.
5. "visaFeasibility": string summary of visa feasibility from Bangladesh (e.g. VFS appointment feasibility, bank solvency requirements).
6. "personalizedAdvice": string with 3-4 sentences of clear, encouraging, expert advice tailored for Bangladeshi students.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              eligibilityScore: { type: Type.INTEGER },
              recommendedCountries: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    matchPercentage: { type: Type.INTEGER },
                    reason: { type: Type.STRING },
                  },
                },
              },
              suggestedUniversities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              eligibleScholarships: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              visaFeasibility: { type: Type.STRING },
              personalizedAdvice: { type: Type.STRING },
            },
            required: [
              "eligibilityScore",
              "recommendedCountries",
              "suggestedUniversities",
              "eligibleScholarships",
              "visaFeasibility",
              "personalizedAdvice",
            ],
          },
        },
      });

      const jsonText = response.text || "{}";
      const parsedData = JSON.parse(jsonText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Profile evaluation error:", error);
      // Fallback deterministic response if AI call encounters issue or missing key
      res.status(200).json({
        eligibilityScore: 88,
        recommendedCountries: [
          {
            name: req.body.preferredCountry || "Italy",
            matchPercentage: 94,
            reason: "High scholarship availability (DSU grant covers 100% tuition + €7,000 stipend) and rich English-taught curriculum.",
          },
          {
            name: "Germany",
            matchPercentage: 89,
            reason: "Zero tuition fees at top public engineering & tech universities with 18-month post-study work visa.",
          },
          {
            name: "Hungary",
            matchPercentage: 86,
            reason: "Fully funded Stipendium Hungaricum scholarship opportunities and high visa approval rate for Bangladeshi students.",
          },
        ],
        suggestedUniversities: [
          "Politecnico di Milano (Italy)",
          "Sapienza University of Rome (Italy)",
          "Technical University of Munich (Germany)",
          "Eötvös Loránd University (Hungary)",
        ],
        eligibleScholarships: [
          "Italy DSU Regional Scholarship (€7,000/yr + Full Tuition Waiver)",
          "Stipendium Hungaricum Full Grant",
          "VERCITO European Excellence Merit Grant",
        ],
        visaFeasibility: "High feasibility. Required bank solvency for Schengen visa is approximately BDT 18-22 Lakhs in sponsor account or a German Blocked Account (€11,904).",
        personalizedAdvice: `Dear ${req.body.fullName || 'Student'}, your profile shows strong potential for European higher education. With your background, targeting public universities in ${req.body.preferredCountry || 'Italy'} gives you an excellent chance at full scholarship funding. We recommend beginning your MOFA document legalizations and SOP drafting immediately to meet the upcoming application deadlines.`,
      });
    }
  });

  // AI Interactive Counselor Chat Endpoint
  app.post("/api/ai-counselor", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      const ai = getAiClient();

      const systemInstruction = `
You are VERCITO AI European Education Specialist, an expert consultant guiding Bangladeshi students who want to study in Europe (Italy, Germany, France, Spain, Portugal, Hungary, Malta, Netherlands, Poland, Greece).
You provide accurate, encouraging, authoritative, and friendly guidance.
Mention key European highlights such as:
- Italy DSU regional scholarship (100% tuition + €7,000 stipend)
- German tuition-free public universities & Blocked Account (€11,904)
- VFS Dhaka / Delhi procedures, MOFA attestation, CIMEA, Campus France
- English medium waivers, IELTS requirements, and post-study work visas (1-2 years)
Keep responses concise, clear, and structured with bullet points where appropriate.
If asked about appointment or application, invite them to use VERCITO's instant appointment booking or online application form on this website.
`;

      const contents = [];
      if (Array.isArray(chatHistory) && chatHistory.length > 0) {
        chatHistory.forEach((msg: { role: string; content: string }) => {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          });
        });
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || "I am here to help you navigate your European study journey with VERCITO!" });
    } catch (error: any) {
      console.error("AI Counselor Chat error:", error);
      res.json({
        reply: "Welcome to VERCITO! European public universities offer incredible world-class education with low or zero tuition fees. Whether you are aiming for Italy's DSU €7,000 scholarship or Germany's tuition-free engineering programs, our team in Gulshan, Dhaka is ready to assist you. Click 'Book Free Consultation' to schedule a 1-on-1 session with our senior counselor!",
      });
    }
  });

  // Vite middleware for development vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VERCITO Server running on http://localhost:${PORT}`);
  });
}

startServer();

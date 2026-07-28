/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ProfileEvaluationInput, ProfileEvaluationResult } from "../types";

/**
 * Returns the Gemini API key from import.meta.env or process.env
 */
export function getGeminiApiKey(): string {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
  }
  return "";
}

/**
 * Creates and returns an instance of GoogleGenAI if an API key is available.
 */
export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

/**
 * Evaluates a student profile directly using Gemini API.
 */
export async function evaluateProfileWithGemini(
  formData: ProfileEvaluationInput
): Promise<ProfileEvaluationResult> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error("VITE_GEMINI_API_KEY environment variable is missing.");
  }

  const prompt = `
You are the Chief Admissions Strategist at VERCITO, a premier European Higher Education Consultancy in Bangladesh.
Evaluate the following student profile for studying in European universities:

- Name: ${formData.fullName || "Student"}
- Current Education Level: ${formData.currentEducationLevel || "Undergraduate / HSC"}
- CGPA/GPA: ${formData.cgpaOrGpa || "3.2 / 4.0"}
- English Proficiency: ${formData.englishProficiency || "IELTS 6.5"}
- Intended Degree: ${formData.intendedDegree || "Masters"}
- Preferred Target Country: ${formData.preferredCountry || "Italy"}
- Budget (EUR/year): ${formData.budgetPerYearEUR || "3000"}
- Intended Field of Study: ${formData.intendedSubject || "Computer Science / Engineering"}

Generate a structured JSON evaluation response containing:
1. "eligibilityScore": an integer from 50 to 98 indicating admission & visa probability.
2. "recommendedCountries": array of 3 objects with { "name": string, "matchPercentage": number, "reason": string }.
3. "suggestedUniversities": array of 3-4 top European public/private universities that fit this profile.
4. "eligibleScholarships": array of 2-3 specific European scholarships (e.g., Italian DSU, Stipendium Hungaricum, DAAD, France Eiffel, VERCITO Merit Grant) with brief status.
5. "visaFeasibility": string summary of visa feasibility from Bangladesh.
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

  const text = response.text || "{}";
  return JSON.parse(text) as ProfileEvaluationResult;
}

/**
 * Handles AI counselor live chat using Gemini API.
 */
export async function chatWithGeminiCounselor(
  message: string,
  chatHistory: { role: string; content: string }[]
): Promise<string> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error("VITE_GEMINI_API_KEY environment variable is missing.");
  }

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

  const contents: any[] = [];
  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    chatHistory.forEach((msg) => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      });
    });
  }
  contents.push({ role: "user", parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text || "I am here to help you navigate your European study journey with VERCITO!";
}

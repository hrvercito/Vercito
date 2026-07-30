/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentAccount } from '../types';

interface AuthContextType {
  currentUser: StudentAccount | null;
  allStudents: StudentAccount[];
  isLoggedIn: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: Omit<StudentAccount, 'id' | 'registeredAt' | 'status'>) => Promise<{ success: boolean; user?: StudentAccount; message?: string }>;
  logout: () => void;
  switchUser: (studentId: string) => void;
  updateProfile: (updatedData: Partial<StudentAccount>) => void;
}

const SEEDED_STUDENTS: StudentAccount[] = [
  {
    id: 'USR-1001',
    fullName: 'Tanvir Hossain',
    email: 'tanvir@gmail.com',
    phone: '+880 1812 345678',
    district: 'Dhaka',
    dateOfBirth: '2001-05-15',
    nationality: 'Bangladeshi',
    fullAddress: 'House 42, Road 11, Banani, Dhaka-1213',
    registeredAt: '2026-01-10',
    status: 'Active',
  },
  {
    id: 'USR-1002',
    fullName: 'Nusrat Jahan',
    email: 'nusrat@gmail.com',
    phone: '+880 1711 987654',
    district: 'Chittagong',
    dateOfBirth: '2002-08-20',
    nationality: 'Bangladeshi',
    fullAddress: 'GEC Circle, Nasirabad, Chittagong',
    registeredAt: '2026-02-01',
    status: 'Active',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allStudents, setAllStudents] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem('vercito_all_students');
      return saved ? JSON.parse(saved) : SEEDED_STUDENTS;
    } catch {
      return SEEDED_STUDENTS;
    }
  });

  const [currentUser, setCurrentUser] = useState<StudentAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem('vercito_current_user');
      return savedUser ? JSON.parse(savedUser) : SEEDED_STUDENTS[0]; // Default logged in as Student A
    } catch {
      return SEEDED_STUDENTS[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vercito_all_students', JSON.stringify(allStudents));
    } catch {
      // ignore
    }
  }, [allStudents]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('vercito_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('vercito_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const login = async (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    let found = allStudents.find((s) => s.email.toLowerCase() === cleanEmail);

    if (!found) {
      // Auto-create account for seamless demo or quick login if user types new email
      const newId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
      found = {
        id: newId,
        fullName: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        phone: '+880 1800 000000',
        district: 'Dhaka',
        dateOfBirth: '2001-01-01',
        nationality: 'Bangladeshi',
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'Active',
      };
      setAllStudents((prev) => [...prev, found!]);
    }

    setCurrentUser(found);
    return { success: true, message: `Welcome back, ${found.fullName}!` };
  };

  const register = async (data: Omit<StudentAccount, 'id' | 'registeredAt' | 'status'>) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = allStudents.find((s) => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: StudentAccount = {
      ...data,
      id: newId,
      registeredAt: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    setAllStudents((prev) => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    return { success: true, user: newStudent, message: 'Registration successful!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (studentId: string) => {
    const found = allStudents.find((s) => s.id === studentId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const updateProfile = (updatedData: Partial<StudentAccount>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setAllStudents((prev) => prev.map((s) => (s.id === currentUser.id ? updatedUser : s)));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allStudents,
        isLoggedIn: !!currentUser,
        login,
        register,
        logout,
        switchUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

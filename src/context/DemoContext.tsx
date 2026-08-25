"use client";

import React, { createContext, useContext, useState } from 'react';
import {
  PatientProfile,
  Medication,
  SymptomLog,
  Remedy,
  TimelineEvent,
  DEMO_PATIENT,
  DEMO_MEDICATIONS,
  DEMO_SYMPTOM,
  AYURBOOK_REMEDIES,
  DEMO_INTERACTION_RESULT,
  INITIAL_TIMELINE
} from '@/data/mockData';

export type DemoStep = 
  | 'LANDING'                 // Welcome Screen
  | 'SIGN_UP'                 // Create Account Screen
  | 'LOG_IN'                  // Log In Screen
  | 'FORGOT_PASSWORD'         // Password Reset Screen
  | 'VERIFY_EMAIL'            // Email Verification Screen
  | 'POST_SIGNUP_SETUP'       // Let's set up your recovery
  | 'MANUAL_MEDICINE_ENTRY'   // Enter Your Medicines (Form)
  | 'PRESCRIPTION_UPLOAD'     // Add Prescription (Upload & Scan)
  | 'ONBOARDING'              // Patient Overview
  | 'MEDICATIONS'             // Active Medicines
  | 'DASHBOARD'               // Recovery Hub
  | 'SYMPTOM_CHECKIN'         // Symptom Check-in
  | 'SAFETY_GATE'             // Red-Flag Safety Gate
  | 'AYURBOOK'                // AyurBook Explorer
  | 'REMEDY_DETAIL'           // Remedy Detail
  | 'INTERACTION_RESULT'      // Medicine x Remedy Check
  | 'TIMELINE'                // Recovery Timeline
  | 'PROFILE';                // Profile & Settings

export const STEP_ORDER: DemoStep[] = [
  'LANDING',
  'SIGN_UP',
  'LOG_IN',
  'FORGOT_PASSWORD',
  'VERIFY_EMAIL',
  'POST_SIGNUP_SETUP',
  'MANUAL_MEDICINE_ENTRY',
  'PRESCRIPTION_UPLOAD',
  'ONBOARDING',
  'MEDICATIONS',
  'DASHBOARD',
  'SYMPTOM_CHECKIN',
  'SAFETY_GATE',
  'AYURBOOK',
  'REMEDY_DETAIL',
  'INTERACTION_RESULT',
  'TIMELINE',
  'PROFILE'
];

export const STEP_LABELS: Record<DemoStep, { title: string; subtitle: string }> = {
  LANDING: { title: "Welcome", subtitle: "CareConnect Safety Companion" },
  SIGN_UP: { title: "Create Account", subtitle: "Sign Up for CareConnect" },
  LOG_IN: { title: "Welcome back", subtitle: "Log In to Your Account" },
  FORGOT_PASSWORD: { title: "Reset Password", subtitle: "Recover Your Account" },
  VERIFY_EMAIL: { title: "Verify Email", subtitle: "Confirm Email Verification" },
  POST_SIGNUP_SETUP: { title: "Setup Recovery", subtitle: "Upload or Add Medicines" },
  MANUAL_MEDICINE_ENTRY: { title: "Enter Medicines", subtitle: "Manual Prescription Entry" },
  PRESCRIPTION_UPLOAD: { title: "Scan Prescription", subtitle: "Upload & Extract Medicines" },
  ONBOARDING: { title: "Patient Overview", subtitle: "Recovery Profile" },
  MEDICATIONS: { title: "Active Medicines", subtitle: "Prescriptions & Dosage" },
  DASHBOARD: { title: "Recovery Hub", subtitle: "Day 1 Progress Tracker" },
  SYMPTOM_CHECKIN: { title: "Symptom Check-in", subtitle: "Log How You Feel" },
  SAFETY_GATE: { title: "Red-Flag Safety Gate", subtitle: "Emergency Triage Check" },
  AYURBOOK: { title: "AyurBook Explorer", subtitle: "Herbal Remedy Library" },
  REMEDY_DETAIL: { title: "Remedy Detail", subtitle: "Ginger Tea Profile" },
  INTERACTION_RESULT: { title: "Interaction Matrix", subtitle: "Medicine × Remedy Check" },
  TIMELINE: { title: "Recovery Timeline", subtitle: "Recovery Journey" },
  PROFILE: { title: "Profile & Settings", subtitle: "User Account & Privacy" }
};

interface DemoContextType {
  currentStep: DemoStep;
  stepIndex: number;
  setStep: (step: DemoStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  patient: PatientProfile;
  medications: Medication[];
  realUserMedicines: Medication[];
  addUserMedicine: (med: Omit<Medication, 'id'>) => void;
  deleteUserMedicine: (id: string) => void;
  updateUserMedicine: (id: string, updated: Partial<Medication>) => void;
  verifyAndSaveMedicines: () => void;
  symptom: SymptomLog;
  updateSymptom: (symptomName: string, severity: number, notes: string) => void;
  selectedRemedy: Remedy;
  setSelectedRemedy: (remedy: Remedy) => void;
  interactionResult: typeof DEMO_INTERACTION_RESULT;
  timeline: TimelineEvent[];
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  resetDemo: () => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('LANDING');
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Real user medications list - starts completely EMPTY!
  const [realUserMedicines, setRealUserMedicines] = useState<Medication[]>([]);

  const [symptom, setSymptom] = useState<SymptomLog>(DEMO_SYMPTOM);
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy>(AYURBOOK_REMEDIES[0]);
  const [interactionResult] = useState(DEMO_INTERACTION_RESULT);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  // Active medications: if Demo Mode -> return Ananya's demo medicines. If Real User -> return realUserMedicines (starts EMPTY).
  const medications = isDemoMode ? DEMO_MEDICATIONS : realUserMedicines;

  // Active patient profile: if Demo Mode -> Ananya. If Real User -> Real User Profile.
  const patient: PatientProfile = isDemoMode ? DEMO_PATIENT : {
    name: "Recovery Patient",
    age: 29,
    gender: "User",
    condition: "Post-Discharge Recovery",
    dischargeDate: "Today",
    recoveryDay: 1,
    totalRecoveryDays: 14,
    doctorName: "Attending Physician",
    hospitalName: "CareConnect Health"
  };

  const setStep = (step: DemoStep) => {
    setCurrentStep(step);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (stepIndex < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[stepIndex + 1]);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStep(STEP_ORDER[stepIndex - 1]);
    }
  };

  const addUserMedicine = (newMedData: Omit<Medication, 'id'>) => {
    const id = `user-med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMed: Medication = {
      ...newMedData,
      id
    };
    setRealUserMedicines(prev => [...prev, newMed]);
  };

  const deleteUserMedicine = (id: string) => {
    setRealUserMedicines(prev => prev.filter(m => m.id !== id));
  };

  const updateUserMedicine = (id: string, updated: Partial<Medication>) => {
    setRealUserMedicines(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const verifyAndSaveMedicines = () => {
    // Navigate to Recovery Dashboard after verifying
    setStep('DASHBOARD');
  };

  const updateSymptom = (symptomName: string, severity: number, notes: string) => {
    setSymptom(prev => ({
      ...prev,
      symptom: symptomName,
      severity,
      notes,
      timestamp: 'Just now'
    }));
  };

  const addTimelineEvent = (newEvent: Omit<TimelineEvent, 'id'>) => {
    const id = `tl-${Date.now()}`;
    setTimeline(prev => [
      ...prev,
      { ...newEvent, id }
    ]);
  };

  const resetDemo = () => {
    setIsDemoMode(false);
    setRealUserMedicines([]);
    setSymptom(DEMO_SYMPTOM);
    setSelectedRemedy(AYURBOOK_REMEDIES[0]);
    setCurrentStep('LANDING');
  };

  return (
    <DemoContext.Provider
      value={{
        currentStep,
        stepIndex,
        setStep,
        nextStep,
        prevStep,
        patient,
        medications,
        realUserMedicines,
        addUserMedicine,
        deleteUserMedicine,
        updateUserMedicine,
        verifyAndSaveMedicines,
        symptom,
        updateSymptom,
        selectedRemedy,
        setSelectedRemedy,
        interactionResult,
        timeline,
        addTimelineEvent,
        resetDemo,
        isDemoMode,
        setIsDemoMode
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

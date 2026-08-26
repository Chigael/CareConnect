"use client";

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  PatientProfile,
  Medication,
  SymptomLog,
  Remedy,
  TimelineEvent,
  EMPTY_SYMPTOM,
  AYURBOOK_REMEDIES,
  INITIAL_TIMELINE
} from '@/data/mockData';

export type DemoStep = 
  | 'LANDING'                 // Welcome Screen
  | 'SIGN_UP'                 // Create Account Screen
  | 'LOG_IN'                  // Log In Screen
  | 'FORGOT_PASSWORD'         // Password Reset Screen
  | 'LANGUAGE_SELECTION'      // Post-signup Language Selection
  | 'POST_SIGNUP_SETUP'       // Setup Recovery
  | 'MANUAL_MEDICINE_ENTRY'   // Enter Your Medicines (Form)
  | 'PRESCRIPTION_UPLOAD'     // Add Prescription (Upload & Scan)
  | 'ONBOARDING'              // Patient Overview
  | 'MEDICATIONS'             // Active Medicines
  | 'DASHBOARD'               // Recovery Hub (Home)
  | 'SYMPTOM_CHECKIN'         // Symptom Check-in
  | 'SAFETY_GATE'             // Red-Flag Safety Gate
  | 'AYURBOOK'                // AyurBook & Safety Checker
  | 'REMEDY_DETAIL'           // Remedy Detail
  | 'INTERACTION_RESULT'      // Medicine x Remedy Check
  | 'TIMELINE'                // Recovery Timeline
  | 'PROFILE';                // Profile & Settings

export const STEP_ORDER: DemoStep[] = [
  'LANDING',
  'SIGN_UP',
  'LOG_IN',
  'FORGOT_PASSWORD',
  'LANGUAGE_SELECTION',
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
  LOG_IN: { title: "Welcome Back", subtitle: "Log In to Your Account" },
  FORGOT_PASSWORD: { title: "Reset Password", subtitle: "Recover Your Account" },
  LANGUAGE_SELECTION: { title: "Language Selection", subtitle: "Choose Preferred Language" },
  POST_SIGNUP_SETUP: { title: "Setup Recovery", subtitle: "Upload or Add Medicines" },
  MANUAL_MEDICINE_ENTRY: { title: "Enter Medicines", subtitle: "Manual Prescription Entry" },
  PRESCRIPTION_UPLOAD: { title: "Scan Prescription", subtitle: "Upload & Extract Medicines" },
  ONBOARDING: { title: "Patient Overview", subtitle: "Recovery Profile" },
  MEDICATIONS: { title: "Active Medicines", subtitle: "Prescriptions & Dosage Schedule" },
  DASHBOARD: { title: "Care Dashboard", subtitle: "CareConnect Home" },
  SYMPTOM_CHECKIN: { title: "Symptom Check-in", subtitle: "Log How You Feel" },
  SAFETY_GATE: { title: "Red-Flag Safety Gate", subtitle: "Emergency Triage Check" },
  AYURBOOK: { title: "AyurBook Library", subtitle: "Herbal Remedies & Safety Checks" },
  REMEDY_DETAIL: { title: "Remedy Detail", subtitle: "Herbal Remedy Profile" },
  INTERACTION_RESULT: { title: "Interaction Matrix", subtitle: "Medicine × Remedy Check" },
  TIMELINE: { title: "Recovery Timeline", subtitle: "Care History & Milestones" },
  PROFILE: { title: "Profile & Settings", subtitle: "User Account & Privacy" }
};

export const STEP_TO_SLUG: Record<DemoStep, string> = {
  LANDING: 'landing',
  SIGN_UP: 'sign-up',
  LOG_IN: 'log-in',
  FORGOT_PASSWORD: 'forgot-password',
  LANGUAGE_SELECTION: 'language-selection',
  POST_SIGNUP_SETUP: 'post-signup-setup',
  MANUAL_MEDICINE_ENTRY: 'manual-medicine-entry',
  PRESCRIPTION_UPLOAD: 'prescription-upload',
  ONBOARDING: 'onboarding',
  MEDICATIONS: 'medications',
  DASHBOARD: 'dashboard',
  SYMPTOM_CHECKIN: 'symptom-checkin',
  SAFETY_GATE: 'safety-gate',
  AYURBOOK: 'ayurbook',
  REMEDY_DETAIL: 'remedy-detail',
  INTERACTION_RESULT: 'interaction-result',
  TIMELINE: 'timeline',
  PROFILE: 'profile'
};

export const SLUG_TO_STEP: Record<string, DemoStep> = Object.entries(STEP_TO_SLUG).reduce(
  (acc, [step, slug]) => {
    acc[slug] = step as DemoStep;
    return acc;
  },
  {} as Record<string, DemoStep>
);

interface DemoContextType {
  currentStep: DemoStep;
  stepIndex: number;
  setStep: (step: DemoStep, options?: { replace?: boolean }) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  treatedCondition: string;
  setTreatedCondition: (condition: string) => void;
  patient: PatientProfile;
  medications: Medication[];
  realUserMedicines: Medication[];
  missedMedications: Medication[];
  addUserMedicine: (med: Omit<Medication, 'id'>) => void;
  deleteUserMedicine: (id: string) => void;
  updateUserMedicine: (id: string, updated: Partial<Medication>) => void;
  updateMedicationReminderTime: (id: string, reminderTime: string) => void;
  recordDosageAdherence: (id: string, status: 'TAKEN' | 'SKIPPED' | 'SNOOZED') => void;
  markDoseAsTaken: (id: string) => void;
  simulateMissedDose: (id: string) => void;
  activeReminderMedication: Medication | null;
  setActiveReminderMedication: (med: Medication | null) => void;
  verifyAndSaveMedicines: () => void;
  symptom: SymptomLog;
  updateSymptom: (symptomName: string, severity: number, notes: string) => void;
  selectedRemedy: Remedy;
  setSelectedRemedy: (remedy: Remedy) => void;
  ayurbookLockUntil: number | null;
  submitRemedyConfirmation: (remedyId: string, isDoing: boolean, response: string, notes?: string) => void;
  unlockAyurbook: () => void;
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState<DemoStep>('LANDING');

  // Selected Language preference - defaults to English
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  // Treatment condition (e.g. Diabetes, Diarrhea, Post-Op Recovery)
  const [treatedCondition, setTreatedCondition] = useState<string>('');

  // Real user medications list
  const [realUserMedicines, setRealUserMedicines] = useState<Medication[]>([]);

  // Active triggering reminder medication for Modal
  const [activeReminderMedication, setActiveReminderMedication] = useState<Medication | null>(null);

  // User Logged Symptoms
  const [realUserSymptom, setRealUserSymptom] = useState<SymptomLog>(EMPTY_SYMPTOM);
  const symptom = realUserSymptom;

  const [selectedRemedy, setSelectedRemedy] = useState<Remedy>(AYURBOOK_REMEDIES[0]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(INITIAL_TIMELINE);

  const stepIndex = STEP_ORDER.indexOf(currentStep);

  // Sync currentStep with browser URL and history
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const getStepFromUrl = (): DemoStep | null => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('step');
      if (slug && SLUG_TO_STEP[slug]) {
        return SLUG_TO_STEP[slug];
      }
      return null;
    };

    const initialStepFromUrl = getStepFromUrl();
    let activeStep = initialStepFromUrl || (user ? 'DASHBOARD' : 'LANDING');

    if (user && (activeStep === 'LANDING' || activeStep === 'LOG_IN' || activeStep === 'SIGN_UP' || activeStep === 'FORGOT_PASSWORD')) {
      activeStep = 'DASHBOARD';
    }

    if (activeStep !== currentStep) {
      setCurrentStep(activeStep);
    }

    // Initialize history state
    const url = new URL(window.location.href);
    url.searchParams.set('step', STEP_TO_SLUG[activeStep]);
    window.history.replaceState({ step: activeStep }, '', url.toString());

    // Listen for browser back/forward buttons, trackpad gestures, mobile back gestures
    const handlePopState = (event: PopStateEvent) => {
      let targetStep: DemoStep | null = null;

      if (event.state && event.state.step && STEP_ORDER.includes(event.state.step)) {
        targetStep = event.state.step;
      } else {
        targetStep = getStepFromUrl();
      }

      if (targetStep) {
        setCurrentStep(targetStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user]);

  const medications = realUserMedicines;

  // Missed medications list (status === 'SKIPPED')
  const missedMedications = medications.filter(m => m.reminderStatus === 'SKIPPED');

  // Active patient profile: Real User Profile or generic fallback
  const patient: PatientProfile = {
    name: profile?.fullName || profile?.firstName || "Patient",
    age: profile?.age || 30,
    gender: "User",
    condition: treatedCondition.trim() || "General Recovery",
    dischargeDate: "Today",
    doctorName: "Attending Physician",
    hospitalName: "CareConnect Health"
  };

  const setStep = (step: DemoStep, options?: { replace?: boolean }) => {
    if (step === currentStep) return;

    setCurrentStep(step);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const url = new URL(window.location.href);
      url.searchParams.set('step', STEP_TO_SLUG[step]);

      if (options?.replace) {
        window.history.replaceState({ step }, '', url.toString());
      } else {
        window.history.pushState({ step }, '', url.toString());
      }
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

  const addTimelineEvent = (eventData: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...eventData,
      id: `tl-${Date.now()}`
    };
    setTimelineEvents(prev => [newEvent, ...prev]);
  };

  const addUserMedicine = (newMedData: Omit<Medication, 'id'>) => {
    const id = `user-med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMed: Medication = {
      ...newMedData,
      id,
      reminderTime: newMedData.reminderTime || '08:00 AM',
      reminderStatus: 'PENDING'
    };
    setRealUserMedicines(prev => [...prev, newMed]);

    addTimelineEvent({
      day: 1,
      date: 'Today',
      title: `Added Medication: ${newMedData.name}`,
      description: `Prescribed dosage: ${newMedData.dosage || 'Standard'} (${newMedData.frequency || 'Daily'})`,
      category: 'MEDICATION',
      status: 'COMPLETED',
      badgeColor: 'teal'
    });
  };

  const deleteUserMedicine = (id: string) => {
    setRealUserMedicines(prev => prev.filter(m => m.id !== id));
  };

  const updateUserMedicine = (id: string, updated: Partial<Medication>) => {
    setRealUserMedicines(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const updateMedicationReminderTime = (id: string, reminderTime: string) => {
    setRealUserMedicines(prev => prev.map(m => m.id === id ? { ...m, reminderTime } : m));
  };

  const recordDosageAdherence = (id: string, status: 'TAKEN' | 'SKIPPED' | 'SNOOZED') => {
    setRealUserMedicines(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          reminderStatus: status,
          nextDose: status === 'TAKEN' ? 'Completed for today' : status === 'SKIPPED' ? 'Missed today' : 'Snoozed 15 min'
        };
      }
      return m;
    }));

    const med = realUserMedicines.find(m => m.id === id);
    if (med) {
      addTimelineEvent({
        day: 1,
        date: 'Today',
        title: `Dose ${status === 'TAKEN' ? 'Taken' : status === 'SKIPPED' ? 'Skipped' : 'Snoozed'}: ${med.name}`,
        description: `Scheduled for ${med.reminderTime || 'Today'}`,
        category: 'MEDICATION',
        status: status === 'TAKEN' ? 'COMPLETED' : 'CURRENT',
        badgeColor: status === 'TAKEN' ? 'emerald' : status === 'SKIPPED' ? 'rose' : 'amber'
      });
    }
    setActiveReminderMedication(null);
  };

  const markDoseAsTaken = (id: string) => {
    recordDosageAdherence(id, 'TAKEN');
  };

  const simulateMissedDose = (id: string) => {
    recordDosageAdherence(id, 'SKIPPED');
  };

  const verifyAndSaveMedicines = () => {
    setStep('DASHBOARD');
  };

  const updateSymptom = (symptomName: string, severity: number, notes: string) => {
    const updatedSymptom: SymptomLog = {
      id: `symp-${Date.now()}`,
      symptom: symptomName,
      severity,
      onsetTime: 'Just now',
      notes,
      timestamp: 'Just now',
      isRedFlag: false
    };

    setRealUserSymptom(updatedSymptom);

    addTimelineEvent({
      day: 1,
      date: 'Today',
      title: `Logged Symptom: ${symptomName}`,
      description: `Severity: ${severity}/10. ${notes || ''}`,
      category: 'SYMPTOM',
      status: 'COMPLETED',
      badgeColor: 'amber'
    });
  };

  // AyurBook 25-minute Lock / Cooldown state
  const [ayurbookLockUntil, setAyurbookLockUntil] = useState<number | null>(null);

  const submitRemedyConfirmation = (remedyId: string, isDoing: boolean, response: string, notes?: string) => {
    const lockExpiry = Date.now() + 25 * 60 * 1000;
    setAyurbookLockUntil(lockExpiry);

    addTimelineEvent({
      day: 1,
      date: 'Today',
      title: `Checked Remedy: ${selectedRemedy.name}`,
      description: `User action: ${response}`,
      category: 'REMEDY',
      status: 'COMPLETED',
      badgeColor: 'indigo'
    });
  };

  const unlockAyurbook = () => {
    setAyurbookLockUntil(null);
  };

  const resetDemo = () => {
    setRealUserMedicines([]);
    setTreatedCondition('');
    setAyurbookLockUntil(null);
    setRealUserSymptom(EMPTY_SYMPTOM);
    setSelectedRemedy(AYURBOOK_REMEDIES[0]);
    setTimelineEvents(INITIAL_TIMELINE);
    setStep('LANDING', { replace: true });
  };

  return (
    <DemoContext.Provider
      value={{
        currentStep,
        stepIndex,
        setStep,
        nextStep,
        prevStep,
        selectedLanguage,
        setSelectedLanguage,
        treatedCondition,
        setTreatedCondition,
        patient,
        medications,
        realUserMedicines,
        missedMedications,
        addUserMedicine,
        deleteUserMedicine,
        updateUserMedicine,
        updateMedicationReminderTime,
        recordDosageAdherence,
        markDoseAsTaken,
        simulateMissedDose,
        activeReminderMedication,
        setActiveReminderMedication,
        verifyAndSaveMedicines,
        symptom,
        updateSymptom,
        selectedRemedy,
        setSelectedRemedy,
        ayurbookLockUntil,
        submitRemedyConfirmation,
        unlockAyurbook,
        timelineEvents,
        addTimelineEvent,
        resetDemo
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

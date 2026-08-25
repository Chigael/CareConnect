"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { SignUpScreen } from '@/components/screens/SignUpScreen';
import { LogInScreen } from '@/components/screens/LogInScreen';
import { ForgotPasswordScreen } from '@/components/screens/ForgotPasswordScreen';
import { LanguageSelectionScreen } from '@/components/screens/LanguageSelectionScreen';
import { PostSignUpSetupScreen } from '@/components/screens/PostSignUpSetupScreen';
import { ManualMedicineEntryScreen } from '@/components/screens/ManualMedicineEntryScreen';
import { PrescriptionUploadScreen } from '@/components/screens/PrescriptionUploadScreen';
import { OnboardingScreen } from '@/components/screens/OnboardingScreen';
import { MedicationListScreen } from '@/components/screens/MedicationListScreen';
import { RecoveryDashboardScreen } from '@/components/screens/RecoveryDashboardScreen';
import { SymptomCheckinScreen } from '@/components/screens/SymptomCheckinScreen';
import { SafetyGateScreen } from '@/components/screens/SafetyGateScreen';
import { AyurBookScreen } from '@/components/screens/AyurBookScreen';
import { RemedyDetailScreen } from '@/components/screens/RemedyDetailScreen';
import { InteractionResultScreen } from '@/components/screens/InteractionResultScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { DosageReminderModal } from '@/components/modals/DosageReminderModal';

export default function Home() {
  const { currentStep } = useDemo();
  const { user, isDemoMode, isLoading } = useAuth();

  // Public unauthenticated screens
  const isPublicScreen = 
    currentStep === 'LANDING' || 
    currentStep === 'SIGN_UP' || 
    currentStep === 'LOG_IN' || 
    currentStep === 'FORGOT_PASSWORD';

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'LANDING':
        return <LandingScreen />;
      case 'SIGN_UP':
        return <SignUpScreen />;
      case 'LOG_IN':
        return <LogInScreen />;
      case 'FORGOT_PASSWORD':
        return <ForgotPasswordScreen />;
      case 'LANGUAGE_SELECTION':
        return <LanguageSelectionScreen />;
      case 'POST_SIGNUP_SETUP':
        return <PostSignUpSetupScreen />;
      case 'MANUAL_MEDICINE_ENTRY':
        return <ManualMedicineEntryScreen />;
      case 'PRESCRIPTION_UPLOAD':
        return <PrescriptionUploadScreen />;
      case 'ONBOARDING':
        return <OnboardingScreen />;
      case 'MEDICATIONS':
        return <MedicationListScreen />;
      case 'DASHBOARD':
        return <RecoveryDashboardScreen />;
      case 'SYMPTOM_CHECKIN':
        return <SymptomCheckinScreen />;
      case 'SAFETY_GATE':
        return <SafetyGateScreen />;
      case 'AYURBOOK':
        return <AyurBookScreen />;
      case 'REMEDY_DETAIL':
        return <RemedyDetailScreen />;
      case 'INTERACTION_RESULT':
        return <InteractionResultScreen />;
      case 'PROFILE':
        return <ProfileScreen />;
      default:
        return <LandingScreen />;
    }
  };

  // Protected Route Guard
  if (!isPublicScreen && !user && !isDemoMode && !isLoading) {
    return (
      <>
        <LogInScreen />
        <DosageReminderModal />
      </>
    );
  }

  return (
    <>
      {renderCurrentScreen()}
      <DosageReminderModal />
    </>
  );
}

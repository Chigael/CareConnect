import { DemoStep } from "@/context/DemoContext";

export const AUTH_STEPS: DemoStep[] = [
  "LANDING",
  "LOG_IN",
  "SIGN_UP",
  "FORGOT_PASSWORD",
];

export const isAppNavigationVisible = (
  currentStep: DemoStep,
): boolean => {
  return !AUTH_STEPS.includes(currentStep);
};
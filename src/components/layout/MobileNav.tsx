"use client";

import React from "react";
import { useDemo, DemoStep } from "@/context/DemoContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Home,
  Pill,
  BookOpen,
  Clock,
} from "lucide-react";

export const MobileNav: React.FC = () => {
  const { currentStep, setStep } = useDemo();
  const { t } = useLanguage();

  if (
    currentStep === "LANDING" ||
    currentStep === "LOG_IN" ||
    currentStep === "SIGN_UP" ||
    currentStep === "FORGOT_PASSWORD"
  ) {
    return null;
  }

  const navItems: {
    step: DemoStep;
    label: string;
    icon: React.ReactNode;
    matchSteps: DemoStep[];
  }[] = [
    {
      step: "DASHBOARD",
      label: t.nav.home,
      icon: <Home className="h-5 w-5" />,
      matchSteps: ["DASHBOARD", "SYMPTOM_CHECKIN"],
    },
    {
      step: "MEDICATIONS",
      label: t.nav.medicines,
      icon: <Pill className="h-5 w-5" />,
      matchSteps: [
        "MEDICATIONS",
        "MANUAL_MEDICINE_ENTRY",
        "PRESCRIPTION_UPLOAD",
        "ONBOARDING",
      ],
    },
    {
      step: "AYURBOOK",
      label: t.nav.ayurbook,
      icon: <BookOpen className="h-5 w-5" />,
      matchSteps: [
        "AYURBOOK",
        "SAFETY_GATE",
        "INTERACTION_RESULT",
        "REMEDY_DETAIL",
      ],
    },
    {
      step: "TIMELINE",
      label: t.nav.timeline,
      icon: <Clock className="h-5 w-5" />,
      matchSteps: ["TIMELINE"],
    },
  ];

  return (
    <>
      {/* Mobile bottom navigation */}
      <nav
        className="
          lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 z-50 shadow-xl rounded-full px-5 py-2 items-center gap-3 transition-all
        "
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = item.matchSteps.includes(currentStep);

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setStep(item.step)}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  px-3
                  py-1
                  transition
                  ${
                    isActive
                      ? `
                        bg-brand-50
                        font-bold
                        text-brand-600
                        dark:bg-brand-950/60
                        dark:text-brand-400
                      `
                      : `
                        text-slate-500
                        hover:text-slate-800
                        dark:text-slate-400
                        dark:hover:text-slate-200
                      `
                  }
                `}
              >
                {item.icon}

                <span className="mt-0.5 text-[10px] font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
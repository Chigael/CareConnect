"use client";

import React from "react";
import { useDemo, DemoStep } from "@/context/DemoContext";
import { isAppNavigationVisible } from "./navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Home,
  Pill,
  BookOpen,
  Clock,
} from "lucide-react";

type SidebarNavItem = {
  step: DemoStep;
  label: string;
  icon: React.ReactNode;
  matchSteps: DemoStep[];
};

export const DashboardSidebar: React.FC = () => {
  const { currentStep, setStep } = useDemo();
  const { t } = useLanguage();

  if (!isAppNavigationVisible(currentStep)) {
  return null;
}

  const navItems: SidebarNavItem[] = [
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
    <aside
      className="
        hidden
        lg:flex
        fixed
        pt-3
        left-0
        top-16
        bottom-0
        z-40
        w-64
        flex-col
        border-r
        border-slate-200
        bg-white
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="flex flex-1 flex-col overflow-y-auto p-6">

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.matchSteps.includes(currentStep);

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setStep(item.step)}
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-brand-600
                        to-teal-600
                        text-white
                        shadow-md
                        shadow-brand-500/20
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                        dark:hover:text-white
                      `
                  }
                `}
              >
                {/* Icon */}
                <span
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-colors
                    ${
                      isActive
                        ? "bg-white/15 text-white"
                        : `
                          bg-slate-100
                          text-slate-500
                          group-hover:bg-brand-50
                          group-hover:text-brand-600
                          dark:bg-slate-800
                          dark:text-slate-400
                          dark:group-hover:bg-slate-700
                          dark:group-hover:text-brand-400
                        `
                    }
                  `}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className={`
                    flex-1
                    text-sm
                    ${
                      isActive
                        ? "font-bold"
                        : "font-medium"
                    }
                  `}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Recovery status */}
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
          <div
            className="
              rounded-2xl
              border
              border-brand-100
              bg-gradient-to-br
              from-brand-50
              to-teal-50
              p-4
              dark:border-brand-900/40
              dark:from-brand-950/40
              dark:to-teal-950/30
            "
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-75
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Recovery status
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Keep checking in daily to stay on top of your recovery.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
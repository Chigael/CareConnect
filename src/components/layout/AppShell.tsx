"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { isAppNavigationVisible } from "./navigation";

type AppShellProps = {
  children: React.ReactNode;
};

/** Keeps dashboard content clear of the fixed desktop sidebar. */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { currentStep } = useDemo();
  const hasAppNavigation = isAppNavigationVisible(currentStep);

  return (
    <main className={hasAppNavigation ? "flex-1 lg:ml-64" : "flex-1"}>
      {children}
    </main>
  );
};

export default AppShell;
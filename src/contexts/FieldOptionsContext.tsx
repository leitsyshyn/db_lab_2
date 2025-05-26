// src/contexts/FieldOptionsContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Option } from "@/components/ui/combobox";

export type FieldOptionsMap = Record<string, Option[]>;

const FieldOptionsContext = createContext<FieldOptionsMap | undefined>(
  undefined
);

interface FieldOptionsProviderProps {
  options: FieldOptionsMap;
  children: ReactNode;
}

export function FieldOptionsProvider({
  options,
  children,
}: FieldOptionsProviderProps) {
  return (
    <FieldOptionsContext.Provider value={options}>
      {children}
    </FieldOptionsContext.Provider>
  );
}

export function useFieldOptions(): FieldOptionsMap {
  const ctx = useContext(FieldOptionsContext);
  if (!ctx) {
    throw new Error(
      "useFieldOptions must be used within a <FieldOptionsProvider>"
    );
  }
  return ctx;
}

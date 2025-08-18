import { COLORS } from "@/constants";

export type Priority = 'high' | 'medium' | 'low'

export interface PriorityOption {
  value?: Priority;   // undefined = no priority
  color: string;
  icon: string;
  label: string;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: undefined, color: COLORS.text.tertiary, icon: 'flag', label: 'None' },
  { value: 'low', color: COLORS.success, icon: 'flag', label: 'Low' },
  { value: 'medium', color: COLORS.warning, icon: 'flag', label: 'Medium' },
  { value: 'high', color: COLORS.danger, icon: 'flag', label: 'High' },
];

// Helper to quickly look up a priority option
export function getPriorityOption(value?: Priority): PriorityOption {
  return PRIORITY_OPTIONS.find((opt) => opt.value === value)!;
}
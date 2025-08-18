import { MaterialIcons } from "@expo/vector-icons";

export type Category = string;

interface CategoryOption {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { name: "Work", icon: "work", color: "#FF9800" },
  { name: "Romance", icon: "favorite", color: "#E91E63" },
  { name: "Money", icon: "attach-money", color: "#4CAF50" },
  { name: "Health", icon: "self-improvement", color: "#2196F3" },
  { name: "Kids", icon: "child-care", color: "#9C27B0" },
  { name: "Friends", icon: "group", color: "#03A9F4" },
  { name: "Home", icon: "home", color: "#FF5722" },
  { name: "Fun", icon: "celebration", color: "#8BC34A" },
];

export function getCategoryOption(name?: Category): CategoryOption | undefined {
  return CATEGORY_OPTIONS.find((opt) => opt.name === name);
}

export function formatCategoryIcon(
  name?: Category,
  isSelected: boolean = false
): { icon: keyof typeof MaterialIcons.glyphMap; color: string } | undefined {
  const option = getCategoryOption(name);
  if (!option) return undefined;
  return {
    icon: option.icon,
    color: isSelected ? "#FFF" : option.color,
  };
}
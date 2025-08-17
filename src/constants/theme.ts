export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: {
    primary: '#000000',
    secondary: '#8E8E93',
    tertiary: '#C7C7CC',
  },
  border: '#C6C6C8',
  shadow: '#000000',
} as const;

export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.secondary] as [string, string],
  secondary: [COLORS.surface, COLORS.border] as [string, string],
  success: [COLORS.success, '#30D158'] as [string, string],
  warning: [COLORS.warning, '#FF8E00'] as [string, string],
  danger: [COLORS.danger, '#FF2D55'] as [string, string],
} as const;

export const GRADIENT_DIRECTIONS = {
  horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  subtle: { start: { x: 0, y: 0 }, end: { x: 0.3, y: 0 } }, // Less dramatic for small buttons
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 50,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

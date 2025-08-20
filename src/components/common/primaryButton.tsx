import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, GRADIENTS, GRADIENT_DIRECTIONS } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function PrimaryButton({ title, onPress, variant = 'primary' }: ButtonProps) {
  const gradientColors = variant === 'primary' 
    ? GRADIENTS.primary
    : GRADIENTS.secondary;

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={GRADIENT_DIRECTIONS.subtle.start}
        end={GRADIENT_DIRECTIONS.subtle.end}
      >
        <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryText]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    margin: BORDER_RADIUS.lg
  },
  gradient: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  secondaryText: {
    color: COLORS.text.primary,
  },
});
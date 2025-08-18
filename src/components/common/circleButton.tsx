import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { BORDER_RADIUS, SHADOWS } from '@/constants';

interface Props {
  size?: number;
  color?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function CircleButton({
  size = 56,
  color = 'white',
  onPress,
  children,
  style,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.circle,
        { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
        style
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '@/src/constants';
import { CircleButton } from '@/src/components/common/circleButton';

export type Priority = 'high' | 'medium' | 'low';

interface PrioritySelectorProps {
  value?: Priority; // optional because undefined means "no priority"
  onChange: (priority: Priority | undefined) => void;
}

const PRIORITY_OPTIONS: { value?: Priority; color: string; icon: string }[] = [
  { value: undefined, color: COLORS.text.tertiary, icon: 'flag' }, // no priority
  { value: 'low', color: COLORS.success, icon: 'flag' },
  { value: 'medium', color: COLORS.warning, icon: 'flag' },
  { value: 'high', color: COLORS.danger, icon: 'flag' },
];

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <View style={styles.container}>
      {PRIORITY_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <CircleButton
            key={option.value ?? 'none'}
            size={40}
            color={isSelected ? option.color : COLORS.surface}
            onPress={() => onChange(option.value)}
            style={styles.circle}
          >
            <MaterialIcons
              name={option.icon as any}
              size={20}
              color={isSelected ? COLORS.background : option.color}
            />
          </CircleButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.sm,
  },
  circle: {
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '@/constants';
import { CircleButton } from '@/components/common/circleButton';
import { PRIORITY_OPTIONS, Priority } from '@/types';

interface PrioritySelectorProps {
  value?: Priority; // optional because undefined means "no priority"
  onChange: (priority: Priority | undefined) => void;
}

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



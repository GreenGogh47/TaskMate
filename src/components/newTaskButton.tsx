import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/src/constants';

interface NewTaskButtonProps {
  onPress: () => void;
}

// Since navigation is screen-level logic
// It's cleaner to handle routing in the page
// Finding all the routing through different components
// Sounds like a migrane waiting to happen

export function NewTaskButton({ onPress }: NewTaskButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialIcons name="add-task" size={28} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    ...SHADOWS.lg,
  },
});
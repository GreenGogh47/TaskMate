import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDueDate } from '@/utils';
import { COLORS, SPACING, FONT_SIZES } from '@/constants';
import { getPriorityOption } from '@/types';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        {task.priority !== undefined && (() => {
          const option = getPriorityOption(task.priority);
          return (
            <MaterialIcons
              name={option.icon as any}
              size={20}
              color={option.color}
            />
          );
        })()}
      </View>
      {task.description && <Text style={styles.description}>{task.description}</Text>}
      {task.dueDate && <Text style={styles.dueDate}>Due: {formatDueDate(task.dueDate)}</Text>}
      {task.category && <Text style={styles.category}>{task.category}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  description: {
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  dueDate: {
    marginTop: SPACING.xs,
    fontStyle: 'italic',
    color: COLORS.text.tertiary,
  },
  category: {
    marginTop: SPACING.xs,
    color: COLORS.text.primary,
  },
});
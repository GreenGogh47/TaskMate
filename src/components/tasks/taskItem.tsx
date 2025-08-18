import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDueDate } from '@/utils';
import { COLORS, SPACING, FONT_SIZES } from '@/constants';
import { getPriorityOption, getCategoryOption } from '@/types';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        {(() => {
          const pri = getPriorityOption(task.priority);
          if (!pri) return null;
          return (
            <MaterialIcons
              name={pri.icon as any}
              size={20}
              color={pri.color}
            />
          );
        })()}
      </View>
      {task.description && <Text style={styles.description}>{task.description}</Text>}
      
      <View style={styles.header}>
      {task.dueDate && <Text style={styles.dueDate}>Due: {formatDueDate(task.dueDate)}</Text>}
      {task.category && (() => {
          const cat = getCategoryOption(task.category);
          if (!cat) return null;
          return (
            <MaterialIcons
              name={cat.icon as any}
              size={20}
              color={cat.color}
            />
          );
        })()}
      </View>
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
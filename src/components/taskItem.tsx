import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '@/src/types';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDueDate } from '@/src/utils';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        {task.priority && (
          <MaterialIcons
            name={task.priority === 'high' ? 'priority-high' : 'low-priority'}
            size={20}
            color={task.priority === 'high' ? 'red' : 'gray'}
          />
        )}
      </View>
      {task.description && <Text style={styles.description}>{task.description}</Text>}
      {task.dueDate && <Text style={styles.dueDate}>Due: {formatDueDate(task.dueDate)}</Text>}
      {task.category && <Text style={styles.category}>{task.category}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    marginTop: 4,
  },
  dueDate: {
    marginTop: 4,
    fontStyle: 'italic',
    color: '#888',
  },
  category: {
    marginTop: 4,
    color: '#333',
  },
});
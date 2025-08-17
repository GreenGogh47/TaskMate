import React from 'react';
import { FlatList } from 'react-native';
import { Task } from '@/src/types';
import TaskItem from './taskItem';

type TasksListProps = {
  tasks: Task[];
};

export default function TasksList({ tasks }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.taskId}
      renderItem={({ item }) => <TaskItem task={item} />}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} // Add bottom padding for floating button
    />
  );
}
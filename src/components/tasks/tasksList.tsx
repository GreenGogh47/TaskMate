import React from 'react';
import { FlatList } from 'react-native';
import { Task } from '@/types';
import TaskItem from '@/components/tasks/taskItem';

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
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} // Add bottom padding for floating button
    />
  );
}
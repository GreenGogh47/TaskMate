import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { taskService } from '@/src/services/taskService';
import { TaskForm, PrimaryButton, TasksList } from '@/src/components';
import { useAuth } from '@/src/hooks/useAuth';
import { Task } from '@/src/types';
import { authService } from '@/src/services/userService';

export default function TasksScreen() {
  const user = useAuth();
  // Using the hook should trigger a re-render with an updated user.
  // Instead of relying on memory, it's listening actively.
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks and provides live uptdates with onSnapshot
  useEffect(() => {
    if (!user) return;

    const unsubscribe = taskService.subscribeToUserTasks(user.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
    });

    // Cleanup / stop listening on unmount
    // Without this we would keep an open websocket to Firestore FOREVERRRRR!!! lol
    return () => unsubscribe();
  }, [user]);

  // // Show loading while the auth hook does it's job
  // if (user === undefined) {
  //   return (
  //     // todo: Loading Screen / if auth is undefined then it's still loacing
  //   );
  // }

  // // Show message if not authenticated (shouldn't happen due to route protection, but good fallback)
  // if (!user) {
  //   return (
  //     // "Please log in to view tasks"
  //   );
  // }

  return (
    <View style={{ flex: 1, padding: 20 }}>
    <PrimaryButton title="Log Out" onPress={() => authService.signOut()} />

      <TaskForm />
      <TasksList
        tasks={tasks}
      />

    </View>
  );
}
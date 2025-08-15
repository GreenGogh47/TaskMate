import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { taskService } from '@/src/services/taskService';
import { PrimaryButton, TasksList, NewTaskButton, LoadingSpinner } from '@/src/components';
import { ErrorBoundary } from '@/src/utils';
import { useAuth } from '@/src/hooks/useAuth';
import { Task } from '@/src/types';
import { authService } from '@/src/services/userService';
import { useRouter } from 'expo-router';
import { SPACING } from '@/src/constants';

export default function TasksScreen() {
  const user = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Load tasks and provides live updates with onSnapshot
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const unsubscribe = taskService.subscribeToUserTasks(user.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
    });

    // Cleanup / stop listening on unmount
    return () => unsubscribe();
  }, [user]);

  // Show loading while the auth hook does its job
  if (user === undefined) {
    return <LoadingSpinner message="Loading user..." />;
  }

  // Show message if not authenticated (shouldn't happen due to route protection)
  if (!user) {
    return (
      <View style={styles.container}>
        <PrimaryButton title="Please log in to view tasks" onPress={() => router.push('/public/login')} />
      </View>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <PrimaryButton 
          title="Error loading tasks. Tap to retry." 
          onPress={() => setError(null)} 
          variant="secondary"
        />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <PrimaryButton title="Log Out" onPress={() => authService.signOut()} />
        <TasksList tasks={tasks} />
        <NewTaskButton onPress={() => router.push('/auth/tasks/new')} />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
  },
});
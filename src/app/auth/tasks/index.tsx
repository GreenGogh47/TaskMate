import React, { useState, useEffect } from 'react';
import { taskService } from '@/services/taskService';
import { PrimaryButton, LoadingSpinner, ScreenWrapper } from '@/components/common';
import { TasksList, NewTaskButton } from '@/components/tasks';
import { CategorySelector } from '@/components/tasks/fields';
import { ErrorBoundary } from '@/utils';
import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types';
import { authService } from '@/services/userService';
import { useRouter } from 'expo-router';

export default function TasksScreen() {
  const user = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | undefined>(undefined);

  const displayedTasks = tasks
    .filter((task) => {
    if (!filterCategory) return true;
    return task.category === filterCategory;
  })

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
      <ScreenWrapper>
        <PrimaryButton title="Please log in to view tasks" onPress={() => router.push('/public/login')} />
      </ScreenWrapper>
    );
  }

  if (loading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  if (error) {
    return (
      <ScreenWrapper>
        <PrimaryButton 
          title="Error loading tasks. Tap to retry." 
          onPress={() => setError(null)} 
          variant="secondary"
        />
      </ScreenWrapper>
    );
  }

  return (
    <ErrorBoundary>
      <ScreenWrapper hasVirtualizedList>
        <CategorySelector value={filterCategory} onChange={setFilterCategory} />
        <TasksList tasks={displayedTasks} />
        <PrimaryButton title="Log Out" onPress={() => authService.signOut()} />
        <NewTaskButton onPress={() => router.push('/auth/tasks/new')} />
      </ScreenWrapper>
    </ErrorBoundary>
  );
}
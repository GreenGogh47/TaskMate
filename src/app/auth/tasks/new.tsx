import React from 'react';
import { TaskForm, ScreenWrapper } from '@/src/components';
import { useAuth } from '@/src/hooks/useAuth';

export default function NewTaskScreen() {
  const user = useAuth();

  if (!user) return null;

  return (
    <ScreenWrapper>
      <TaskForm />
    </ScreenWrapper>
  );
}
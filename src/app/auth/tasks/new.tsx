import React from 'react';
import { TaskForm } from '@/components/tasks';
import { ScreenWrapper } from '@/components/common';
import { useAuth } from '@/hooks/useAuth';

export default function NewTaskScreen() {
  const user = useAuth();

  if (!user) return null;

  return (
    <ScreenWrapper>
      <TaskForm />
    </ScreenWrapper>
  );
}
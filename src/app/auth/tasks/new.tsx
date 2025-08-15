import React from 'react';
import { View } from 'react-native';
import { TaskForm } from '@/src/components';
import { useAuth } from '@/src/hooks/useAuth';

export default function NewTaskScreen() {
  const user = useAuth();

  if (!user) return null;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TaskForm />
    </View>
  );
}
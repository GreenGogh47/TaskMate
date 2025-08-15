// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { taskService } from '@/src/services/taskService';
import { handleAuthError } from '@/src/utils';
import { FormInput } from './formInput';
import { PrimaryButton } from './primaryButton';

export default function TaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const createTask = async () => {
    try {
      if (!title.trim()) return; // Translation: if title.strip.empty?
      setLoading(true); // Disables the task creation button until resolved.

      const taskId = await taskService.createTask({
        title,
        description,
        category
      });

      console.log('Task created with ID:', taskId);

      setTitle('');
      setDescription('');
      setCategory('');

      onTaskCreated?.();
    } catch (error) {
      console.error('Task creation error:', error);
      handleAuthError(error, 'Task Creation Error');
    } finally {
      setLoading(false); // Enabling the task creation button again.
    }
  };

  return (
    <View style={{ gap: 10 }}>
      <FormInput value={title} onChangeText={setTitle} placeholder="Task Name" />
      <FormInput value={description} onChangeText={setDescription} placeholder="Description" />
      <FormInput value={category} onChangeText={setCategory} placeholder="Category" />

      <PrimaryButton title="Create Task" onPress={createTask} />
    </View>
  );
}
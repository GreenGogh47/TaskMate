import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { taskService } from '@/src/services/taskService';
import { handleAuthError } from '@/src/utils';
import { Timestamp } from 'firebase/firestore';
import { FormInput } from './formInput';
import { PrimaryButton } from './primaryButton';
import { DueDatePicker } from "./dueDateSelector";
import { Priority, PrioritySelector } from "./prioritySelector";
import { Category, CategorySelector } from "./categorySelector";

export default function TaskForm({ onTaskCreated }: { onTaskCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const descriptionRef = useRef<TextInput>(null);

  const createTask = async () => {
    try {
      if (!title.trim()) return; // Translation: if title.strip.empty?
      setLoading(true); // Disables the task creation button until resolved.

      const taskId = await taskService.createTask({
        title,
        description,
        priority,
        dueDate: dueDate ? Timestamp.fromDate(dueDate) : undefined,
        category
      });

      console.log('Task created with ID:', taskId);

      // Reset form
      setTitle('');
      setDescription('');
      setPriority(undefined);
      setDueDate(undefined);
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
      <FormInput 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Task Name" 
        autoFocus={true}
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        blurOnSubmit={false}
      />
      <FormInput 
        ref={descriptionRef}
        value={description} 
        onChangeText={setDescription} 
        placeholder="Description" 
        returnKeyType="done"
        onSubmitEditing={createTask}
        blurOnSubmit={true}
        multiline
        numberOfLines={3}
      />
      
      <PrioritySelector value={priority} onChange={setPriority} />
      <DueDatePicker value={dueDate} onChange={setDueDate} />
      <CategorySelector value={category} onChange={setCategory}/>

      <PrimaryButton 
        title={loading ? "Creating..." : "Create Task"} 
        onPress={createTask}
      />
    </View>
  );
}
import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { taskService } from '@/services/taskService';
import { handleAuthError } from '@/utils';
import { Timestamp } from 'firebase/firestore';
import { FormInput } from '@/components/common/formInput';
import { PrimaryButton } from '@/components/common';
import { DueDatePicker, PrioritySelector, CategorySelector } from "@/components/tasks/fields";
import { Priority, Category } from '@/types';
import { Task } from '@/types';

export default function TaskForm({
  task,
  onTaskSaved,
}: {
  task?: Task;
  onTaskSaved?: () => void;
}) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState<Priority | undefined>(task?.priority);
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task?.dueDate ? task.dueDate.toDate?.() ?? task.dueDate : undefined
  );
  const [category, setCategory] = useState<Category | undefined>(task?.category);
  const [loading, setLoading] = useState(false);

  const descriptionRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    try {
      if (!title.trim()) return;
      setLoading(true);
  
      if (task) {
        // Update existing
        await taskService.updateTask(task.taskId, {
          title,
          description,
          priority,
          dueDate: dueDate ? Timestamp.fromDate(dueDate) : undefined,
          category,
        });
        console.log("Task updated:", task.taskId);
      } else {
        // Create new
        const taskId = await taskService.createTask({
          title,
          description,
          priority,
          dueDate: dueDate ? Timestamp.fromDate(dueDate) : undefined,
          category,
        });
        console.log("Task created with ID:", taskId);
      }
  
      onTaskSaved?.();
    } catch (err) {
      console.error("Task save error:", err);
      handleAuthError(err, "Task Save Error");
    } finally {
      setLoading(false);
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
        onSubmitEditing={handleSubmit}
        blurOnSubmit={true}
        multiline
        numberOfLines={3}
      />
      
      <PrioritySelector value={priority} onChange={setPriority} />
      <DueDatePicker value={dueDate} onChange={setDueDate} />
      <CategorySelector value={category} onChange={setCategory}/>

      <PrimaryButton 
        title={loading ? "Saving..." : task ? "Update Task" : "Create Task"} 
        onPress={handleSubmit}
      />
    </View>
  );
}
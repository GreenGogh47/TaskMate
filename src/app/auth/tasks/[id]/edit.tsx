import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TaskForm } from "@/components";
import { ScreenWrapper } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";
import { taskService } from "@/services/taskService";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuth();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const foundTask = await taskService.showTask(id);
        setTask(foundTask);
      } catch (err) {
        console.error("Failed to load task", err);
      }
    };

    fetchTask();
  }, [id]);

  if (!user) return null;
  if (!task) return null;

  return (
    <ScreenWrapper>
      <TaskForm task={task} />
    </ScreenWrapper>
  );
}
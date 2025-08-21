import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { taskService } from "@/services/taskService";
import { Task } from "@/types";
import { PrimaryButton } from "@/components/common";
import { TaskItem } from "@/components/tasks";

export default function TaskShow() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    taskService.showTask(id).then((fetched) => {
      setTask(fetched);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await taskService.deleteTask(id);
    router.back();
  };

  const handleEdit = () => {
    if (!id) return;
    router.push(`auth/tasks/${id}/edit`);
  };

  if (loading) return <ActivityIndicator />;
  if (!task) return <Text>Task not found</Text>;

  return (
    <View>
      <TaskItem task={task} />

      <PrimaryButton title="Edit Task" onPress={handleEdit} />
      <PrimaryButton title="Delete Task" onPress={handleDelete} />
    </View>
  );
}
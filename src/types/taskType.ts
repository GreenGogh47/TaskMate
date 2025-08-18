import { Timestamp, FieldValue } from "firebase/firestore";

export interface Task {
  taskId: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: Timestamp;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  isCompleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type NewTask = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}
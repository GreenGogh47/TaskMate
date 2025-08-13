import { Timestamp } from "firebase/firestore";

// Types (Classes)
interface User {
  userId: {
    email: string,
    displayName: string,
    profilePicture: string,
    createdAt: Timestamp
  }
}

interface Task {
  taskId: {
    userId: string,
    title: string,
    description?: string,
    dueDate: Timestamp,
    priority: 'high' | 'medium' | 'low',
    category: string,
    isCompleted: boolean,
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
}

export { User, Task }
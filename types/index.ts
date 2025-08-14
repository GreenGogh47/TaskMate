import { Timestamp } from "firebase/firestore";

// Types (Classes)
interface AppUser {
  userId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  createdAt: Timestamp;
}

interface Task {
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

export { AppUser, Task }

// User was renamed to AppUser because `User`
// to distinguish it from the user imported from firebase.
// See the authService.ts file.
import { Timestamp, FieldValue } from "firebase/firestore";

// Types (Classes)
interface AppUser {
  userId: string;
  email: string;
  displayName: string;
  profilePicture?: string;
  createdAt: Timestamp;
}

type NewAppUser = Omit<AppUser, 'createdAt'> & {
  createdAt: FieldValue;
};

// Firebase returns a `FieldValue`
// It's a special placeholder for "let the backend fill this in"
// When a User is created, it's a fieldvalue
// When a User is READ, then it's a Timestamp

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

type NewTask = Omit<Task, 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export { NewAppUser, AppUser, NewTask, Task }

// User was renamed to AppUser because `User`
// to distinguish it from the user imported from firebase.
// See the authService.ts file.
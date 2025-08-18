import { Timestamp, FieldValue } from "firebase/firestore";

// Types (Classes)
export interface AppUser {
  userId: string;
  email: string;
  displayName: string;
  profilePicture?: string;
  createdAt: Timestamp;
}

export type NewAppUser = Omit<AppUser, 'createdAt'> & {
  createdAt: FieldValue;
};

// Firebase returns a `FieldValue`
// It's a special placeholder for "let the backend fill this in"
// When a User is created, it's a fieldvalue
// When a User is READ, then it's a Timestamp
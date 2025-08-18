import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NewAppUser } from '@/types';
export type { FirebaseUser };

export const authService = {
  signUp: (email: string, password: string, displayName: string) => 
    createUserWithEmailAndPassword(auth, email, password),
  
  signIn: (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password),
  
  signOut: () => signOut(auth),

  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) =>
    onAuthStateChanged(auth, callback),
}

export const dbService = {
  newUserCreation: async (email: string, password: string, profile: Partial<NewAppUser>) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCred.user.uid), {
      userId: userCred.user.uid,
      email,
      ...profile,
      displayName: profile.displayName ?? email.split("@")[0],
      createdAt: serverTimestamp(),
    } satisfies NewAppUser);
    return userCred.user;
  },
};
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';
// To provide clarity between Firebase user data and the User typescript interface
import { auth } from '../config/firebase';

export const authService = {
  signUp: (email: string, password: string) => 
    createUserWithEmailAndPassword(auth, email, password),
  
  signIn: (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password),
  
  signOut: () => signOut(auth),

  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) =>
    onAuthStateChanged(auth, callback),
};
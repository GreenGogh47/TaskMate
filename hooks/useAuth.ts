import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User as FirebaseUser } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined); 
  // undefined = still loading, null = no user, User = signed in

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // null or User
    });
    return unsubscribe;
  }, []);

  return user;
}

// One place to manage persistence and user state logic
// Makes imports a tad cleaner
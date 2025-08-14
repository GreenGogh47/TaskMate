import { useState, useEffect } from 'react';
import { FirebaseUser, authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined); 
  // undefined = still loading, null = no user, User = signed in

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((FirebaseUser) => {
      setUser(FirebaseUser); // null or User
    });
    return unsubscribe;
  }, []);

  return user;
}

// One place to manage persistence and user state logic
// Makes imports a tad cleaner
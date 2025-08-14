import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NewAppUser } from '@/src/types';

export const dbService = {
  newUserCreation: async (email: string, password: string, profile: Partial<NewAppUser>) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCred.user.uid), {
      userId: userCred.user.uid,
      email,
      ...profile,
      displayName: profile.displayName ?? email.split("@")[0],
      //Default display name using the email.
      //todo: can this be edited in the AppUser profile yet?
      createdAt: serverTimestamp(),
    } satisfies NewAppUser);
    console.log("OUTPUT FOR bdService:", userCred.user);
    return userCred.user;
  },
};
import { auth, db } from '@/config/firebase';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { NewTask, Task } from '@/types';

export const taskService = {
  createTask: async (profile: Partial<NewTask>) => {
    if (!auth.currentUser) throw new Error("Not authenticated");

    const taskRef = doc(collection(db, 'tasks'));
    const taskId = taskRef.id;

    // Filter out undefined values to avoid Firebase errors
    const cleanProfile = Object.fromEntries(
      Object.entries(profile).filter(([_, value]) => value !== undefined)
    );

    const task: NewTask = {
      ...cleanProfile,
      taskId,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as NewTask;

    await setDoc(taskRef, task);
    return taskId;
  },

  // Instead of using `getDocs`, onSnapshot is a realtime subscription method.
  // Now when any task changes, Firestore will push the new list automatically.
  // This will be useful on the stretch tech when I add collaborators to tasks.

  subscribeToUserTasks: (userId: string, callback: (tasks: Task[]) => void) => {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        ...(doc.data() as Task),
        createdAt: doc.data().createdAt?.toDate?.(),
        updatedAt: doc.data().updatedAt?.toDate?.()
      }));
      callback(tasks);
    });

    return unsubscribe; // so we can clean up on unmount
  }
};
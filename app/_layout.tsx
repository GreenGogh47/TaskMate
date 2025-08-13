import { useEffect } from 'react';
import { useRouter, useRootNavigationState, Slot } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const user = useAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Navigation not ready
    if (user === undefined) return; // Auth still loading

    if (user) {
      router.replace('/auth/tasks');
    } else {
      router.replace('/public/login');
    }
  }, [user, rootNavigationState]);

  return <Slot />; // Don't render anything else — let router load
  // Just a passthrough, actual layouts are inside groups
}
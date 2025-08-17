import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="tasks/index" options={{ title: 'My Tasks' }} />
      <Stack.Screen name="tasks/new" options={{ title: 'New Task' }} />
      {/* <Stack.Screen name="tasks/[id]" options={{ title: 'Task Details' }} /> */}
      {/* <Stack.Screen name="profile" options={{ title: 'Profile' }} /> */}
    </Stack>
  );
}
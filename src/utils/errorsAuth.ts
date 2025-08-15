import { Alert } from 'react-native';

export const authErrors: Record<string, string> = {
  "auth/email-already-in-use": "That email is already registered.",
  "auth/invalid-email": "Please enter a valid email.",
  "auth/weak-password": "Your password should be at least 6 characters.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
};

export function handleAuthError(error: any, context: string = "Authentication Error") {
  const code = error.code || "unknown";
  const message = authErrors[code] || "Something went wrong. Please try again.";
  Alert.alert(context, message);
}

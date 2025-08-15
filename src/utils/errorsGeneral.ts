import { Alert } from 'react-native';

export const generalErrors: Record<string, string> = {
  "unknown": "Something went wrong. Please try again.",
  "network": "Network error. Please check your connection.",
  "timeout": "Request timed out. Please try again.",
  "permission": "Permission denied. Please check your settings.",
};

export function handleGeneralError(error: any, context: string = "Error") {
  const code = error.code || "unknown";
  const message = generalErrors[code] || generalErrors["unknown"];
  Alert.alert(context, message);
}

export function getErrorMessage(error: any): string {
  const code = error.code || "unknown";
  return generalErrors[code] || generalErrors["unknown"];
}

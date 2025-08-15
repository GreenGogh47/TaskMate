import { Timestamp } from 'firebase/firestore';

export function formatDueDate(timestamp: Timestamp): string {
  if (!timestamp) return '';
  
  const now = new Date();
  const dueDate = timestamp.toDate();
  
  // Reset time to start of day for comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  
  if (dueDateOnly.getTime() === today.getTime()) {
    return 'Today';
  } else if (dueDateOnly.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else if (dueDateOnly.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    // Format as "Jan 15" or "Jan 15, 2024" if it's a different year
    const currentYear = now.getFullYear();
    const dueYear = dueDate.getFullYear();
    
    if (dueYear === currentYear) {
      return dueDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } else {
      return dueDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  }
}

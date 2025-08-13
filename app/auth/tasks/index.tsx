import { authService } from '../../../services/authService';
import { PrimaryButton } from '@/components';

export default function TasksScreen() {
  return (
    <PrimaryButton
      title="Log Out"
      onPress={() => {
        console.log("tasks screen, logging out now");
        authService.signOut();
      }}
    />
  );
}
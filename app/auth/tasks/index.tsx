import { authService } from '../../../services/authService';
import { PrimaryButton } from '@/components/primaryButton';

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
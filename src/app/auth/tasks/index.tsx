import { authService } from "@/src/services/authService";
import { PrimaryButton } from '@/src/components';

export default function TasksScreen() {
  return (
    <PrimaryButton
      title="Log Out"
      onPress={() => {
        console.log("Made it to the tasks screen!!");
        authService.signOut();
      }}
    />
  );
}
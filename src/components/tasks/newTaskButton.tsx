import { CircleButton } from '@/components/common/circleButton'
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants';

export function NewTaskButton({ onPress }: { onPress: () => void }) {
  return (
    <CircleButton size={56} color={COLORS.primary} onPress={onPress}>
      <MaterialIcons name="add-task" size={28} color="white" />
    </CircleButton>
  );
}


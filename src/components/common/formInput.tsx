import React, { forwardRef } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, TextInputProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants";

interface FormInputProps extends TextInputProps {
  icon?: keyof typeof MaterialIcons.glyphMap; // optional icon (e.g., "email", "label")
  placeholder?: string;
  value?: string;
  onClear?: () => void; // optional "X" clear button
  rightActions?: React.ReactNode; // for extra buttons (like ✔ and ✖ in CategorySelector)
  autoFocus?: boolean; // auto-focus the input
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send'; // keyboard return key type
  onSubmitEditing?: () => void; // what to do when return key is pressed
  blurOnSubmit?: boolean; // whether to blur input on submit
}

export const FormInput = forwardRef<TextInput, FormInputProps>(({
  icon,
  placeholder,
  value,
  onChangeText,
  onClear,
  rightActions,
  autoFocus = false,
  returnKeyType = 'done',
  onSubmitEditing,
  blurOnSubmit = true,
  ...props
}, ref) => {
  return (
    <View style={styles.container}>
      {icon && <MaterialIcons name={icon} size={20} color={COLORS.text.secondary} />}
      <TextInput
        ref={ref}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.tertiary}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        autoCapitalize="sentences"
        autoCorrect={false}
        spellCheck={false}
        {...props}
      />
      {value && onClear && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <MaterialIcons name="close" size={16} color={COLORS.text.tertiary} />
        </TouchableOpacity>
      )}
      {rightActions}
    </View>
  );
});

FormInput.displayName = 'FormInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});
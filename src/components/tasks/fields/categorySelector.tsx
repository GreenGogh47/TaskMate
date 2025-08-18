import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES } from "@/constants";
import { CircleButton } from "@/components/common/circleButton";
import { FormInput } from "@/components/common/formInput";
import { CATEGORY_OPTIONS, formatCategoryIcon } from "@/types/categoryType";

interface CategorySelectorProps {
  value?: string;
  onChange: (category: string | undefined) => void;
  placeholder?: string;
}

export function CategorySelector({
  value,
  onChange,
  placeholder = "Choose or add category",
}: CategorySelectorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleSave = () => {
    if (inputValue.trim()) {
      onChange(inputValue.trim());
    }
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleCancel = () => {
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const clearCategory = () => {
    onChange(undefined);
    setInputValue("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        {CATEGORY_OPTIONS.map((option) => {
          const isSelected = value === option.name;
          const formatted = formatCategoryIcon(option.name, isSelected);

          return (
            <CircleButton
              key={option.name}
              size={40}
              color={isSelected ? option.color : COLORS.surface}
              onPress={() => onChange(option.name)}
              style={styles.circle}
            >
              <MaterialIcons
                name={formatted?.icon}
                size={20}
                color={formatted?.color}
              />
            </CircleButton>
          );
        })}
      </View>

      {isEditing ? (
        <FormInput
          icon="label"
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder}
          onClear={() => setInputValue("")}
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={handleSave}
          blurOnSubmit={true}
          rightActions={
            <>
              <TouchableOpacity onPress={handleSave}>
                <MaterialIcons name="check" size={20} color={COLORS.success} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel}>
                <MaterialIcons name="close" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </>
          }
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <MaterialIcons name="label" size={20} color={COLORS.text.secondary} />
          <Text style={[styles.text, !value && styles.placeholder]}>
            {value || placeholder}
          </Text>
          {value && (
            <TouchableOpacity onPress={clearCategory} style={styles.clearButton}>
              <MaterialIcons name="close" size={16} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: SPACING.sm,
  },
  circle: {
    marginHorizontal: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  text: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  placeholder: {
    color: COLORS.text.tertiary,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});



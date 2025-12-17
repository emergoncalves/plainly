import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../styles/theme";

interface LineActionsToolbarProps {
  onToggleDone: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onToggleHighlight: () => void;
  isLineCompleted: boolean;
  isLineHighlighted: boolean;
}

const ICON_SIZE = 24;

export const LineActionsToolbar: React.FC<LineActionsToolbarProps> = ({
  onToggleDone,
  onCopy,
  onDelete,
  onToggleHighlight,
  isLineCompleted,
  isLineHighlighted,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onToggleDone}>
        <Ionicons
          name={
            isLineCompleted ? "checkmark-circle" : "checkmark-circle-outline"
          }
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCopy}>
        <Ionicons
          name="copy-outline"
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onToggleHighlight}>
        <Ionicons
          name={isLineHighlighted ? "star" : "star-outline"}
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Ionicons
          name="trash-outline"
          size={ICON_SIZE}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: colors.buttonBackground,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  buttonText: {
    color: colors.text,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});

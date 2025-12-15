import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../styles/theme";

interface LineActionsToolbarProps {
  onToggleDone: () => void;
  onCopy: () => void;
  onDelete: () => void;
  isLineCompleted: boolean;
}

export const LineActionsToolbar: React.FC<LineActionsToolbarProps> = ({
  onToggleDone,
  onCopy,
  onDelete,
  isLineCompleted,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onToggleDone}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={colors.textSecondary}
        />
        <Text style={styles.buttonText}>
          {isLineCompleted ? "Desmarcar" : "Feito"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCopy}>
        <Ionicons name="copy" size={24} color={colors.textSecondary} />
        <Text style={styles.buttonText}>Copiar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Ionicons name="trash" size={24} color={colors.textSecondary} />
        <Text style={styles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: spacing.paddingHorizontal,
    borderTopWidth: 1,
    borderTopColor: colors.buttonBackground,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
});

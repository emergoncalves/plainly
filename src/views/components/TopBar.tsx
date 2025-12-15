import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";
import { colors } from "../../styles/theme";

interface TopBarProps {
  onSearchPress: () => void;
  onKeepAwakePress: () => void;
  keepAwakeActive: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearchPress,
  onKeepAwakePress,
  keepAwakeActive,
}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={onKeepAwakePress}
        style={styles.keepAwakeButton}
      >
        <Ionicons
          name={keepAwakeActive ? "eye" : "eye-off"}
          size={20}
          color={keepAwakeActive ? colors.text : colors.textSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

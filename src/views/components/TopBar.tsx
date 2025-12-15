import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../../styles/styles";

interface TopBarProps {
  onSearchPress: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearchPress }) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

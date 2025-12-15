import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "../../styles/styles";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  matches: number[];
  currentMatch: number;
  onNavigate: (direction: "next" | "prev") => void;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  matches,
  currentMatch,
  onNavigate,
  onClose,
}) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#7a7f87"
        value={query}
        onChangeText={onQueryChange}
        autoFocus
        keyboardAppearance="dark"
        returnKeyType="search"
      />
      {matches.length > 0 && (
        <View style={styles.searchNav}>
          <Text style={styles.searchCount}>
            {currentMatch + 1}/{matches.length}
          </Text>
          <TouchableOpacity
            onPress={() => onNavigate("prev")}
            style={styles.navButton}
          >
            <Text style={styles.navText}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate("next")}
            style={styles.navButton}
          >
            <Text style={styles.navText}>↓</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

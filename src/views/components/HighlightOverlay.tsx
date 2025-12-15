import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles";

interface HighlightOverlayProps {
  note: string;
  searchQuery: string;
  matches: number[];
  currentMatch: number;
}

export const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  note,
  searchQuery,
  matches,
  currentMatch,
}) => {
  if (!searchQuery.trim() || matches.length === 0) {
    return null;
  }

  const renderHighlightedText = () => {
    const parts = [];
    let lastIndex = 0;

    matches.forEach((matchIndex, idx) => {
      const isCurrentMatch = idx === currentMatch;

      // Add text before match
      if (matchIndex > lastIndex) {
        parts.push(
          <Text key={`text-${idx}`} style={styles.overlayText}>
            {note.substring(lastIndex, matchIndex)}
          </Text>
        );
      }

      // Add highlighted match
      parts.push(
        <Text
          key={`match-${idx}`}
          style={[
            styles.overlayText,
            isCurrentMatch
              ? styles.currentMatchHighlight
              : styles.matchHighlight,
          ]}
        >
          {note.substring(matchIndex, matchIndex + searchQuery.length)}
        </Text>
      );

      lastIndex = matchIndex + searchQuery.length;
    });

    // Add text after last match
    if (lastIndex < note.length) {
      parts.push(
        <Text key="text-end" style={styles.overlayText}>
          {note.substring(lastIndex)}
        </Text>
      );
    }

    return <Text style={styles.overlayTextContainer}>{parts}</Text>;
  };

  return (
    <View style={styles.highlightOverlay} pointerEvents="none">
      {renderHighlightedText()}
    </View>
  );
};

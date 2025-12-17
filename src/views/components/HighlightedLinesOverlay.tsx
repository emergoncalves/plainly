import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles";
import { isHighlightedLine } from "../../utils/textUtils";

interface HighlightedLinesOverlayProps {
  note: string;
}

export const HighlightedLinesOverlay: React.FC<
  HighlightedLinesOverlayProps
> = ({ note }) => {
  const renderStyledText = useMemo(() => {
    const lines = note.split("\n");

    return lines.map((line, index) => {
      const isHighlighted = isHighlightedLine(line);

      return (
        <Text
          key={`line-${index}`}
          style={[
            styles.overlayText,
            isHighlighted && styles.highlightedLineText,
          ]}
        >
          {line}
          {index < lines.length - 1 ? "\n" : ""}
        </Text>
      );
    });
  }, [note]);

  return (
    <View style={styles.highlightOverlay} pointerEvents="none">
      <Text style={styles.overlayTextContainer}>{renderStyledText}</Text>
    </View>
  );
};

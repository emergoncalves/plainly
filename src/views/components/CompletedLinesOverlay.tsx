import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles/styles";
import { isCompletedLine } from "../../utils/textUtils";

interface CompletedLinesOverlayProps {
  note: string;
}

export const CompletedLinesOverlay: React.FC<CompletedLinesOverlayProps> = ({
  note,
}) => {
  const renderStyledText = useMemo(() => {
    const lines = note.split("\n");

    return lines.map((line, index) => {
      const isCompleted = isCompletedLine(line);

      return (
        <Text
          key={`line-${index}`}
          style={[styles.overlayText, isCompleted && styles.completedLineText]}
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

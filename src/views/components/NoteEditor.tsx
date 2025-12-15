import React from "react";
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import { styles } from "../../styles/styles";

interface NoteEditorProps {
  note: string;
  onChange: (text: string) => void;
  onSelectionChange: (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => void;
  textInputRef: React.RefObject<TextInput | null>;
  searchActive: boolean;
  overlayActive: boolean;
  autoFocus?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onChange,
  onSelectionChange,
  textInputRef,
  searchActive,
  overlayActive,
  autoFocus = true,
}) => {
  return (
    <TextInput
      ref={textInputRef}
      style={[
        styles.editor,
        (searchActive || overlayActive) && styles.editorWithSearch,
      ]}
      placeholder="Escreva suas notas..."
      placeholderTextColor="#7a7f87"
      multiline
      autoFocus={autoFocus}
      value={note}
      onChangeText={onChange}
      onSelectionChange={onSelectionChange}
      autoCorrect
      autoCapitalize="sentences"
      textAlignVertical="top"
      keyboardAppearance="dark"
      scrollEnabled={false}
      blurOnSubmit={false}
      selectionColor="#5ce2ff"
    />
  );
};

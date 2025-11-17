import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

const STORAGE_KEY = "@plainly/notes";
const SAVE_DELAY_MS = 400;

export default function App() {
  const [note, setNote] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [snapToEnd, setSnapToEnd] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setNote(stored);
          setSnapToEnd(true);
        }
      } catch (error) {
        console.warn("Could not load saved note", error);
      } finally {
        setHasLoaded(true);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    if (!hasLoaded) {
      return;
    }

    saveTimer.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, note);
      } catch (error) {
        console.warn("Could not save note", error);
      }
    }, SAVE_DELAY_MS);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [note, hasLoaded]);

  useEffect(() => {
    if (!snapToEnd) {
      return;
    }

    const timeout = setTimeout(() => {
      const input = textInputRef.current;
      if (input) {
        input.focus();
        input.setNativeProps({
          selection: { start: note.length, end: note.length },
        });
      }
      setSnapToEnd(false);
    }, 50);

    return () => clearTimeout(timeout);
  }, [snapToEnd, note.length]);

  const handleChange = (value: string) => {
    setNote(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 48 : 0}
      >
        <TextInput
          ref={textInputRef}
          style={styles.editor}
          placeholder="Escreva suas notas..."
          placeholderTextColor="#7a7f87"
          multiline
          autoFocus
          value={note}
          onChangeText={handleChange}
          autoCorrect
          autoCapitalize="sentences"
          textAlignVertical="top"
          keyboardAppearance="dark"
          scrollEnabled
          blurOnSubmit={false}
          selectionColor="#5ce2ff"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05060a",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  keyboardAvoider: {
    flex: 1,
  },
  editor: {
    flex: 1,
    color: "#f5f7fb",
    fontSize: 18,
    lineHeight: 26,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: undefined,
    }),
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});

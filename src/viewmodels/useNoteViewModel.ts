import { useState, useEffect, useCallback, useRef } from "react";
import {
  TextInput,
  ScrollView,
  Alert,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { StorageService } from "../services/StorageService";
import { SearchService } from "../services/SearchService";
import { useAutoSave } from "../hooks/useAutoSave";
import { useSearchNavigation } from "../hooks/useSearchNavigation";
import {
  toggleLineMarker,
  deleteLine,
  getLineContent,
  isCompletedLine,
} from "../utils/textUtils";

export const useNoteViewModel = () => {
  const [note, setNote] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [snapToEnd, setSnapToEnd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [showLineActions, setShowLineActions] = useState(false);

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const previousNoteRef = useRef<string>("");

  // Load note on mount
  useEffect(() => {
    const loadNote = async () => {
      const stored = await StorageService.loadNote();
      if (stored) {
        setNote(stored);
        setSnapToEnd(true);
      }
      setHasLoaded(true);
    };

    loadNote();
  }, []);

  // Auto-save
  useAutoSave(note, hasLoaded, StorageService.saveNote);

  // Auto-focus and snap to end
  useEffect(() => {
    if (!snapToEnd) return;

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

  // Search matches
  const matches = SearchService.findMatches(note, searchQuery);

  // Search navigation
  useSearchNavigation({
    note,
    searchQuery,
    matches,
    currentMatch,
    textInputRef,
    scrollViewRef,
  });

  // Reset match index when query changes
  useEffect(() => {
    if (searchQuery) {
      setCurrentMatch(0);
    }
  }, [searchQuery]);

  // Calculate current line index from cursor position
  const getCurrentLineIndex = useCallback((): number => {
    const textBeforeCursor = note.substring(0, selection.start);
    return textBeforeCursor.split("\n").length - 1;
  }, [note, selection.start]);

  // Handle selection change
  const handleSelectionChange = useCallback(
    (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      setSelection(e.nativeEvent.selection);
      setShowLineActions(true);
    },
    []
  );

  // Note operations
  const handleNoteChange = useCallback(
    (value: string) => {
      // Check if a completed line was edited and remove FEITO marker
      const previousLines = previousNoteRef.current.split("\n");
      const newLines = value.split("\n");

      // Find which line was edited
      if (previousLines.length === newLines.length) {
        const lineIndex = getCurrentLineIndex();
        if (lineIndex >= 0 && lineIndex < previousLines.length) {
          const oldLine = previousLines[lineIndex];
          const newLine = newLines[lineIndex];

          // If the old line had FEITO and the content changed (excluding just adding FEITO)
          if (isCompletedLine(oldLine) && oldLine !== newLine) {
            // Check if user is not just toggling FEITO (line content should be different)
            const oldLineWithoutMarker = oldLine.replace(
              /\s*\(FEITO[^)]*\)\s*$/,
              ""
            );
            const newLineWithoutMarker = newLine.replace(
              /\s*\(FEITO[^)]*\)\s*$/,
              ""
            );

            if (
              oldLineWithoutMarker !== newLineWithoutMarker &&
              isCompletedLine(newLine)
            ) {
              // Remove the FEITO marker since line was edited
              const updatedLines = [...newLines];
              updatedLines[lineIndex] = newLine.replace(
                /\s*\(FEITO[^)]*\)\s*$/,
                ""
              );
              previousNoteRef.current = updatedLines.join("\n");
              setNote(updatedLines.join("\n"));
              return;
            }
          }
        }
      }

      previousNoteRef.current = value;
      setNote(value);
    },
    [getCurrentLineIndex]
  );

  const handleToggleLineComplete = useCallback(() => {
    const lineIndex = getCurrentLineIndex();
    console.log("Toggling line:", lineIndex);
    const lines = note.split("\n");
    const newLines = toggleLineMarker(lines, lineIndex);
    const newNote = newLines.join("\n");
    previousNoteRef.current = newNote;
    setNote(newNote);
  }, [note, getCurrentLineIndex]);

  const handleCopyLine = useCallback(() => {
    const lineIndex = getCurrentLineIndex();
    const line = getLineContent(note, lineIndex);
    if (line !== null) {
      Clipboard.setStringAsync(line);
    }
  }, [note, getCurrentLineIndex]);

  const handleDeleteLine = useCallback(() => {
    const lineIndex = getCurrentLineIndex();
    const lines = note.split("\n");
    const newLines = deleteLine(lines, lineIndex);
    const newNote = newLines.join("\n");
    previousNoteRef.current = newNote;
    setNote(newNote);
  }, [note, getCurrentLineIndex]);

  const isCurrentLineCompleted = useCallback((): boolean => {
    const lineIndex = getCurrentLineIndex();
    const line = getLineContent(note, lineIndex);
    return line ? isCompletedLine(line) : false;
  }, [note, getCurrentLineIndex]);

  // Search operations
  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleToggleSearchVisible = useCallback(() => {
    setSearchVisible((prev) => !prev);
    if (searchVisible) {
      setSearchQuery("");
    }
  }, [searchVisible]);

  const handleNavigateSearch = useCallback(
    (direction: "next" | "prev") => {
      if (matches.length === 0) return;

      let newIndex = currentMatch;
      if (direction === "next") {
        newIndex = (currentMatch + 1) % matches.length;
      } else {
        newIndex = (currentMatch - 1 + matches.length) % matches.length;
      }

      setCurrentMatch(newIndex);
    },
    [currentMatch, matches.length]
  );

  return {
    // State
    note,
    hasLoaded,
    searchQuery,
    searchVisible,
    matches,
    currentMatch,
    showLineActions,
    selection,

    // Refs
    textInputRef,
    scrollViewRef,

    // Note operations
    handleNoteChange,
    handleSelectionChange,
    handleToggleLineComplete,
    handleCopyLine,
    handleDeleteLine,
    isCurrentLineCompleted,

    // Search operations
    handleSearchQueryChange,
    handleToggleSearchVisible,
    handleNavigateSearch,
  };
};

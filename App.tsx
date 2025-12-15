import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNoteViewModel } from "./src/viewmodels/useNoteViewModel";
import { SearchBar } from "./src/views/components/SearchBar";
import { TopBar } from "./src/views/components/TopBar";
import { NoteEditor } from "./src/views/components/NoteEditor";
import { HighlightOverlay } from "./src/views/components/HighlightOverlay";
import { CompletedLinesOverlay } from "./src/views/components/CompletedLinesOverlay";
import { LineActionsToolbar } from "./src/views/components/LineActionsToolbar";
import { styles } from "./src/styles/styles";

export default function App() {
  const {
    note,
    searchQuery,
    searchVisible,
    matches,
    currentMatch,
    showLineActions,
    textInputRef,
    scrollViewRef,
    handleNoteChange,
    handleSelectionChange,
    handleToggleLineComplete,
    handleCopyLine,
    handleDeleteLine,
    isCurrentLineCompleted,
    handleSearchQueryChange,
    handleToggleSearchVisible,
    handleNavigateSearch,
  } = useNoteViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {searchVisible && (
        <SearchBar
          query={searchQuery}
          onQueryChange={handleSearchQueryChange}
          matches={matches}
          currentMatch={currentMatch}
          onNavigate={handleNavigateSearch}
          onClose={handleToggleSearchVisible}
        />
      )}

      {!searchVisible && <TopBar onSearchPress={handleToggleSearchVisible} />}

      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <NoteEditor
            note={note}
            onChange={handleNoteChange}
            onSelectionChange={handleSelectionChange}
            textInputRef={textInputRef}
            searchActive={searchQuery !== "" && matches.length > 0}
            overlayActive={true}
            autoFocus={!searchVisible}
          />
          {(!searchQuery || matches.length === 0) && (
            <CompletedLinesOverlay note={note} />
          )}
          {searchQuery && matches.length > 0 && (
            <HighlightOverlay
              note={note}
              searchQuery={searchQuery}
              matches={matches}
              currentMatch={currentMatch}
            />
          )}
        </ScrollView>

        {showLineActions && !searchVisible && (
          <LineActionsToolbar
            onToggleDone={handleToggleLineComplete}
            onCopy={handleCopyLine}
            onDelete={handleDeleteLine}
            isLineCompleted={isCurrentLineCompleted()}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

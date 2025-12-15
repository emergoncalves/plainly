import { StyleSheet, Platform } from "react-native";
import { colors, typography, spacing } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.paddingHorizontal,
    paddingTop: spacing.paddingTop,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  editor: {
    minHeight: "100%",
    color: colors.text,
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    fontFamily: typography.fontFamily,
    paddingVertical: spacing.paddingVertical,
    paddingHorizontal: spacing.paddingHorizontalInner,
  },
  topBar: {
    position: "absolute",
    right: spacing.paddingHorizontal,
    top: Platform.OS === "android" ? 30 : 10,
    zIndex: 10,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  keepAwakeButton: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  searchButtonText: {
    color: colors.text,
    fontSize: 14,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  searchNav: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 4,
  },
  searchCount: {
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: 8,
  },
  navButton: {
    padding: 8,
    backgroundColor: colors.buttonBackground,
    borderRadius: 4,
  },
  navText: {
    color: colors.text,
    fontSize: 16,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 18,
  },
  editorWithSearch: {
    color: "transparent",
  },
  highlightOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: spacing.paddingVertical,
    paddingHorizontal: spacing.paddingHorizontalInner,
  },
  overlayTextContainer: {
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    fontFamily: typography.fontFamily,
  },
  overlayText: {
    color: colors.text,
  },
  completedLineText: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
    textDecorationColor: colors.textSecondary,
  },
  matchHighlight: {
    backgroundColor: colors.matchHighlight,
    color: colors.text,
  },
  currentMatchHighlight: {
    backgroundColor: colors.currentMatchHighlight,
    color: colors.currentMatchText,
    fontWeight: "600",
  },
});

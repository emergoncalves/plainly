import { Platform } from "react-native";

export const colors = {
  background: "#05060a",
  text: "#f5f7fb",
  textSecondary: "#7a7f87",
  cardBackground: "#1a1d24",
  buttonBackground: "#2a2d34",
  selectionColor: "#5ce2ff",
  matchHighlight: "rgba(255, 235, 59, 0.3)",
  currentMatchHighlight: "rgba(255, 152, 0, 0.5)",
  currentMatchText: "#fff",
};

export const typography = {
  fontSize: 18,
  lineHeight: 32,
  fontFamily: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: undefined,
  }),
};

export const spacing = {
  paddingTop: Platform.OS === "android" ? 20 : 0,
  paddingHorizontal: 20,
  paddingVertical: 42,
  paddingHorizontalInner: 12,
};

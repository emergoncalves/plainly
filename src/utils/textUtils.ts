import { LINE_HEIGHT, PADDING_TOP } from "./constants";

export const getPortugueseDayOfWeek = (date: Date): string => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return days[date.getDay()];
};

export const formatFeitoMarker = (date: Date = new Date()): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const dayOfWeek = getPortugueseDayOfWeek(date);

  return `(FEITO - ${dayOfWeek} - ${day}-${month}-${year})`;
};

export const isCompletedLine = (line: string): boolean => {
  return /\(FEITO[^)]*\)/.test(line);
};

export const calculateLineIndex = (
  locationY: number,
  lineHeight: number = LINE_HEIGHT,
  paddingTop: number = PADDING_TOP
): number => {
  return Math.floor((locationY - paddingTop) / lineHeight);
};

export const toggleLineMarker = (
  lines: string[],
  lineIndex: number,
  includeDate: boolean = true
): string[] => {
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return lines;
  }

  const newLines = [...lines];
  const line = newLines[lineIndex];
  // Match any FEITO marker (with or without date)
  const markerPattern = /\s*\(FEITO[^)]*\)\s*$/;

  if (markerPattern.test(line.trim())) {
    newLines[lineIndex] = line.replace(markerPattern, "");
  } else {
    const marker = includeDate ? formatFeitoMarker() : "(FEITO)";
    newLines[lineIndex] = line + ` ${marker}`;
  }

  return newLines;
};

export const deleteLine = (lines: string[], lineIndex: number): string[] => {
  if (lineIndex < 0 || lineIndex >= lines.length) {
    return lines;
  }

  const newLines = [...lines];
  newLines.splice(lineIndex, 1);
  return newLines;
};

export const getLineContent = (
  text: string,
  lineIndex: number
): string | null => {
  const lines = text.split("\n");
  if (lineIndex >= 0 && lineIndex < lines.length) {
    return lines[lineIndex];
  }
  return null;
};

import { LINE_HEIGHT, PADDING_TOP } from "../utils/constants";

export class SearchService {
  static findMatches(text: string, query: string): number[] {
    if (!query.trim()) return [];

    const matches: number[] = [];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let index = lowerText.indexOf(lowerQuery);

    while (index !== -1) {
      matches.push(index);
      index = lowerText.indexOf(lowerQuery, index + 1);
    }

    return matches;
  }

  static calculateScrollPosition(
    matchIndex: number,
    text: string,
    lineHeight: number = LINE_HEIGHT
  ): number {
    const textBeforeMatch = text.substring(0, matchIndex);
    const linesBefore = textBeforeMatch.split("\n").length - 1;
    return linesBefore * lineHeight;
  }
}

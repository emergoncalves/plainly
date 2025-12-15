export interface SearchMatch {
  index: number;
  length: number;
}

export interface SearchState {
  query: string;
  matches: number[];
  currentMatchIndex: number;
  visible: boolean;
}

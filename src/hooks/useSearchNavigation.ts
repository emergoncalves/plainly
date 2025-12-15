import { useEffect } from "react";
import { TextInput, ScrollView } from "react-native";
import { SearchService } from "../services/SearchService";
import { LINE_HEIGHT } from "../utils/constants";

interface UseSearchNavigationProps {
  note: string;
  searchQuery: string;
  matches: number[];
  currentMatch: number;
  textInputRef: React.RefObject<TextInput | null>;
  scrollViewRef: React.RefObject<ScrollView | null>;
}

export const useSearchNavigation = ({
  note,
  searchQuery,
  matches,
  currentMatch,
  textInputRef,
  scrollViewRef,
}: UseSearchNavigationProps) => {
  useEffect(() => {
    if (matches.length > 0 && searchQuery) {
      const matchPosition = matches[currentMatch];
      const scrollY = SearchService.calculateScrollPosition(
        matchPosition,
        note,
        LINE_HEIGHT
      );

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: scrollY, animated: true });
        textInputRef.current?.setNativeProps({
          selection: {
            start: matchPosition,
            end: matchPosition + searchQuery.length,
          },
        });
      }, 100);
    }
  }, [searchQuery, currentMatch, matches, note, textInputRef, scrollViewRef]);
};

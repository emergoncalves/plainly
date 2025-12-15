import { useEffect, useRef } from "react";
import { SAVE_DELAY_MS } from "../utils/constants";

export const useAutoSave = (
  content: string,
  hasLoaded: boolean,
  onSave: (content: string) => Promise<void>
) => {
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    if (!hasLoaded) {
      return;
    }

    saveTimer.current = setTimeout(async () => {
      await onSave(content);
    }, SAVE_DELAY_MS);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [content, hasLoaded, onSave]);
};

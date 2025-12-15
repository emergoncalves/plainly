import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../utils/constants";

export class StorageService {
  static async loadNote(): Promise<string | null> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored;
    } catch (error) {
      console.warn("Could not load saved note", error);
      return null;
    }
  }

  static async saveNote(content: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, content);
    } catch (error) {
      console.warn("Could not save note", error);
    }
  }
}

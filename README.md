# plainly

Dark, distraction-free note pad built with Expo and React Native. The entire screen becomes a single text field so you can jot thoughts quickly, keep them local for now, and resume exactly where you left off.

## Features

- Full-screen multiline editor with dark palette optimized for low light and focus
- Auto-focus and caret snapping to the end of the document for quick resume
- Local persistence via AsyncStorage with debounced writes to keep startups fast
- Ready to plug into Firestore later for optional cloud sync

## Requirements

- Node.js >= 20.19.4 (Expo SDK 54 requirement)
- npm 10+
- Expo CLI (`npx expo` is installed automatically)
- Expo Go app on your device or an Android/iOS simulator

## Getting started

```bash
npm install
npm run start
```

Then, choose `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

## Development notes

- All notes are stored locally under the key `@plainly/notes`.
- Debounced saves (400ms) ensure responsive typing while still persisting frequently.
- When you integrate Firestore, hook into the save effect inside `App.tsx` so remote writes stay in sync with local storage.

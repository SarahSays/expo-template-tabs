# Orbits

A sample Expo Router app demonstrating nested Drawer, Tabs, and Stack navigation with theme-aware UI and reusable TypeScript components.

## Project Overview

This repository is an [Expo](https://expo.dev) project built with [Expo Router](https://docs.expo.dev/router/introduction/) and React Native.

The app uses a file-based navigation structure to illustrate a multi-level layout:
- Root stack
- Drawer navigator
- Bottom tabs
- Individual tab stacks

The current project includes:
- A themed `Orbits` section with user status, profile editing, and sample in-memory state
- A modern `Home` flow with modal and verification screens
- Demo chat account pages under `Chat Accounts`
- Settings screens for appearance, privacy/security, and preferences
- A `Star Chart` stack with pinch-to-zoom and sharing screens
- A `Recs` stack for recommendations and awards
- A `Feed` stack with placeholder feed screens

## What Changed

This version of the project includes:
- Method-level JSDoc comments for exported components, hooks, and constants across the codebase
- Updated content for the `Orbits` self profile flow and sample friend list

## Key Features

- **Expo Router navigation**: Drawer + Tabs + nested Stack layouts
- **Theme support**: Light and dark mode using app-wide theme values
- **Custom typography**: OpenDyslexic fonts are loaded at the app root
- **Cross-platform UI**: Works on iOS, Android, and Web
- **In-memory demo data**: Sample screens use transient storage to stay Expo Go compatible
- **Reusable components**: Theme-aware wrappers, icon helpers, and layout utilities
- **TypeScript**: Full TS support across the project

## Navigation Architecture

```
Root Stack (app/_layout.tsx)
  └── Drawer Navigator (app/(drawer)/_layout.tsx)
       ├── Tabs Navigator (app/(drawer)/(tabs)/_layout.tsx)
       │    ├── Home Tab Stack (app/(drawer)/(tabs)/home/_layout.tsx)
       │    ├── Orbits Tab Stack (app/(drawer)/(tabs)/orbits/_layout.tsx)
       │    ├── Feed Tab Stack (app/(drawer)/(tabs)/feed/_layout.tsx)
       │    ├── Star Chart Tab Stack (app/(drawer)/(tabs)/starchart/_layout.tsx)
       │    └── Recs Tab Stack (app/(drawer)/(tabs)/recs/_layout.tsx)
       ├── Settings Stack (app/(drawer)/settings/_layout.tsx)
       ├── Chat Accounts Stack (app/(drawer)/chat-accounts/_layout.tsx)
       └── Logout Screen (app/(drawer)/logout.tsx)
```

### Navigation Responsibilities

1. **Root Stack** (`app/_layout.tsx`)
   - Loads custom fonts and global app context
   - Hides the root header so child navigators manage screen headers

2. **Drawer Navigator** (`app/(drawer)/_layout.tsx`)
   - Contains the main app sections and the right-side drawer menu
   - Hides its own header so content navigators display their own headers

3. **Tabs Navigator** (`app/(drawer)/(tabs)/_layout.tsx`)
   - Hosts the bottom tab bar for the main app sections
   - Hides the tab navigator header to avoid duplicate headers

4. **Tab Stacks** (`app/(drawer)/(tabs)/<tab>/_layout.tsx`)
   - Each tab has its own stack layout
   - Stack layouts show headers for internal navigation and back buttons

## Directory Structure

```
app/
├── _layout.tsx
├── (drawer)/
│   ├── _layout.tsx
│   ├── logout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── home/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── verification-code.tsx
│   │   │   ├── username.tsx
│   │   │   ├── notifications.tsx
│   │   │   └── connect-chats.tsx
│   │   ├── orbits/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── friends.tsx
│   │   │   ├── self.tsx
│   │   │   ├── self/self-profile-detailed.tsx
│   │   │   ├── cadences.tsx
│   │   │   ├── groups.tsx
│   │   │   └── orbits.tsx
│   │   ├── feed/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── feed.tsx
│   │   │   └── placeholder.tsx
│   │   ├── starchart/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── star-chart.tsx
│   │   │   ├── pinch-zoom.tsx
│   │   │   └── share.tsx
│   │   └── recs/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── recs.tsx
│   │       ├── awards.tsx
│   │       └── addarec.tsx
│   ├── settings/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── appearance.tsx
│   │   ├── privacy-security.tsx
│   │   ├── preferences.tsx
│   │   └── help.tsx
│   └── chat-accounts/
│       ├── _layout.tsx
│       ├── discord.tsx
│       ├── google-messages.tsx
│       ├── instagram.tsx
│       ├── linkedin.tsx
│       ├── messenger.tsx
│       ├── rcs.tsx
│       ├── signal.tsx
│       ├── slack.tsx
│       ├── sms.tsx
│       ├── telegram.tsx
│       └── whatsapp.tsx
components/
├── Container.tsx
├── ExternalLink.tsx
├── HeaderButton.tsx
├── HelloWave.tsx
├── HapticTab.tsx
├── ParallaxScrollView.tsx
├── ScreenContent.tsx
├── themed-text.tsx
├── themed-view.tsx
└── ui/
    ├── collapsible.tsx
    ├── icon-symbol.ios.tsx
    └── icon-symbol.tsx
constants/
└── theme.ts
hooks/
├── use-color-scheme.ts
├── use-color-scheme.web.ts
└── use-theme-color.ts
assets/
├── fonts/
└── images/
```

## Storage and Demo Data

- Most screens use transient in-memory demo data for Expo Go compatibility
- `@react-native-async-storage/async-storage` is installed, but production persistence is not required by default
- Example screens such as `addarec.tsx` and `friendsStore.ts` contain commented guidance for upgrading to persistent storage

## Documentation Comments

The codebase now includes method-level JSDoc-style comments for exported items:
- Exported React components
- Custom hooks
- Shared constants

These comments are intended to make the app easier to understand and extend.

## Getting Started

```bash
npm install
```

```bash
npx expo start
```

Then choose one of the available runtimes:
- Android device/emulator
- iOS simulator
- Web browser
- Expo Go

## Useful Scripts

```bash
npm run android
npm run ios
npm run web
npm run lint
npm run reset-project
```

## Notes

- Root-level headers are hidden so child navigators can control header presentation
- Custom fonts are loaded at the root layout (`app/_layout.tsx`)
- Platform-specific icons are handled with `icon-symbol.tsx` and `icon-symbol.ios.tsx`

## References

- [Expo](https://expo.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [OpenDyslexic](https://opendyslexic.org/)

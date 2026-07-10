# "Orbits"

A comprehensive Expo Router template demonstrating best practices for complex navigation hierarchies with multiple navigator types. This app showcases proper header scoping and control in a 4-level deep navigation structure using Drawer, Tabs, and Stack navigators.

## Project Overview

This is an [Expo](https://expo.dev) project using [Expo Router](https://docs.expo.dev/router/introduction/) with React Navigation for managing complex multi-level navigation patterns.

### Key Features

- **Dyslexia-Friendly Typography**: Uses OpenDyslexic fonts across all platforms
- **Theme Support**: Light and dark mode with automatic detection
- **Demo-friendly Storage**: The Add-a-Rec demo uses transient in-memory
   storage by default so it runs in Expo Go without a custom dev client.
   Persistent storage using `@react-native-async-storage/async-storage` is
   available but requires a dev client or native build to use in production.
- **Multi-Navigator Architecture**: Demonstrates proper scoping of Drawer, Tabs, and Stack navigators
- **Header Management**: Critical annotations showing where headers must/must not be hidden
- **Cross-Platform**: Works on iOS, Android, and Web
- **Type-Safe**: Full TypeScript support

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

### Navigation Level Responsibilities

1. **Root Stack** (`app/_layout.tsx`)
   - Loads application fonts
   - Entry point for entire app
   - **CRITICAL**: `headerShown: false` - prevents header duplication

2. **Drawer Navigator** (`app/(drawer)/_layout.tsx`)
   - Right-side hamburger menu
   - Controls navigation between major app sections
   - **CRITICAL**: `headerShown: false` - child navigators control headers
   - Sections: Tabs (main), Settings, Chat Accounts, Logout

3. **Tabs Navigator** (`app/(drawer)/(tabs)/_layout.tsx`)
   - Bottom tab bar with 5 main sections
   - **CRITICAL**: `headerShown: false` - each tab stack manages its own headers
   - Tabs: Home, Orbits, Feed, Star Chart, Recs

4. **Tab Stacks** (`app/(drawer)/(tabs)/<tab>/_layout.tsx`)
   - Individual stack navigators for each tab
   - **CRITICAL**: `headerShown: true` - REQUIRED for back button functionality
   - Each stack can have its own sub-screens

### Header Control Strategy

**Key Principle**: No navigator fights another for header control

- **Root → Drawer → Tabs**: Hide headers at each level
- **Tab Stacks**: Show headers for back navigation within tab sections
- **Drawer-Level Stacks** (Settings, Chat Accounts): Show headers with drawer toggle
- **Header Button**: Right-side hamburger icon to toggle drawer from any screen

See comments marked with `// CRITICAL:` in layout files for implementation details.

## Expo Router Scoping

Expo Router uses file-based routing with folder conventions:

- `(drawer)` - Group folder: Routes inside managed by DrawerNavigator
- `(tabs)` - Group folder: Routes inside managed by TabsNavigator
- `<tab>` - Name folders: Create separate stacks within tabs

Each `_layout.tsx` file scopes its navigator to its folder and all sub-routes.

## Directory Structure

```
app/                          # Main app folder (Expo Router entry)
├── _layout.tsx               # Root Stack - loads fonts, hides header
├── (drawer)/
│   ├── _layout.tsx           # Drawer Navigator - right side menu
│   ├── logout.tsx            # Logout screen
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tabs Navigator - bottom bar
│   │   ├── index.tsx         # Home tab initial screen
│   │   ├── home/
│   │   │   ├── _layout.tsx   # Home Stack - shows header with back button
│   │   │   ├── index.tsx
│   │   │   ├── modal.tsx
│   │   │   └── ...
│   │   ├── orbits/
│   │   │   ├── _layout.tsx   # Orbits Stack
│   │   │   └── ...
│   │   ├── feed/             # Feed Stack
│   │   ├── starchart/        # Star Chart Stack
│   │   └── recs/             # Recs Stack
│   ├── settings/
│   │   ├── _layout.tsx       # Settings Stack
│   │   └── ...
│   └── chat-accounts/
│       ├── _layout.tsx       # Chat Accounts Stack
│       └── ...
components/                   # Reusable React components
├── ui/                        # Platform-specific UI components
│   ├── icon-symbol.tsx        # Cross-platform icons (Material/SF Symbols)
│   ├── icon-symbol.ios.tsx    # iOS-specific SF Symbols
│   └── collapsible.tsx        # Expandable sections
├── Container.tsx              # Safe area wrapper with theme background
├── ThemedText.tsx             # Text with theme colors and typography
├── ThemedView.tsx             # View with theme background color
├── ParallaxScrollView.tsx      # Scroll view with parallax header animation
├── HapticTab.tsx              # Tab button with haptic feedback (iOS)
├── HeaderButton.tsx           # Info icon for headers
├── HelloWave.tsx              # Animated waving hand emoji
├── ExternalLink.tsx           # External link handler
└── ScreenContent.tsx          # Standard screen layout component
constants/
├── theme.ts                   # Color definitions and font families
hooks/
├── use-color-scheme.ts        # Color scheme detection
├── use-color-scheme.web.ts    # Web-specific color scheme (with hydration)
└── use-theme-color.ts         # Theme-aware color hook
assets/
├── fonts/                     # OpenDyslexic fonts for accessibility
└── images/                    # App images
```

## Component Comments

All components include JSDoc-style method-level comments explaining:
- Purpose and usage
- Parameters with types
- Return values
- Code examples
- Platform-specific behavior

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start the App

```bash
npx expo start
```

In the output, you'll find options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

### Run on Specific Platform

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Linting

```bash
npm run lint
```

## Reset to Clean Project

To start with a blank app structure:

```bash
npm run reset-project
```

This moves starter code to `app-example/` and creates a blank `app/` directory.

## Key Implementation Notes

### Header Visibility (CRITICAL)

- **Root Layout**: Header MUST be hidden to prevent duplication
- **Drawer Layout**: Header MUST be hidden (tabs/stacks control headers)
- **Tabs Layout**: Header MUST be hidden (each stack controls its header)
- **Tab Stacks**: Header MUST be shown for back button functionality
- **Drawer Stacks** (Settings, Chat): Header should be shown with drawer toggle

### Font Loading

Custom dyslexia-friendly fonts are loaded at the root level in `app/_layout.tsx`. The component returns `null` while fonts load to prevent rendering issues.

### Color Scheme

- **Light Mode**: Azure background, Indigo accent
- **Dark Mode**: Midnight blue background, Gold accent
- Automatic detection with manual override capability
- Web hydration handled in `use-color-scheme.web.ts`

### Icon Handling

- **iOS**: Native SF Symbols via `icon-symbol.ios.tsx`
- **Android/Web**: Material Icons via `icon-symbol.tsx`
- Manual symbol-to-icon mapping prevents mismatches

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [React Navigation Drawer](https://reactnavigation.org/docs/drawer-navigator/)
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [OpenDyslexic Font Project](https://opendyslexic.org/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [Material Icons](https://icons.expo.fyi)

## Community

- [Expo Discord](https://chat.expo.dev)
- [Expo GitHub](https://github.com/expo/expo)
- [React Native Community](https://reactnative.dev/community/overview)

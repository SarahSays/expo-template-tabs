/**
 * appearance.tsx
 *
 * Maintainer notes:
 * This route file is intentionally lightweight and focused on screen composition.
 * Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';


/**
 * AppearanceScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.
 * Maintainer guidance: Keep side effects near the top-level component for visibility. 
 * Treat this component as the route contract for downstream navigation and params.
 */
export default function AppearanceScreen() {
  const [useSystemFont, setUseSystemFont] = useState(false);
  const [followSystemTheme, setFollowSystemTheme] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Appearance</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Change theme, colors, and visual preferences to make the app feel like yours.
      </ThemedText>

      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">General (demo)</ThemedText>
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <ThemedText type="body">Use System Font</ThemedText>
            <ThemedText style={styles.detailText}>
              {useSystemFont
                ? ' On: Device’s system font. \n Off: OpenDyslexic font.'
                : ' Off: OpenDyslexic font. \n On: Device’s system font.'}
            </ThemedText>
          </View>
          <Switch
            accessibilityLabel="Use System Font"
            value={useSystemFont}
            onValueChange={setUseSystemFont}
          />
        </View>
      </View>

      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">Theme Settings</ThemedText>
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <ThemedText type="body">Follow system colors</ThemedText>
            <ThemedText style={styles.detailText}>
              Display light or dark mode based on device settings.
            </ThemedText>
          </View>
          <Switch
            accessibilityLabel="Follow system theme"
            value={followSystemTheme}
            onValueChange={setFollowSystemTheme}
          />
        </View>
      </View>

      <ThemedText style={styles.noteText}>
        Demo controls only. Changes are kept while this screen is mounted.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  body: {
    marginTop: 16,
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  toggleTextBlock: {
    flex: 1,
  },
  detailText: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.75,
  },
  noteText: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 17,
  },
});

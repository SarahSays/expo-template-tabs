/**
 * preferences.tsx
 *
 * Maintainer notes:`r`n * - This route file is intentionally lightweight and focused on screen composition.`r`n * - Keep navigation contracts and route params in sync with sibling screens.
 */
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { getBirthdayPromptSettings, updateBirthdayPromptSettings } from '../(tabs)/orbits/contacts/_birthdayPromptStore';

/**
 * PreferencesScreen component.
 *
 * Renders this route UI and centralizes local interaction and state wiring.`r`n *`r`n * Maintainer guidance:`r`n * - Keep side effects near the top-level component for visibility.`r`n * - Treat this component as the route contract for downstream navigation and params.
 */
export default function PreferencesScreen() {
  const [settings, setSettings] = useState(getBirthdayPromptSettings());

  useEffect(() => {
    setSettings(getBirthdayPromptSettings());
  }, []);

  const updateSetting = (next: Partial<typeof settings>) => {
    updateBirthdayPromptSettings(next);
    setSettings(getBirthdayPromptSettings());
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Preferences</ThemedText>
      <ThemedText type="body" style={styles.body}>
        Adjust your app preferences and behavior settings from here.
      </ThemedText>

      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">Birthday Nudges (Demo)</ThemedText>

        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <ThemedText type="body">Prompt me to wish friends happy birthday</ThemedText>
          </View>
          <Switch
            value={settings.promptOnBirthday}
            onValueChange={(value) => updateSetting({ promptOnBirthday: value })}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <ThemedText type="body">Enable pre-filled birthday wish push (demo)</ThemedText>
          </View>
          <Switch
            value={settings.enablePrefilledWishPush}
            onValueChange={(value) => updateSetting({ enablePrefilledWishPush: value })}
            disabled={!settings.promptOnBirthday}
          />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <ThemedText type="body">Enable pre-written reply push (demo)</ThemedText>
          </View>
          <Switch
            value={settings.enablePrewrittenReplyPush}
            onValueChange={(value) => updateSetting({ enablePrewrittenReplyPush: value })}
            disabled={!settings.promptOnBirthday}
          />
        </View>

        <ThemedText style={styles.noteText}>
          Demo mode: these toggles currently drive in-app prompts only.
        </ThemedText>
        <ThemedText style={styles.noteText}>
          Production note: wire this to authenticated users, store server-side preferences,
          and trigger notifications via Expo push tokens + backend auth tokens.
        </ThemedText>

        <Pressable
          onPress={() => updateSetting({
            promptOnBirthday: true,
            enablePrefilledWishPush: true,
            enablePrewrittenReplyPush: false,
          })}
          style={styles.resetButton}
        >
          <ThemedText style={styles.resetButtonText}>Reset demo defaults</ThemedText>
        </Pressable>
      </View>
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
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    gap: 10,
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
  noteText: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 17,
  },
  resetButton: {
    marginTop: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

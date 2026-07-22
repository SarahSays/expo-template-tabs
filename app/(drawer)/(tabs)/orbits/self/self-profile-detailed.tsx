/**
 * self-profile-detailed.tsx
 *
 * File-level documentation comment.
 */
import { KeyboardAvoidingContainer } from '@/components/keyboard-avoiding-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

const savedSelfProfileData = {
  weeHours: false,
  favoriteThings: '',
  icebreakers: '',
  slingshots: '',
};

/**
 * SelfProfileDetailed component.
 *
 * Renders the UI for the Selfprofile detailed view.
 */
export default function SelfProfileDetailed() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[colorScheme];
  const fonts = Fonts ?? { sans: undefined, sansBold: undefined };
  const [weeHours, setWeeHours] = useState(savedSelfProfileData.weeHours);
  const [birthday, setBirthday] = useState(new Date(2000, 2, 15));
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [favoriteThings, setFavoriteThings] = useState(savedSelfProfileData.favoriteThings);
  const [icebreakers, setIcebreakers] = useState(savedSelfProfileData.icebreakers);
  const [slingshots, setSlingshots] = useState(savedSelfProfileData.slingshots);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return;
    }

    const timeout = setTimeout(() => setSaved(false), 1800);
    return () => {
      clearTimeout(timeout);
    };
  }, [saved]);

  function handleSave() {
    savedSelfProfileData.weeHours = weeHours;
    savedSelfProfileData.favoriteThings = favoriteThings;
    savedSelfProfileData.icebreakers = icebreakers;
    savedSelfProfileData.slingshots = slingshots;
    setSaved(true);
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}> 
      <KeyboardAvoidingContainer>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <ThemedText type="title" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Profile (Nova Star)</ThemedText>
          </View>
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#161423' : '#f2f2f7' }]}> 
            <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Birthday</ThemedText>
          <TouchableOpacity
            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1f1c2a' : '#fff', justifyContent: 'center' }]}
            onPress={() => setShowBirthdayPicker(true)}>
            <ThemedText lightColor={theme.text} style={{ fontFamily: fonts.sans }}>
              {birthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </ThemedText>
          </TouchableOpacity>
          {showBirthdayPicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedDate) => {
                setShowBirthdayPicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setBirthday(selectedDate);
                }
              }}
            />
          )}
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Wee hours OK/not OK to message me in</ThemedText>
          <Switch value={weeHours} onValueChange={setWeeHours} />
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Timezone</ThemedText>
          <ThemedText lightColor="#2B0F55" style={{ fontFamily: fonts.sans, marginTop: 6 }}>Pacific Time — 10:23 AM</ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Slingshots</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1f1c2a' : '#fff', color: theme.text }]}
            placeholder="Topics to remember to circle back on"
            placeholderTextColor={colorScheme === 'dark' ? '#8b8b99' : '#6b7280'}
            value={slingshots}
            onChangeText={setSlingshots}
            multiline
            numberOfLines={2}
          />
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Favorite Things</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1f1c2a' : '#fff', color: theme.text }]}
            placeholder="At a glance: Love Languages... gift ideas..."
            placeholderTextColor={colorScheme === 'dark' ? '#8b8b99' : '#6b7280'}
            value={favoriteThings}
            onChangeText={setFavoriteThings}
            multiline
            numberOfLines={2}
          />
        </View>
        <View style={styles.section}>
          <ThemedText type="subtitle" lightColor="#2B0F55" style={{ fontFamily: fonts.sansBold }}>Icebreakers</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1f1c2a' : '#fff', color: theme.text }]}
            placeholder="Ask me about... - I will info-dump on... - Don't get me started on... Rants & raves..."
            placeholderTextColor={colorScheme === 'dark' ? '#8b8b99' : '#6b7280'}
            value={icebreakers}
            onChangeText={setIcebreakers}
            multiline
            numberOfLines={2}
          />
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#0A84FF' }]} onPress={handleSave}>
            <ThemedText style={styles.buttonText}>{saved ? 'Saved' : 'Save'}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 96 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  card: { borderRadius: 18, padding: 18 },
  section: { marginTop: 18 },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 12,
    marginTop: 8,
    minHeight: 52,
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
});
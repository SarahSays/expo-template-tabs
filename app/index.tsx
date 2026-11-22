import { Image } from 'expo-image';
import { useRouter, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSession } from '@/contexts/SessionContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { startSession } = useSession();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const emojiSize = Math.min(windowHeight * 0.25, windowWidth * 0.85);

  const enterDemo = async () => {
    await startSession('demo');
    router.replace('/feed' as Href);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.headerBackground, dark: Colors.dark.headerBackground }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText type="title">Start Orbiting</ThemedText>
      <Image
        source={require('@/assets/images/dizzy.webp')}
        style={{ width: emojiSize, height: emojiSize, alignSelf: 'center' }}
        contentFit="contain"
        autoplay
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText style={styles.description}>
            The Reconnection App
          </ThemedText>

          <View style={styles.footer}>
            <ThemedText style={styles.legalText}>
              By continuing, you agree to our{' '}
              <ExternalLink href="https://expo.dev/terms">
                <ThemedText style={styles.linkText}>Terms of Service</ThemedText>
              </ExternalLink>{' '}
              and{' '}
              <ExternalLink href="https://expo.dev/privacy">
                <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
              </ExternalLink>.
            </ThemedText>

            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
              onPress={() => router.push('/home')}
            >
              <ThemedText style={styles.primaryButtonText}>Continue with Email</ThemedText>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.demoButton, pressed && styles.demoButtonPressed]}
              onPress={enterDemo}
            >
              <ThemedText style={styles.demoButtonText}>Skip sign-in and explore demo</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: { height: 178, width: 290, bottom: 0, left: 0, position: 'absolute' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16, justifyContent: 'space-between' },
  description: { marginTop: 16, lineHeight: 24 },
  footer: { marginTop: 24, paddingVertical: 24, paddingHorizontal: 4, gap: 14 },
  legalText: { marginBottom: 4, lineHeight: 22, fontSize: 14 },
  linkText: { color: '#007AFF', textDecorationLine: 'underline', fontSize: 14 },
  primaryButton: { backgroundColor: '#2563eb', borderRadius: 999, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  primaryButtonPressed: { backgroundColor: '#1d4ed8' },
  primaryButtonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  demoButton: { paddingVertical: 14, alignItems: 'center' },
  demoButtonPressed: { opacity: 0.7 },
  demoButtonText: { color: '#2563eb', fontWeight: '600' },
});

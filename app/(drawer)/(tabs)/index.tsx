/**
 * Home Tab Initial Screen - Entry point for home tab
 * 
 * Displays welcome screen with authentication/navigation options.
 * Uses ParallaxScrollView for animated header effect.
 * Navigation options:
 * - Continue with Email: Navigate to email verification
 * - Skip sign-in: Jump directly to Orbits tab
 */

import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

/**
 * Menu items for authentication flow
 * @const {Array} menuItems - Navigation options for welcome screen
 */
const menuItems = [
  {
    title: 'Continue with Email', 
    description: 'By continuing, you agree to our Terms of Service and Privacy Policy.', 
    href: '/home'
  },
  {
    title: 'Skip sign-in', 
    description: 'Jump directly to an Orbits demo.', 
    href: '/orbits'
  },
] as const;

/**
 * Renders the home tab welcome screen with parallax header
 * 
 * @returns {React.ReactNode} Welcome screen with authentication options
 * 
 * Features:
 * - Parallax animated header with app logo
 * - Animated waving emoji greeting
 * - Menu items for authentication or app exploration
 * - Press feedback with visual state changes
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.headerBackground,
        dark: Colors.dark.headerBackground,
      }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedText type="title">Orbits!</ThemedText>
      <HelloWave />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.menu}>
            {menuItems.map((item) => (
              <Pressable
                key={item.title}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed ? styles.menuItemPressed : null,
                ]}
                onPress={() => router.push(item.href)}>
                <View style={styles.menuText}>
                  <ThemedText type="subtitle">{item.title}</ThemedText>
                  <ThemedText>{item.description}</ThemedText>
                </View>
                <ThemedText type="link">›</ThemedText>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 2,
    justifyContent: 'flex-start',
  },
  menu: {
    marginTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 12,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  menuText: {
    flex: 1,
    marginRight: 6,
  },
});

import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const menuItems = [
  { title: 'Cadences', description: 'Circular orbital paths', href: '/orbits/cadences' },
  { title: 'Friends', description: 'Planets/Satellites/Comets', href: '/orbits/friends' },
  { title: 'Groups', description: 'Moons/Clusters', href: '/orbits/groups' },
  { title: 'Self', description: 'Sun/Center', href: '/orbits/self' }
] as const;

/* export const screenOptions = {
  title: 'Orbits',
}; */

export default function OrbitsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <ThemedText type="title">Orbits</ThemedText> */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  menu: {
    gap: 16,
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuText: {
    flex: 1,
  },
});
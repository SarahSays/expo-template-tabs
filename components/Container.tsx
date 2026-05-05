import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView, StyleSheet } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 31,
    fontFamily: Fonts.sans,
  },
  defaultSemiBold: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
  },
  title: {
    fontSize: 28,
    lineHeight: 52,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.sansBold,
    fontWeight: 'normal',
    lineHeight: 36,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: Fonts.sans,
  },
});

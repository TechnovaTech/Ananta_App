/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#127D96';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#127D96',
    primaryDark: '#1B3F47',
    secondary: '#E5E5E5',
    inputBackground: '#E5E5E5',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#127D96',
    primaryDark: '#1B3F47',
    secondary: '#333333',
    inputBackground: '#333333',
  },
};

export const Fonts = {
  inter: 'Inter_400Regular',
  interBold: 'Inter_700Bold',
  interSemiBold: 'Inter_600SemiBold',
};

export const FontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  title: 48,
};

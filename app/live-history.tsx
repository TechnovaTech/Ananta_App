import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const BackIcon = ({ color = 'black' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function LiveHistoryScreen() {
  const { isDark } = useTheme();
  const historyItems = [
    {
      id: 1,
      title: 'Music Chat',
      date: 'Sep 11, 45 min.',
      image: require('@/assets/images/h1.png.png')
    },
    {
      id: 2,
      title: 'Game Stream',
      date: 'Sep 11, 45 min.',
      image: require('@/assets/images/h2.png.png')
    }
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white', borderBottomColor: isDark ? '#555' : '#127d96' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <BackIcon color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: isDark ? 'white' : '#333' }]}>Live Data & History</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {historyItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.historyItem, { 
            backgroundColor: isDark ? '#333' : '#F5F5F5',
            borderColor: isDark ? '#555' : '#126996'
          }]}>
            <Image source={item.image} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <ThemedText style={[styles.historyTitle, { color: isDark ? 'white' : 'black' }]}>{item.title}</ThemedText>
              <ThemedText style={[styles.historyDate, { color: isDark ? '#ccc' : '#666' }]}>{item.date}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 2,
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
  },
});
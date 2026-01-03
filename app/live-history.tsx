import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useMemo } from 'react';

const { width } = Dimensions.get('window');

const BackIcon = ({ color = 'black' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const DropdownIcon = ({ color = 'black' }) => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function LiveHistoryScreen() {
  const { isDark } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [showSidebar, setShowSidebar] = useState(false);

  const months = [
    'All Months',
    'Jan 2024',
    'Feb 2024', 
    'Mar 2024',
    'Apr 2024',
    'May 2024',
    'Jun 2024',
    'Jul 2024',
    'Aug 2024',
    'Sep 2024',
    'Oct 2024',
    'Nov 2024',
    'Dec 2024'
  ];

  const allHistoryItems = [
    {
      id: 1,
      title: 'Music Chat',
      date: 'Sep 11, 45 min.',
      month: 'Sep 2024',
      image: require('@/assets/images/h1.png.png')
    },
    {
      id: 2,
      title: 'Game Stream',
      date: 'Sep 11, 45 min.',
      month: 'Sep 2024',
      image: require('@/assets/images/h2.png.png')
    },
    {
      id: 3,
      title: 'Talk Show',
      date: 'Aug 25, 30 min.',
      month: 'Aug 2024',
      image: require('@/assets/images/h1.png.png')
    },
    {
      id: 4,
      title: 'Comedy Night',
      date: 'Aug 20, 60 min.',
      month: 'Aug 2024',
      image: require('@/assets/images/h2.png.png')
    },
    {
      id: 5,
      title: 'Dance Party',
      date: 'Jul 15, 90 min.',
      month: 'Jul 2024',
      image: require('@/assets/images/h1.png.png')
    }
  ];

  const filteredHistoryItems = useMemo(() => {
    if (selectedMonth === 'All Months') {
      return allHistoryItems;
    }
    return allHistoryItems.filter(item => item.month === selectedMonth);
  }, [selectedMonth]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowSidebar(false);
  };

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

      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
        <TouchableOpacity 
          style={[styles.monthPicker, { 
            backgroundColor: isDark ? '#333' : '#f0f0f0',
            borderColor: isDark ? '#555' : '#127d96'
          }]}
          onPress={() => setShowSidebar(!showSidebar)}
        >
          <ThemedText style={[styles.monthPickerText, { color: isDark ? 'white' : '#333' }]}>
            {selectedMonth}
          </ThemedText>
          <DropdownIcon color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.contentWrapper, showSidebar && styles.dimmed]}>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {filteredHistoryItems.length > 0 ? (
              filteredHistoryItems.map((item) => (
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
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <ThemedText style={[styles.noDataText, { color: isDark ? '#ccc' : '#666' }]}>
                  No live history found for {selectedMonth}
                </ThemedText>
              </View>
            )}
          </ScrollView>
        </View>

        {showSidebar && (
          <>
            <TouchableOpacity 
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setShowSidebar(false)}
            />
            <View style={[styles.sidebar, { 
              backgroundColor: isDark ? '#333' : '#f8f9fa',
              borderLeftColor: isDark ? '#555' : '#127d96'
            }]}>
              <ThemedText style={[styles.sidebarTitle, { color: isDark ? 'white' : '#333' }]}>Filter</ThemedText>
              <ScrollView showsVerticalScrollIndicator={false}>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[styles.monthOption, {
                      backgroundColor: selectedMonth === month ? (isDark ? '#127d96' : '#127d96') : 'transparent'
                    }]}
                    onPress={() => handleMonthSelect(month)}
                  >
                    <ThemedText style={[styles.monthOptionText, { 
                      color: selectedMonth === month ? 'white' : (isDark ? '#ccc' : '#333'),
                      fontWeight: selectedMonth === month ? 'bold' : 'normal'
                    }]}>
                      {month}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  monthPickerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  contentWrapper: {
    flex: 1,
  },
  dimmed: {
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    borderLeftWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  monthOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  monthOptionText: {
    fontSize: 14,
    textAlign: 'center',
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
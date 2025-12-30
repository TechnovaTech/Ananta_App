import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
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

const CrownIcon = () => (
  <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
    <Path d="M5 16L3 8L8 11L12 5L16 11L21 8L19 16H5Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
    <Path d="M5 16H19V18H5V16Z" fill="#FFD700"/>
  </Svg>
);

const HeartIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.041 1.5487 8.5C1.5487 9.959 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" fill="#FFD700"/>
  </Svg>
);

const GiftIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6H16.25C16.25 4.21 14.79 2.75 13 2.75C11.21 2.75 9.75 4.21 9.75 6H4C2.9 6 2 6.9 2 8V10C2 10.55 2.45 11 3 11H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11H21C21.55 11 22 10.55 22 10V8C22 6.9 21.1 6 20 6Z" fill="#C0C0C0"/>
  </Svg>
);

const FrameIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19Z" fill="#C0C0C0"/>
    <Path d="M5 7H19V17H5V7Z" fill="none" stroke="#C0C0C0" strokeWidth="1"/>
  </Svg>
);

export default function LevelManagementScreen() {
  const { isDark } = useTheme();
  
  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/settings')}
        >
          <BackIcon color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Level Management</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>Mr. Perfect billa</ThemedText>
              <View style={styles.levelBadge}>
                <ThemedText style={styles.levelNumber}>1</ThemedText>
              </View>
            </View>
            <View style={styles.crownContainer}>
              <CrownIcon />
              <View style={styles.levelTag}>
                <ThemedText style={styles.levelTagText}>LV.1</ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <ThemedText style={styles.progressText}>Lv.1 - Lv.2</ThemedText>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <ThemedText style={styles.expText}>1 Exp to Level Up!</ThemedText>
          </View>
        </View>

        {/* Level Management Section */}
        <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : 'black' }]}>Level Management</ThemedText>
        
        <View style={styles.rewardsGrid}>
          <View style={styles.rewardItem}>
            <HeartIcon />
            <ThemedText style={[styles.rewardTitle, { color: isDark ? 'white' : 'black' }]}>Newbie gift</ThemedText>
            <View style={[styles.rewardLevel, styles.unlockedLevel]}>
              <ThemedText style={styles.unlockedLevelText}>Lv.1</ThemedText>
            </View>
          </View>
          
          <View style={styles.rewardItem}>
            <GiftIcon />
            <ThemedText style={[styles.rewardTitle, { color: isDark ? 'white' : 'black' }]}>Level gift</ThemedText>
            <View style={[styles.rewardLevel, styles.lockedLevel]}>
              <ThemedText style={styles.lockedLevelText}>Lv.3</ThemedText>
            </View>
          </View>
          
          <View style={styles.rewardItem}>
            <FrameIcon />
            <ThemedText style={[styles.rewardTitle, { color: isDark ? 'white' : 'black' }]}>Card frame</ThemedText>
            <View style={[styles.rewardLevel, styles.lockedLevel]}>
              <ThemedText style={styles.lockedLevelText}>Lv.5</ThemedText>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 20,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleUnderline: {
    width: 140,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  levelCard: {
    backgroundColor: '#126996',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  levelBadge: {
    backgroundColor: '#00C851',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crownContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  levelTag: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: -10,
  },
  levelTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 15,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    width: '20%',
    backgroundColor: '#00C851',
    borderRadius: 3,
  },
  expText: {
    color: 'white',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rewardItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  rewardLevel: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unlockedLevel: {
    backgroundColor: '#FFD700',
  },
  lockedLevel: {
    backgroundColor: '#C0C0C0',
  },
  unlockedLevelText: {
    fontSize: 11,
    fontWeight: '900',
    color: 'black',
  },
  lockedLevelText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#666',
  },
});
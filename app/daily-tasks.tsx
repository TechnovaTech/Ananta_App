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

const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17L4 12" stroke="#00C851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const CoinIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#FFD700"/>
  </Svg>
);

export default function DailyTasksScreen() {
  const { isDark } = useTheme();
  const dailyTasks = [
    {
      id: 1,
      title: 'Start a Live Stream',
      description: 'Go live for at least 10 minutes',
      reward: 50,
      completed: true,
      progress: '1/1'
    },
    {
      id: 2,
      title: 'Watch 3 Live Streams',
      description: 'Watch other streamers for 5 minutes each',
      reward: 30,
      completed: false,
      progress: '2/3'
    },
    {
      id: 3,
      title: 'Send 10 Messages',
      description: 'Chat with other users in live streams',
      reward: 20,
      completed: true,
      progress: '10/10'
    },
    {
      id: 4,
      title: 'Follow 2 New Streamers',
      description: 'Discover and follow new content creators',
      reward: 25,
      completed: false,
      progress: '1/2'
    },
    {
      id: 5,
      title: 'Receive 5 Hearts',
      description: 'Get hearts from viewers during your stream',
      reward: 40,
      completed: false,
      progress: '3/5'
    },
    {
      id: 6,
      title: 'Share a Stream',
      description: 'Share your favorite stream with friends',
      reward: 15,
      completed: false,
      progress: '0/1'
    },
    {
      id: 7,
      title: 'Login Daily',
      description: 'Open the app and check in',
      reward: 10,
      completed: true,
      progress: '1/1'
    }
  ];

  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const totalRewards = dailyTasks.filter(task => task.completed).reduce((sum, task) => sum + task.reward, 0);

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
          <ThemedText style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Daily Tasks</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Summary */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isDark ? '#333' : '#F5F5F5',
          borderColor: isDark ? '#555' : '#126996'
        }]}>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryNumber}>{completedTasks}/{dailyTasks.length}</ThemedText>
            <ThemedText style={[styles.summaryLabel, { color: isDark ? '#ccc' : '#666' }]}>Tasks Completed</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.coinsContainer}>
              <CoinIcon />
              <ThemedText style={styles.summaryNumber}>{totalRewards}</ThemedText>
            </View>
            <ThemedText style={[styles.summaryLabel, { color: isDark ? '#ccc' : '#666' }]}>Coins Earned</ThemedText>
          </View>
        </View>

        {/* Task List */}
        {dailyTasks.map((task) => (
          <View key={task.id} style={[styles.taskCard, task.completed && styles.completedTask, {
            backgroundColor: task.completed ? (isDark ? '#1a4a1a' : '#E8F5E8') : (isDark ? '#333' : '#F5F5F5'),
            borderColor: task.completed ? '#00C851' : (isDark ? '#555' : '#126996')
          }]}>
            <View style={styles.taskHeader}>
              <View style={styles.taskInfo}>
                <ThemedText style={[styles.taskTitle, { color: isDark ? 'white' : 'black' }]}>{task.title}</ThemedText>
                <ThemedText style={[styles.taskDescription, { color: isDark ? '#ccc' : '#666' }]}>{task.description}</ThemedText>
                <ThemedText style={styles.taskProgress}>Progress: {task.progress}</ThemedText>
              </View>
              <View style={styles.taskReward}>
                {task.completed ? (
                  <View style={styles.completedBadge}>
                    <CheckIcon />
                  </View>
                ) : (
                  <View style={styles.rewardBadge}>
                    <CoinIcon />
                    <ThemedText style={styles.rewardText}>{task.reward}</ThemedText>
                  </View>
                )}
              </View>
            </View>
            
            {!task.completed && (
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(parseInt(task.progress.split('/')[0]) / parseInt(task.progress.split('/')[1])) * 100}%` }
                  ]} 
                />
              </View>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: isDark ? '#aaa' : '#999' }]}>Tasks reset daily at midnight</ThemedText>
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
    width: 80,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  summaryCard: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#126996',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  completedTask: {
    borderColor: '#00C851',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 6,
  },
  taskProgress: {
    fontSize: 12,
    color: '#126996',
    fontWeight: '600',
  },
  taskReward: {
    alignItems: 'center',
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  completedBadge: {
    backgroundColor: '#00C851',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#126996',
    borderRadius: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
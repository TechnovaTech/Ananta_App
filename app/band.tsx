import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Dimensions, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const BackIcon = ({ color = 'black' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const UnbanIcon = ({ color = '#127d96' }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill={color}/>
  </Svg>
);

const BanIcon = ({ color = '#ff4444' }) => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.59 7.59 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.41 16.41 20 12 20Z" fill={color}/>
  </Svg>
);

export default function BandScreen() {
  const { isDark } = useTheme();
  const [bannedUsers, setBannedUsers] = useState([
    {
      id: 1,
      name: 'Alex Wilson',
      username: '@alexw',
      image: require('@/assets/images/h1.png.png'),
      bannedDate: '2024-01-20',
      reason: 'Inappropriate behavior',
      duration: 'Permanent'
    },
    {
      id: 2,
      name: 'Sarah Connor',
      username: '@sarahc',
      image: require('@/assets/images/h2.png.png'),
      bannedDate: '2024-01-18',
      reason: 'Spam messages',
      duration: '7 days'
    },
    {
      id: 3,
      name: 'Tom Brown',
      username: '@tombrown',
      image: require('@/assets/images/h1.png.png'),
      bannedDate: '2024-01-15',
      reason: 'Harassment',
      duration: '30 days'
    }
  ]);

  const handleUnban = (userId: number, userName: string) => {
    Alert.alert(
      'Unban User',
      `Are you sure you want to unban ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unban',
          style: 'destructive',
          onPress: () => {
            setBannedUsers(prev => prev.filter(user => user.id !== userId));
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white', borderBottomColor: isDark ? '#555' : '#127d96' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackIcon color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: isDark ? 'white' : '#333' }]}>Banned Users</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {bannedUsers.length > 0 ? (
          bannedUsers.map((user) => (
            <View key={user.id} style={[styles.userItem, { 
              backgroundColor: isDark ? '#333' : '#F5F5F5',
              borderColor: isDark ? '#555' : '#e0e0e0'
            }]}>
              <Image source={user.image} style={styles.profileImage} />
              <View style={styles.userInfo}>
                <View style={styles.userHeader}>
                  <ThemedText style={[styles.userName, { color: isDark ? 'white' : 'black' }]}>{user.name}</ThemedText>
                  <View style={styles.banBadge}>
                    <BanIcon />
                    <ThemedText style={styles.banText}>BANNED</ThemedText>
                  </View>
                </View>
                <ThemedText style={[styles.userHandle, { color: isDark ? '#ccc' : '#666' }]}>{user.username}</ThemedText>
                <ThemedText style={[styles.reason, { color: isDark ? '#ff6666' : '#ff4444' }]}>
                  Reason: {user.reason}
                </ThemedText>
                <ThemedText style={[styles.duration, { color: isDark ? '#999' : '#888' }]}>
                  Duration: {user.duration}
                </ThemedText>
                <ThemedText style={[styles.bannedDate, { color: isDark ? '#999' : '#888' }]}>
                  Banned on {new Date(user.bannedDate).toLocaleDateString()}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={[styles.unbanButton, { backgroundColor: isDark ? '#127d96' : '#127d96' }]}
                onPress={() => handleUnban(user.id, user.name)}
              >
                <UnbanIcon color="white" />
                <ThemedText style={styles.unbanText}>Unban</ThemedText>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <ThemedText style={[styles.emptyText, { color: isDark ? '#ccc' : '#666' }]}>
              No banned users
            </ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: isDark ? '#999' : '#888' }]}>
              Users who are banned will appear here
            </ThemedText>
          </View>
        )}
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
    paddingTop: 15,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  banBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  banText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  userHandle: {
    fontSize: 14,
    marginBottom: 4,
  },
  reason: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    marginBottom: 2,
  },
  bannedDate: {
    fontSize: 12,
  },
  unbanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unbanText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
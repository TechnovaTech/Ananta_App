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

const UnblockIcon = ({ color = '#127d96' }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8V11H16V13Z" fill={color}/>
  </Svg>
);

export default function BlockScreen() {
  const { isDark } = useTheme();
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      username: '@johndoe',
      image: require('@/assets/images/h1.png.png'),
      blockedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: '@janesmith',
      image: require('@/assets/images/h2.png.png'),
      blockedDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      username: '@mikej',
      image: require('@/assets/images/h1.png.png'),
      blockedDate: '2024-01-05'
    }
  ]);

  const handleUnblock = (userId: number, userName: string) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          style: 'destructive',
          onPress: () => {
            setBlockedUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert(
              'Success',
              `${userName} has been unblocked successfully!`,
              [{ text: 'OK' }]
            );
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
        <ThemedText style={[styles.title, { color: isDark ? 'white' : '#333' }]}>Blocked Users</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#2a2a2a' : '#f0f8ff' }]}>
          <ThemedText style={[styles.infoText, { color: isDark ? '#ccc' : '#666' }]}>
            Blocked users cannot send you messages or see your profile. You can unblock them anytime.
          </ThemedText>
        </View>
        
        {blockedUsers.length > 0 ? (
          blockedUsers.map((user) => (
            <View key={user.id} style={[styles.userItem, { 
              backgroundColor: isDark ? '#333' : '#F5F5F5',
              borderColor: isDark ? '#555' : '#e0e0e0'
            }]}>
              <Image source={user.image} style={styles.profileImage} />
              <View style={styles.userInfo}>
                <ThemedText style={[styles.userName, { color: isDark ? 'white' : 'black' }]}>{user.name}</ThemedText>
                <ThemedText style={[styles.userHandle, { color: isDark ? '#ccc' : '#666' }]}>{user.username}</ThemedText>
                <ThemedText style={[styles.blockedDate, { color: isDark ? '#999' : '#888' }]}>
                  Blocked on {new Date(user.blockedDate).toLocaleDateString()}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={[styles.unblockButton, { backgroundColor: isDark ? '#127d96' : '#127d96' }]}
                onPress={() => handleUnblock(user.id, user.name)}
              >
                <UnblockIcon color="white" />
                <ThemedText style={styles.unblockText}>Unblock</ThemedText>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIcon, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
              <UnblockIcon color={isDark ? '#666' : '#999'} />
            </View>
            <ThemedText style={[styles.emptyText, { color: isDark ? '#ccc' : '#666' }]}>
              No blocked users
            </ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: isDark ? '#999' : '#888' }]}>
              Users you block will appear here and you can unblock them anytime
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
  infoCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 14,
    marginBottom: 2,
  },
  blockedDate: {
    fontSize: 12,
  },
  unblockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unblockText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
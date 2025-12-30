import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

const followingData = [
  { id: '1', name: 'Alex Brown', username: '@alexb', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', isFollowing: true },
  { id: '2', name: 'Emma Davis', username: '@emmad', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', isFollowing: true },
  { id: '3', name: 'Chris Wilson', username: '@chrisw', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', isFollowing: true },
  { id: '4', name: 'Lisa Garcia', username: '@lisag', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face', isFollowing: true },
];

export default function FollowingScreen() {
  const { isDark } = useTheme();

  const renderFollowing = ({ item }) => (
    <View style={[styles.followingItem, { backgroundColor: isDark ? '#333' : 'white' }]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.name, { color: isDark ? 'white' : '#333' }]}>{item.name}</Text>
        <Text style={[styles.username, { color: isDark ? '#ccc' : '#666' }]}>{item.username}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.unfollowButton, { backgroundColor: isDark ? '#444' : '#e9ecef' }]}
      >
        <Text style={[styles.unfollowText, { color: isDark ? 'white' : '#333' }]}>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white', borderBottomColor: isDark ? '#333' : '#127d96' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Following</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={followingData}
        renderItem={renderFollowing}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  listContainer: {
    padding: 20,
  },
  followingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
  },
  unfollowButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unfollowText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
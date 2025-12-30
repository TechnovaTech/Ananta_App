import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function NotificationScreen() {
  const { isDark } = useTheme();
  const notifications = [
    {
      id: 1,
      user: 'Mr.Jimmy',
      message: 'Started following you.',
      time: '5 hour ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      type: 'follow',
      hasAction: false
    },
    {
      id: 2,
      user: 'Roy niger',
      message: 'stared live video',
      time: '30 min ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      type: 'live',
      hasAction: false
    },
    {
      id: 3,
      user: 'James anderson',
      message: 'want to join your live stream.',
      time: '30 min ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      type: 'request',
      hasAction: true
    }
  ];

  const renderNotification = (notification) => (
    <View key={notification.id} style={[styles.notificationItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: notification.avatar }} style={styles.avatar} />
        {notification.type === 'follow' && (
          <View style={styles.followBadge}>
            <Ionicons name="person-add" size={12} color="white" />
          </View>
        )}
        {notification.type === 'live' && (
          <View style={styles.liveBadge}>
            <Ionicons name="videocam" size={12} color="white" />
          </View>
        )}
      </View>
      
      <View style={styles.notificationContent}>
        <View style={styles.messageContainer}>
          <Text style={styles.notificationText}>
            <Text style={[styles.userName, { color: isDark ? 'white' : '#333' }]}>{notification.user} </Text>
            <Text style={[styles.messageText, { color: isDark ? '#ccc' : '#333' }]}>{notification.message}</Text>
          </Text>
          <Text style={[styles.timeText, { color: isDark ? '#aaa' : '#666' }]}>{notification.time}</Text>
        </View>
        
        {notification.hasAction && (
          <TouchableOpacity style={[styles.acceptButton, { backgroundColor: isDark ? '#555' : '#333' }]}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={[styles.moreIcon, { color: isDark ? '#ccc' : '#666' }]}>•</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white', borderBottomColor: isDark ? '#555' : '#127d96' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Notification</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Notifications List */}
      <ScrollView style={[styles.content, { backgroundColor: isDark ? '#333' : 'white' }]}>
        {notifications.map(renderNotification)}
      </ScrollView>
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
    paddingVertical: 15,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  followBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#127d96',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  liveBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageContainer: {
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
  },
  messageText: {
  },
  timeText: {
    fontSize: 12,
  },
  acceptButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  moreButton: {
    padding: 5,
  },
  moreIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
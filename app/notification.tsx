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

export default function NotificationScreen() {
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
    <View key={notification.id} style={styles.notificationItem}>
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
            <Text style={styles.userName}>{notification.user} </Text>
            <Text style={styles.messageText}>{notification.message}</Text>
          </Text>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
        
        {notification.hasAction && (
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>•</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Notifications List */}
      <ScrollView style={styles.content}>
        {notifications.map(renderNotification)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#127d96',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    color: '#333',
  },
  messageText: {
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  acceptButton: {
    backgroundColor: '#333',
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
    color: '#666',
    fontWeight: 'bold',
  },
});
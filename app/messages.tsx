import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function MessagesScreen() {
  const { isDark } = useTheme();
  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey! How are you doing?',
      time: '2:30 PM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      lastMessage: 'Thanks for the help yesterday!',
      time: '1:45 PM',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'See you tomorrow at the meeting',
      time: '12:20 PM',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      isOnline: false
    },
    {
      id: 4,
      name: 'Emma Davis',
      lastMessage: 'Can you send me the documents?',
      time: '11:30 AM',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 5,
      name: 'Alex Brown',
      lastMessage: 'Great job on the presentation!',
      time: 'Yesterday',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      isOnline: false
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white', borderBottomColor: isDark ? '#555' : '#127d96' }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.conversationsContainer} showsVerticalScrollIndicator={false}>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation.id} style={[styles.conversationItem, { 
            backgroundColor: isDark ? '#333' : 'white',
            borderBottomColor: isDark ? '#555' : '#f0f0f0'
          }]}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
              {conversation.isOnline && <View style={[styles.onlineIndicator, { borderColor: isDark ? '#333' : 'white' }]} />}
            </View>
            
            <View style={styles.conversationContent}>
              <View style={styles.conversationHeader}>
                <Text style={[styles.userName, { color: isDark ? 'white' : '#333' }]}>{conversation.name}</Text>
                <Text style={[styles.messageTime, { color: isDark ? '#ccc' : '#666' }]}>{conversation.time}</Text>
              </View>
              <View style={styles.messageRow}>
                <Text style={[styles.lastMessage, { color: isDark ? '#aaa' : '#666' }]} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                {conversation.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{conversation.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationsContainer: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
    borderWidth: 2,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#127d96',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
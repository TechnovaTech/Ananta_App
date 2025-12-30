import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function RoomAdminScreen() {
  const { isDark } = useTheme();
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [giftEnabled, setGiftEnabled] = useState(true);

  const roomUsers = [
    {
      id: 1,
      name: 'Micale Clarke',
      role: 'Host',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isMuted: false,
      isBlocked: false
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Moderator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      isMuted: false,
      isBlocked: false
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      role: 'Viewer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      isMuted: true,
      isBlocked: false
    },
    {
      id: 4,
      name: 'Mike Johnson',
      role: 'Viewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isMuted: false,
      isBlocked: false
    }
  ];

  const renderUser = (user) => (
    <View key={user.id} style={[styles.userItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
      <View style={styles.userLeft}>
        <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: isDark ? 'white' : '#333' }]}>{user.name}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity style={[styles.actionBtn, user.isMuted && styles.mutedBtn]}>
          <Ionicons 
            name={user.isMuted ? "mic-off" : "mic"} 
            size={16} 
            color={user.isMuted ? "#ff4444" : "#127d96"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="ban" size={16} color="#ff4444" />
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
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Room Admin</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Room Controls */}
        <View style={[styles.section, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Room Controls</Text>
          
          <View style={[styles.controlItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
            <View style={styles.controlLeft}>
              <Ionicons name="mic" size={20} color="#127d96" />
              <Text style={[styles.controlText, { color: isDark ? 'white' : '#333' }]}>Enable Microphone</Text>
            </View>
            <Switch
              value={micEnabled}
              onValueChange={setMicEnabled}
              trackColor={{ false: '#e9ecef', true: '#127d96' }}
              thumbColor={micEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.controlItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
            <View style={styles.controlLeft}>
              <Ionicons name="videocam" size={20} color="#127d96" />
              <Text style={[styles.controlText, { color: isDark ? 'white' : '#333' }]}>Enable Camera</Text>
            </View>
            <Switch
              value={cameraEnabled}
              onValueChange={setCameraEnabled}
              trackColor={{ false: '#e9ecef', true: '#127d96' }}
              thumbColor={cameraEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.controlItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
            <View style={styles.controlLeft}>
              <Ionicons name="chatbubbles" size={20} color="#127d96" />
              <Text style={[styles.controlText, { color: isDark ? 'white' : '#333' }]}>Enable Chat</Text>
            </View>
            <Switch
              value={chatEnabled}
              onValueChange={setChatEnabled}
              trackColor={{ false: '#e9ecef', true: '#127d96' }}
              thumbColor={chatEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.controlItem, { borderBottomColor: isDark ? '#555' : '#f0f0f0' }]}>
            <View style={styles.controlLeft}>
              <Ionicons name="gift" size={20} color="#127d96" />
              <Text style={[styles.controlText, { color: isDark ? 'white' : '#333' }]}>Enable Gifts</Text>
            </View>
            <Switch
              value={giftEnabled}
              onValueChange={setGiftEnabled}
              trackColor={{ false: '#e9ecef', true: '#127d96' }}
              thumbColor={giftEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Room Stats */}
        <View style={[styles.section, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Live Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Viewers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Gifts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2:15</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Duration</Text>
            </View>
          </View>
        </View>

        {/* Users Management */}
        <View style={[styles.section, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Users in Room ({roomUsers.length})</Text>
          {roomUsers.map(renderUser)}
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={20} color="white" />
            <Text style={styles.actionButtonText}>Invite Users</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Ionicons name="stop-circle" size={20} color="white" />
            <Text style={styles.actionButtonText}>End Stream</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 16,
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#127d96',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#127d96',
    fontWeight: '500',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  mutedBtn: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ff4444',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#127d96',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: '#ff4444',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
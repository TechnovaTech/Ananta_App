import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function AudioLiveScreen() {
  const { isDark } = useTheme();
  const params = useLocalSearchParams();
  const title = params.title as string || '#Love me like you do';
  const user = params.user as string || 'Micale clarke';
  const location = params.location as string || 'Location';
  const listeners = params.listeners as string || '1.2K';
  
  const [isFollowing, setIsFollowing] = useState(false);
  
  const [liveComments, setLiveComments] = useState<any[]>([
    { id: 1, user: 'Micale clarke', message: 'Hey! Welcome to my audio session', avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', isHost: true },
    { id: 2, user: 'You', message: 'Hi! Thanks for having me', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50', isHost: false },
    { id: 3, user: 'Micale clarke', message: 'How are you doing today?', avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', isHost: true }
  ]);
  const [messageText, setMessageText] = useState('');
  const [floatingHearts, setFloatingHearts] = useState<any[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const hostMessages = [
    'Great to have you here!',
    'What do you think of this song?',
    'Any requests?',
    'Thanks for listening!',
    'How\'s your day going?',
    'Love this vibe!',
    'You have great taste in music!'
  ];

  const userMessages = [
    'This is amazing!',
    'Love this track',
    'Can you play something upbeat?',
    'You have a great voice!',
    'This is so relaxing',
    'Perfect for today\'s mood',
    'Thanks for this session!'
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const addFloatingHeart = () => {
    const newHeart = {
      id: Date.now(),
      bottom: Math.random() * 200 + 100,
      right: Math.random() * 50 + 20,
    };
    setFloatingHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      const newComment = {
        id: Date.now(),
        user: 'You',
        message: messageText.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
        isHost: false
      };
      setLiveComments(prev => {
        const updated = [...prev, newComment];
        // Auto scroll after message is added
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updated;
      });
      setMessageText('');
      Keyboard.dismiss();
      
      // Host responds after 2-3 seconds
      setTimeout(() => {
        const randomHostMessage = hostMessages[Math.floor(Math.random() * hostMessages.length)];
        const hostResponse = {
          id: Date.now() + 1,
          user: user,
          message: randomHostMessage,
          avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          isHost: true
        };
        setLiveComments(prev => {
          const updated = [...prev, hostResponse];
          // Auto scroll after host response
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
          return updated;
        });
      }, Math.random() * 2000 + 2000);
    }
  };

  useEffect(() => {
    // Occasional host messages
    const interval = setInterval(() => {
      const randomHostMessage = hostMessages[Math.floor(Math.random() * hostMessages.length)];
      const newComment = {
        id: Date.now(),
        user: user,
        message: randomHostMessage,
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        isHost: true
      };
      setLiveComments(prev => {
        const updated = [...prev, newComment];
        // Auto scroll after host message
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updated;
      });
    }, Math.random() * 10000 + 8000); // Random interval between 8-18 seconds

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      clearInterval(interval);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=400' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)' }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
            style={styles.userAvatar}
          />
          <View>
            <ThemedText style={styles.username}>@{user}</ThemedText>
            <ThemedText style={styles.liveText}>{title}</ThemedText>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.followButton, isFollowing && styles.followingButton]} onPress={handleFollow}>
            <ThemedText style={[styles.followText, isFollowing && styles.followingText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.closeText}>×</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statIcon}>👁</ThemedText>
          <ThemedText style={styles.statText}>20 Viewers</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statIcon}>💛</ThemedText>
          <ThemedText style={styles.statText}>15k</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statIcon}>🎯</ThemedText>
          <ThemedText style={styles.statText}>55</ThemedText>
        </View>
      </View>

      <View style={[styles.audioVisualization, { opacity: isKeyboardVisible ? 0.3 : 1 }]}>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/images/audio image.webp')}
            style={styles.hostImage}
          />
          <View style={styles.profileBorder}></View>
          <View style={styles.audioRing}></View>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.commentsSection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.commentsContent}
      >
        {liveComments.map((comment) => (
          <View key={comment.id} style={[
            styles.liveCommentItem,
            comment.isHost ? styles.hostMessage : styles.userMessage
          ]}>
            <Image source={{ uri: comment.avatar }} style={styles.liveCommentAvatar} />
            <View style={[
              styles.liveCommentContent,
              comment.isHost ? styles.hostMessageBubble : styles.userMessageBubble
            ]}>
              <Text style={[
                styles.liveCommentUser,
                comment.isHost ? styles.hostUserText : styles.userUserText
              ]}>@{comment.user}</Text>
              <Text style={[
                styles.liveCommentText,
                comment.isHost ? styles.hostMessageText : styles.userMessageText
              ]}>{comment.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.floatingHeartsContainer}>
        {floatingHearts.map((heart) => (
          <View 
            key={heart.id} 
            style={[
              styles.floatingHeart,
              { bottom: heart.bottom, right: heart.right }
            ]}
          >
            <Text style={styles.heartEmoji}>❤️</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.9)' }]}>
          <TextInput
            style={[styles.messageInput, { color: isDark ? 'white' : 'black' }]}
            placeholder="Say Something..."
            placeholderTextColor={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText style={[styles.sendIcon, { color: isDark ? 'white' : 'black' }]}>▶</ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionIcon}>🎤</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionIcon}>🎁</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={addFloatingHeart}>
            <ThemedText style={styles.actionIcon}>❤️</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  followButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  followText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  followingButton: {
    backgroundColor: '#4CAF50',
  },
  followingText: {
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  statText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  audioVisualization: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -85 }, { translateY: -130 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: 'white',
  },
  profileBorder: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: '#127d96',
    opacity: 0.8,
  },
  audioRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: '#127d96',
    opacity: 0.5,
  },
  commentsSection: {
    position: 'absolute',
    bottom: 80,
    left: 5,
    right: 5,
    height: 200,
  },
  commentsContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  liveCommentItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  hostMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
  liveCommentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  liveCommentContent: {
    flex: 1,
    maxWidth: '75%',
    padding: 8,
    borderRadius: 12,
  },
  hostMessageBubble: {
    backgroundColor: 'rgba(18, 125, 150, 0.8)',
    borderTopLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopRightRadius: 4,
    marginLeft: 8,
  },
  liveCommentUser: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  hostUserText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userUserText: {
    color: 'rgba(18, 125, 150, 0.8)',
  },
  liveCommentText: {
    fontSize: 12,
    lineHeight: 16,
  },
  hostMessageText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userMessageText: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
  floatingHeartsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    pointerEvents: 'none',
  },
  floatingHeart: {
    position: 'absolute',
    opacity: 0.8,
  },
  heartEmoji: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  messageInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  sendButton: {
    padding: 5,
  },
  sendIcon: {
    color: 'white',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
});
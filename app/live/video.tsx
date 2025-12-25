import { StyleSheet, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

export default function VideoLiveScreen() {
  const params = useLocalSearchParams();
  const { userImage, userName, title, location, views } = params;
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const [comments, setComments] = useState([
    { id: 1, user: 'Johnson joy', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', avatar: require('@/assets/images/h1.png.png') },
    { id: 2, user: 'Johnson joy', message: 'Hi micale john', avatar: require('@/assets/images/h2.png.png') },
    { id: 3, user: 'Johnson joy', message: 'Hi micale john', avatar: require('@/assets/images/h3.png.png') },
    { id: 4, user: 'Henny', message: 'Hi', avatar: require('@/assets/images/h4.png.png') },
    { id: 5, user: 'Johnson joy', message: 'How are you?', avatar: require('@/assets/images/h1.png.png') },
    { id: 6, user: 'Henny', message: 'Im good, How are you?', avatar: require('@/assets/images/h2.png.png') },
  ]);
  const [likes, setLikes] = useState(15);
  const [isLiked, setIsLiked] = useState(false);

  // Get the background image from params or use default
  const getImageSource = () => {
    if (userImage) {
      try {
        const imageNumber = JSON.parse(userImage as string);
        return imageNumber;
      } catch {
        return require('@/assets/images/h5.png.png');
      }
    }
    return require('@/assets/images/h5.png.png');
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'You',
        message: message.trim(),
        avatar: require('@/assets/images/h1.png.png')
      };
      setComments([...comments, newComment]);
      setMessage('');
      // Auto scroll to bottom after adding new message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Auto scroll to bottom when component mounts
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={getImageSource()}
        style={styles.backgroundImage}
      />
      
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={getImageSource()}
              style={styles.userAvatar}
            />
            <View>
              <ThemedText style={styles.username}>@{userName || 'Micale clarke'}</ThemedText>
              <ThemedText style={styles.liveText}>{title || '#Love me like you do'}</ThemedText>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <ThemedText style={styles.followText}>Follow</ThemedText>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.closeText}>×</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statIcon}>👁</ThemedText>
            <ThemedText style={styles.statText}>{views || '20'} Viewers</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statIcon}>💛</ThemedText>
            <ThemedText style={styles.statText}>{likes}k</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statIcon}>🎯</ThemedText>
            <ThemedText style={styles.statText}>55</ThemedText>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.commentsList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          >
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={comment.avatar} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <ThemedText style={styles.commentUser}>@{comment.user}</ThemedText>
                  <ThemedText style={styles.commentText}>{comment.message}</ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Say Something..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <ThemedText style={styles.sendIcon}>▶</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionIcon}>🎤</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionIcon}>🎁</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, isLiked && styles.likedButton]} 
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <ThemedText style={[styles.actionIcon, { 
                color: isLiked ? '#ff3366' : 'white',
                transform: [{ scale: isLiked ? 1.2 : 1 }]
              }]}>❤️</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  liveText: {
    color: 'white',
    fontSize: 13,
    opacity: 0.9,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#127D96',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 15,
  },
  followText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  commentsSection: {
    flex: 1,
    marginBottom: 15,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  commentText: {
    color: 'white',
    fontSize: 13,
    opacity: 0.95,
    lineHeight: 18,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  messageInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 12,
  },
  sendButton: {
    padding: 8,
  },
  sendIcon: {
    color: 'white',
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: 'rgba(255,51,102,0.3)',
    borderColor: 'rgba(255,51,102,0.5)',
  },
  actionIcon: {
    fontSize: 20,
  },
});
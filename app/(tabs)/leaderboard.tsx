import { StyleSheet, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function LeaderboardScreen() {
  const topUsers = [
    { id: 1, name: 'Rachel James', location: 'Jamnagar, Gujarat, India', coins: 30600, rank: 1, image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=100' },
    { id: 2, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, rank: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 3, name: 'Sergio martin', location: 'Ahmedabad, Gujarat, India', coins: 24893, rank: 3, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  ];

  const otherUsers = [
    { id: 4, name: 'Sergio martin', location: 'Ahmedabad, Gujarat, India', coins: 24893, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    { id: 5, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 6, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  ];

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#DAA520';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ThemedText style={styles.backIcon}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Leaderboard</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        {topUsers.map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: getRankColor(user.rank) }]}>
            <View style={styles.rankBadge}>
              <ThemedText style={styles.rankNumber}>{user.rank}</ThemedText>
            </View>
            <Image source={{ uri: user.image }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>@{user.name}</ThemedText>
              <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
              <View style={styles.coinContainer}>
                <ThemedText style={styles.coinIcon}>🪙</ThemedText>
                <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
              </View>
            </View>
            <View style={styles.trophy}>
              <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        {otherUsers.map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: '#DAA520' }]}>
            <Image source={{ uri: user.image }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>@{user.name}</ThemedText>
              <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
              <View style={styles.coinContainer}>
                <ThemedText style={styles.coinIcon}>🪙</ThemedText>
                <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
              </View>
            </View>
            <View style={styles.trophy}>
              <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  backIcon: {
    fontSize: 24,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userImage: {
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
    color: 'white',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    marginBottom: 5,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  coinAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  trophy: {
    marginLeft: 10,
  },
  trophyIcon: {
    fontSize: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
    borderStyle: 'dashed',
  },
});
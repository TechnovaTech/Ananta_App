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
      case 1: return '#B8860B';
      case 2: return '#696969';
      case 3: return '#A0522D';
      default: return '#B8860B';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ThemedText style={styles.backIcon}>‹</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>Leaderboard</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {topUsers.map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: getRankColor(user.rank) }]}>
            <Image source={{ uri: user.image }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>@{user.name}</ThemedText>
              <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
              <View style={styles.coinContainer}>
                <View style={styles.coinBadge}>
                  <View style={styles.coinCircle}>
                    <ThemedText style={styles.coinIcon}>$</ThemedText>
                  </View>
                  <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
                </View>
              </View>
            </View>
            <View style={styles.rightSection}>
              <ThemedText style={styles.rankNumber}>{user.rank}</ThemedText>
              <View style={styles.trophyContainer}>
                <View style={styles.trophy}>
                  <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
                </View>
                <View style={styles.stars}>
                  <ThemedText style={styles.star}>★</ThemedText>
                  <ThemedText style={styles.star}>★</ThemedText>
                  <ThemedText style={styles.star}>★</ThemedText>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        {otherUsers.map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: getRankColor(1) }]}>
            <Image source={{ uri: user.image }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>@{user.name}</ThemedText>
              <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
              <View style={styles.coinContainer}>
                <View style={styles.coinBadge}>
                  <View style={styles.coinCircle}>
                    <ThemedText style={styles.coinIcon}>$</ThemedText>
                  </View>
                  <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
                </View>
              </View>
            </View>
            <View style={styles.rightSection}>
              <View style={styles.trophyContainer}>
                <View style={styles.trophy}>
                  <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
                </View>
                <View style={styles.stars}>
                  <ThemedText style={styles.star}>★</ThemedText>
                  <ThemedText style={styles.star}>★</ThemedText>
                  <ThemedText style={styles.star}>★</ThemedText>
                </View>
              </View>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 20,
  },
  backIcon: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,193,7,1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  coinCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  coinIcon: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  coinAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 80,
    height: 80,
  },
  rankNumber: {
    fontSize: 80,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.15)',
    position: 'absolute',
    right: 5,
    top: -5,
    zIndex: 0,
  },
  trophyContainer: {
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    right: 15,
    top: 10,
  },
  trophy: {
    backgroundColor: '#1E88E5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  trophyIcon: {
    fontSize: 20,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    fontSize: 8,
    color: '#FFD700',
    marginHorizontal: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    marginHorizontal: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
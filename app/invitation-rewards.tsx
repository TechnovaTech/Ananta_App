import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Share } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const BackIcon = ({ color = 'black' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const GiftIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6H16.25C16.25 4.21 14.79 2.75 13 2.75C11.21 2.75 9.75 4.21 9.75 6H4C2.9 6 2 6.9 2 8V10C2 10.55 2.45 11 3 11H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11H21C21.55 11 22 10.55 22 10V8C22 6.9 21.1 6 20 6Z" fill="#FFD700"/>
  </Svg>
);

const ShareIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="white"/>
  </Svg>
);

const CopyIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="white"/>
  </Svg>
);

const CoinIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#FFD700"/>
    <Path d="M12 6V18M8 9H16M8 15H16" stroke="black" strokeWidth="1"/>
  </Svg>
);

export default function InvitationRewardsScreen() {
  const { isDark } = useTheme();
  const inviteCode = "ANANTA2024";
  const totalInvites = 12;
  const totalRewards = 480;

  const rewardTiers = [
    { invites: 1, reward: 50, claimed: true },
    { invites: 3, reward: 100, claimed: true },
    { invites: 5, reward: 200, claimed: false },
    { invites: 10, reward: 500, claimed: false },
    { invites: 20, reward: 1000, claimed: false },
  ];

  const recentInvites = [
    { name: "John Doe", date: "2 days ago", reward: 50 },
    { name: "Sarah Smith", date: "5 days ago", reward: 50 },
    { name: "Mike Johnson", date: "1 week ago", reward: 50 },
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Ananta Live! Use my invite code: ${inviteCode} and get bonus coins! Download now: https://ananta.live`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/settings')}
        >
          <BackIcon color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Invitation Rewards</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <GiftIcon />
          <ThemedText style={styles.statsTitle}>Invite Friends & Earn Rewards!</ThemedText>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{totalInvites}</ThemedText>
              <ThemedText style={styles.statLabel}>Friends Invited</ThemedText>
            </View>
            <View style={styles.statItem}>
              <View style={styles.coinsContainer}>
                <CoinIcon />
                <ThemedText style={styles.statNumber}>{totalRewards}</ThemedText>
              </View>
              <ThemedText style={styles.statLabel}>Coins Earned</ThemedText>
            </View>
          </View>
        </View>

        {/* Invite Code */}
        <View style={styles.inviteSection}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : 'black' }]}>Your Invite Code</ThemedText>
          <View style={[styles.codeContainer, { 
            backgroundColor: isDark ? '#444' : '#F5F5F5',
            borderColor: isDark ? '#555' : '#126996'
          }]}>
            <ThemedText style={[styles.inviteCode, { color: isDark ? 'white' : '#126996' }]}>{inviteCode}</ThemedText>
            <TouchableOpacity style={styles.copyButton}>
              <CopyIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <ShareIcon />
            <ThemedText style={styles.shareText}>Share Invite Link</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Reward Tiers */}
        <View style={styles.rewardsSection}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : 'black' }]}>Reward Milestones</ThemedText>
          {rewardTiers.map((tier, index) => (
            <View key={index} style={[styles.tierCard, tier.claimed && styles.claimedTier, {
              backgroundColor: tier.claimed ? (isDark ? '#1a4a1a' : '#E8F5E8') : (isDark ? '#333' : '#F5F5F5'),
              borderColor: tier.claimed ? '#00C851' : (isDark ? '#555' : '#126996')
            }]}>
              <View style={styles.tierInfo}>
                <ThemedText style={[styles.tierTitle, { color: isDark ? 'white' : 'black' }]}>Invite {tier.invites} Friend{tier.invites > 1 ? 's' : ''}</ThemedText>
                <View style={styles.tierReward}>
                  <CoinIcon />
                  <ThemedText style={[styles.tierRewardText, { color: isDark ? '#ccc' : '#666' }]}>{tier.reward} Coins</ThemedText>
                </View>
              </View>
              <View style={styles.tierStatus}>
                {tier.claimed ? (
                  <View style={styles.claimedBadge}>
                    <ThemedText style={styles.claimedText}>Claimed</ThemedText>
                  </View>
                ) : totalInvites >= tier.invites ? (
                  <TouchableOpacity style={styles.claimButton}>
                    <ThemedText style={styles.claimText}>Claim</ThemedText>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedBadge}>
                    <ThemedText style={styles.lockedText}>{totalInvites}/{tier.invites}</ThemedText>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Recent Invites */}
        <View style={styles.recentSection}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : 'black' }]}>Recent Invites</ThemedText>
          {recentInvites.map((invite, index) => (
            <View key={index} style={[styles.inviteCard, { 
              backgroundColor: isDark ? '#333' : '#F5F5F5',
              borderColor: isDark ? '#555' : '#126996'
            }]}>
              <View style={styles.inviteInfo}>
                <ThemedText style={[styles.inviteName, { color: isDark ? 'white' : 'black' }]}>{invite.name}</ThemedText>
                <ThemedText style={[styles.inviteDate, { color: isDark ? '#ccc' : '#666' }]}>{invite.date}</ThemedText>
              </View>
              <View style={styles.inviteReward}>
                <CoinIcon />
                <ThemedText style={styles.inviteRewardText}>+{invite.reward}</ThemedText>
              </View>
            </View>
          ))}
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 20,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleUnderline: {
    width: 140,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  statsCard: {
    backgroundColor: '#126996',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 15,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inviteSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  codeContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
  },
  inviteCode: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#126996',
    padding: 8,
    borderRadius: 8,
  },
  shareButton: {
    backgroundColor: '#126996',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  shareText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsSection: {
    marginBottom: 25,
  },
  tierCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  claimedTier: {
    borderColor: '#00C851',
  },
  tierInfo: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tierReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tierRewardText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tierStatus: {
    alignItems: 'center',
  },
  claimedBadge: {
    backgroundColor: '#00C851',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  claimedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  claimButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  claimText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lockedBadge: {
    backgroundColor: '#C0C0C0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  lockedText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recentSection: {
    marginBottom: 30,
  },
  inviteCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  inviteInfo: {
    flex: 1,
  },
  inviteName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  inviteDate: {
    fontSize: 12,
  },
  inviteReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inviteRewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00C851',
  },
});
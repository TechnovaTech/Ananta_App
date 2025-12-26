import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function HelpFeedbackScreen() {
  const helpItems = [
    { id: 1, title: 'Frequently Asked Questions', description: 'Find answers to common questions' },
    { id: 2, title: 'Contact Support', description: 'Get help from our support team' },
    { id: 3, title: 'Report a Problem', description: 'Let us know about any issues' },
    { id: 4, title: 'Feature Request', description: 'Suggest new features' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/settings')}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Help & Feedback</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {helpItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.helpItem}>
            <View style={styles.textContainer}>
              <ThemedText style={styles.helpTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.helpDescription}>{item.description}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.feedbackSection}>
          <ThemedText style={styles.feedbackTitle}>Send us your feedback</ThemedText>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Type your feedback here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitText}>Submit Feedback</ThemedText>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',
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
    color: 'black',
  },
  titleUnderline: {
    width: 120,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  helpItem: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#126996',
  },
  textContainer: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
    color: '#666',
  },
  feedbackSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  feedbackInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#126996',
    minHeight: 100,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
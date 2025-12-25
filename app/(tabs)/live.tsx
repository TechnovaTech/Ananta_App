import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LiveScreen() {
  const [selectedType, setSelectedType] = useState<'video' | 'audio' | null>(null);

  const handleStartLive = () => {
    if (selectedType === 'video') {
      router.push('/live/video');
    } else if (selectedType === 'audio') {
      router.push('/live/audio');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Ananta</ThemedText>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <ThemedText style={styles.icon}>🔍</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ThemedText style={styles.icon}>⚙️</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.liveOptions}>
          <TouchableOpacity 
            style={[styles.liveOption, selectedType === 'video' && styles.selectedOption]}
            onPress={() => setSelectedType('video')}
          >
            <View style={[styles.optionIcon, selectedType === 'video' && styles.selectedIcon]}>
              <ThemedText style={styles.optionIconText}>📹</ThemedText>
            </View>
            <ThemedText style={styles.optionText}>Video live</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.liveOption, selectedType === 'audio' && styles.selectedOption]}
            onPress={() => setSelectedType('audio')}
          >
            <View style={[styles.optionIcon, selectedType === 'audio' && styles.selectedIcon]}>
              <ThemedText style={styles.optionIconText}>🎤</ThemedText>
            </View>
            <ThemedText style={styles.optionText}>Audio live</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.startLiveButtonContainer}
          onPress={handleStartLive}
          disabled={!selectedType}
        >
          <LinearGradient
            colors={selectedType ? [Colors.light.primary, Colors.light.primaryDark] : ['#ccc', '#999']}
            style={styles.startLiveButton}
          >
            <ThemedText style={styles.startLiveText}>Start Live</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  liveOptions: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 80,
  },
  liveOption: {
    alignItems: 'center',
  },
  selectedOption: {
    opacity: 1,
  },
  optionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedIcon: {
    backgroundColor: Colors.light.primary,
  },
  optionIconText: {
    fontSize: 30,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  startLiveButtonContainer: {
    width: '100%',
  },
  startLiveButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startLiveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <ThemedText style={styles.plusIcon}>+</ThemedText>
              )}
            </View>
            <ThemedText style={styles.galleryText}>Tap to select from gallery</ThemedText>
          </TouchableOpacity>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' }} 
            style={styles.iconImage} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Full name"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/561/561127.png' }} 
            style={styles.iconImage} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3616/3616729.png' }} 
            style={styles.iconImage} 
          />
          <TextInput
            style={styles.input}
            placeholder="User Bio/Hashtages"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
            style={styles.iconImage} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png' }} 
            style={styles.iconImage} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Birthdate"
            placeholderTextColor="#999"
          />
        </View>
      </View>
      
          <TouchableOpacity 
            style={styles.nextButtonContainer}
            onPress={() => router.push('/(tabs)')}
          >
            <LinearGradient
              colors={[Colors.light.primary, Colors.light.primaryDark]}
              style={styles.nextButton}
            >
              <ThemedText style={styles.buttonText}>Next</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 150,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  plusIcon: {
    fontSize: 30,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  galleryText: {
    fontSize: 12,
    color: Colors.light.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    gap: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: Colors.light.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  nextButtonContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  nextButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
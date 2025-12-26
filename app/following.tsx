import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FollowingScreen() {
  const [searchText, setSearchText] = useState('');
  const [following, setFollowing] = useState([
    {
      id: 1,
      name: '@Micale clarke',
      location: 'Indiapole, In , USA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: '@Miston Gasdumbe',
      location: 'Indiapole, In , USA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: '@Helsinki nairobi',
      location: 'Indiapole, In , USA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      name: '@Micale clarke',
      location: 'Noida, interpole UK',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    }
  ]);
  
  const removeFollowing = (id) => {
    setFollowing(following.filter(person => person.id !== id));
  };
  
  const filteredFollowing = following.filter(person => 
    person.name.toLowerCase().includes(searchText.toLowerCase()) ||
    person.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFollowing = ({ item }) => (
    <View style={styles.followingItem}>
      <View style={styles.followingLeft}>
        <Image source={{ uri: item.image }} style={styles.followingImage} />
        <View style={styles.followingInfo}>
          <Text style={styles.followingName}>{item.name}</Text>
          <Text style={styles.followingLocation}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFollowing(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Following</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Followings..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
      </View>
      
      {/* Following List */}
      <FlatList
        data={filteredFollowing}
        renderItem={renderFollowing}
        keyExtractor={(item) => item.id.toString()}
        style={styles.followingList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#126996',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#127d96',
    marginTop: 4,
  },
  placeholder: {
    width: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  followingList: {
    flex: 1,
    backgroundColor: 'white',
  },
  followingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  followingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  followingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  followingInfo: {
    flex: 1,
  },
  followingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  followingLocation: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
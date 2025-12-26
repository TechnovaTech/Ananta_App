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

export default function FollowersScreen() {
  const [searchText, setSearchText] = useState('');
  const [followers, setFollowers] = useState([
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
  
  const removeFollower = (id) => {
    setFollowers(followers.filter(follower => follower.id !== id));
  };
  
  const filteredFollowers = followers.filter(follower => 
    follower.name.toLowerCase().includes(searchText.toLowerCase()) ||
    follower.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFollower = ({ item }) => (
    <View style={styles.followerItem}>
      <View style={styles.followerLeft}>
        <Image source={{ uri: item.image }} style={styles.followerImage} />
        <View style={styles.followerInfo}>
          <Text style={styles.followerName}>{item.name}</Text>
          <Text style={styles.followerLocation}>{item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFollower(item.id)}>
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
        <Text style={styles.headerTitle}>Followers</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Followers..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
      </View>
      
      {/* Followers List */}
      <FlatList
        data={filteredFollowers}
        renderItem={renderFollower}
        keyExtractor={(item) => item.id.toString()}
        style={styles.followersList}
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
  followersList: {
    flex: 1,
    backgroundColor: 'white',
  },
  followerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  followerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  followerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  followerInfo: {
    flex: 1,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  followerLocation: {
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
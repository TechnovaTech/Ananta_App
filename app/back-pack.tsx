import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BackPackScreen() {
  const [selectedTab, setSelectedTab] = useState('calls');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isAudioCallActive, setIsAudioCallActive] = useState(false);

  const callFeatures = [
    {
      id: 1,
      name: 'Video Call',
      description: 'Start video call with viewers',
      icon: 'videocam',
      color: '#127d96',
      active: isVideoCallActive,
      onToggle: () => setIsVideoCallActive(!isVideoCallActive)
    },
    {
      id: 2,
      name: 'Audio Call',
      description: 'Start audio call with viewers',
      icon: 'call',
      color: '#4CAF50',
      active: isAudioCallActive,
      onToggle: () => setIsAudioCallActive(!isAudioCallActive)
    },
    {
      id: 3,
      name: 'Screen Share',
      description: 'Share your screen',
      icon: 'desktop',
      color: '#FF9800',
      active: false,
      onToggle: () => {}
    },
    {
      id: 4,
      name: 'Voice Effects',
      description: 'Apply voice filters',
      icon: 'mic',
      color: '#9C27B0',
      active: false,
      onToggle: () => {}
    }
  ];

  const renderCallFeature = (feature) => (
    <View key={feature.id} style={styles.callFeatureCard}>
      <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
        <Ionicons name={feature.icon} size={24} color="white" />
      </View>
      <View style={styles.featureInfo}>
        <Text style={styles.featureName}>{feature.name}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.toggleButton, feature.active && styles.activeToggle]}
        onPress={feature.onToggle}
      >
        <Text style={[styles.toggleText, feature.active && styles.activeToggleText]}>
          {feature.active ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const gifts = [
    {
      id: 1,
      name: 'Rose',
      quantity: 25,
      value: '10 coins',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=80&h=80&fit=crop'
    },
    {
      id: 2,
      name: 'Diamond',
      quantity: 5,
      value: '100 coins',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop'
    },
    {
      id: 3,
      name: 'Crown',
      quantity: 2,
      value: '500 coins',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=80&h=80&fit=crop'
    },
    {
      id: 4,
      name: 'Sports Car',
      quantity: 1,
      value: '1000 coins',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop'
    }
  ];

  const items = [
    {
      id: 1,
      name: 'Lucky Charm',
      quantity: 3,
      description: 'Increases gift chances',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=80&h=80&fit=crop'
    },
    {
      id: 2,
      name: 'VIP Pass',
      quantity: 1,
      description: '7 days remaining',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop'
    },
    {
      id: 3,
      name: 'Boost Token',
      quantity: 10,
      description: 'Double XP for 1 hour',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=80&h=80&fit=crop'
    }
  ];

  const renderGift = (gift) => (
    <View key={gift.id} style={styles.itemCard}>
      <Image source={{ uri: gift.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{gift.name}</Text>
        <Text style={styles.itemValue}>{gift.value}</Text>
      </View>
      <View style={styles.quantityBadge}>
        <Text style={styles.quantityText}>{gift.quantity}</Text>
      </View>
    </View>
  );

  const renderItem = (item) => (
    <View key={item.id} style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.quantityBadge}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
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
        <Text style={styles.headerTitle}>Back Pack</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'calls' && styles.activeTab]}
          onPress={() => setSelectedTab('calls')}
        >
          <Text style={[styles.tabText, selectedTab === 'calls' && styles.activeTabText]}>
            Calls
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'gifts' && styles.activeTab]}
          onPress={() => setSelectedTab('gifts')}
        >
          <Text style={[styles.tabText, selectedTab === 'gifts' && styles.activeTabText]}>
            Gifts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'items' && styles.activeTab]}
          onPress={() => setSelectedTab('items')}
        >
          <Text style={[styles.tabText, selectedTab === 'items' && styles.activeTabText]}>
            Items
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.itemsList}>
          {selectedTab === 'calls' 
            ? callFeatures.map(renderCallFeature)
            : selectedTab === 'gifts' 
            ? gifts.map(renderGift)
            : items.map(renderItem)
          }
        </View>
      </ScrollView>
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
    borderBottomColor: '#127d96',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#127d96',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#127d96',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  itemsList: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 14,
    color: '#127d96',
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  quantityBadge: {
    backgroundColor: '#127d96',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  callFeatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  toggleButton: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  activeToggle: {
    backgroundColor: '#127d96',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  activeToggleText: {
    color: 'white',
  },
});
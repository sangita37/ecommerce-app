import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  Image, TouchableOpacity, Dimensions, ActivityIndicator,
  TextInput, Button, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8 + 20;

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto-slide every 5 seconds with smooth offset
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % products.length;
      flatListRef.current?.scrollToOffset({
        offset: currentIndexRef.current * ITEM_WIDTH,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Empty Feedback', 'Please write something before submitting.');
      return;
    }
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedback('');
  };

  const renderBannerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bannerCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerInfo}>
        <Text numberOfLines={1} style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerPrice}>₹ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        <Text style={styles.header}>Welcome to Home 🏠</Text>
        <Text style={styles.paragraph}>
          Browse products, view your cart, and manage your profile easily from here.
        </Text>

        <Text style={styles.subHeader}>Featured Products</Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={products}
            renderItem={renderBannerItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bannerList}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="normal"
            pagingEnabled
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
          />
        )}

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackHeader}>📢 Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            placeholder="Write your thoughts here..."
            value={feedback}
            onChangeText={setFeedback}
          />
          <Button title="Submit" color="#20bf6b" onPress={handleFeedbackSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9fafe',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  bannerList: {
    marginBottom: 30,
  },
  bannerCard: {
    width: width * 0.8,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  bannerInfo: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#f1f2f6',
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
    lineHeight: 16,
  },
  bannerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b7bec',
    marginTop: 2,
  },
  feedbackContainer: {
    marginTop: 30,
    marginBottom: 60, // space above tab bar
  },
  feedbackHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

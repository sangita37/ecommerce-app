import React, { useContext } from 'react';
import {
  View, Text, Image, Button,
  StyleSheet, ScrollView, Alert, TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Optional: or use Text if you don’t use vector icons

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Item added to cart!');
  };

  const handleBuyNow = () => {
    Alert.alert('Thank you!', `Your purchase of "${product.title}" for ₹${product.price} was successful.`);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Add to Cart" color="#4b7bec" onPress={handleAddToCart} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Buy Now" color="#20bf6b" onPress={handleBuyNow} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9fafe',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
  },
  container: {
    padding: 20,
    paddingTop: 80, // space for back button
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

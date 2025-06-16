import React, { useContext } from 'react';
import {
  View, Text, FlatList, Button,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Your Cart 🛒</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
              <Button title="Remove" color="#eb3b5a" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
      </View>
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
    flex: 1,
    padding: 20,
    paddingTop: 80, // space for back button
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
});

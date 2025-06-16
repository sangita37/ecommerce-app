import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Profile 👤</Text>
        <Text style={styles.paragraph}>You are logged in. Tap below to logout.</Text>
        <View style={{ marginTop: 20 }}>
          <Button title="Logout" color="#eb3b5a" onPress={logout} />
        </View>
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
    padding: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
  },
});

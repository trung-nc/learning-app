// src/screens/AuthScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/api';

const AuthScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await login(username, password);
      await AsyncStorage.setItem('userToken', response.access_token);
      navigation.navigate('Home');
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypassLogin = async () => {
    // Set a dummy token for testing
    await AsyncStorage.setItem('userToken', 'dummy_token_for_testing');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Title>Login</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
      >
        Login
      </Button>
      <Button 
        mode="outlined" 
        onPress={handleBypassLogin} 
        style={styles.bypassButton}
      >
        Bypass Login (For Testing)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  bypassButton: {
    marginTop: 8,
  },
});

export default AuthScreen;
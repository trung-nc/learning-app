// src/screens/UserScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, List, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedAvatarUrl = await AsyncStorage.getItem('avatarUrl');
      setUsername(storedUsername || 'Test User');
      setEmail(storedEmail || 'test@example.com');
      setAvatarUrl(storedAvatarUrl || 'https://via.placeholder.com/150');
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={100} source={{ uri: avatarUrl }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Notification Settings"
          left={props => <List.Icon {...props} icon="bell-outline" />}
          onPress={() => {/* Handle navigation to notification settings */}}
        />
        <List.Item
          title="Language Preferences"
          left={props => <List.Icon {...props} icon="translate" />}
          onPress={() => {/* Handle navigation to language preferences */}}
        />
        <List.Item
          title="Account Security"
          left={props => <List.Icon {...props} icon="shield-account-outline" />}
          onPress={() => {/* Handle navigation to account security settings */}}
        />
      </List.Section>

      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default UserScreen;
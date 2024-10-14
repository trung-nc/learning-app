// src/screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title>Welcome to Pronunciation Learning</Title>
      <Paragraph>Start improving your English pronunciation today!</Paragraph>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Lessons')} 
        style={styles.button}
      >
        Explore Lessons
      </Button>
      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Practice')} 
        style={styles.button}
      >
        Start Practicing
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
});

export default HomeScreen;
// src/screens/PhonemeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Title } from 'react-native-paper';
import { getPhonemes } from '../services/api';

const PhonemeScreen = ({ navigation }) => {
  const [phonemes, setPhonemes] = useState([]);

  useEffect(() => {
    fetchPhonemes();
  }, []);

  const fetchPhonemes = async () => {
    try {
      const fetchedPhonemes = await getPhonemes();
      setPhonemes(fetchedPhonemes);
    } catch (error) {
      console.error(error);
      // Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={phonemes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.symbol}
            description={item.example}
            onPress={() => navigation.navigate('Practice', { phonemeId: item.id })}
            left={props => <List.Icon {...props} icon="alphabetical" />}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
});

export default PhonemeScreen;
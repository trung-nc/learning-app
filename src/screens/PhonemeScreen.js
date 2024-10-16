import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Title, ActivityIndicator } from 'react-native-paper';
import { getPhonemes } from '../services/api';

const PhonemeScreen = ({ navigation }) => {
  const [phonemes, setPhonemes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handlePhonemePress = (phonemeId) => {
    navigation.navigate('Pronunciation', { lessonId: phonemeId });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Phonemes</Title>
      <FlatList
        data={phonemes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePhonemePress(item.id)}>
            <List.Item
              title={item.symbol}
              description={item.example}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </TouchableOpacity>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhonemeScreen;
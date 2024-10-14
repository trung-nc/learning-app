// src/screens/TopicScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Title } from 'react-native-paper';
import { getTopics } from '../services/api';

const TopicScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const fetchedTopics = await getTopics();
      setTopics(fetchedTopics);
    } catch (error) {
      console.error(error);
      // Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.description}
            onPress={() => navigation.navigate('Practice', { topicId: item.id })}
            left={props => <List.Icon {...props} icon="book-open-variant" />}
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

export default TopicScreen;
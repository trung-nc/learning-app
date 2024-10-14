// src/screens/LessonScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Title, ActivityIndicator } from 'react-native-paper';
import { getLessons } from '../services/api';

const LessonScreen = ({ navigation }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const fetchedLessons = await getLessons();
      setLessons(fetchedLessons);
    } catch (error) {
      console.error(error);
      // Show error message to user
    } finally {
      setLoading(false);
    }
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
      <Title style={styles.title}>Available Lessons</Title>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={`Difficulty: ${item.difficulty}`}
            onPress={() => navigation.navigate('Practice', { lessonId: item.id })}
            right={props => <List.Icon {...props} icon="chevron-right" />}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LessonScreen;

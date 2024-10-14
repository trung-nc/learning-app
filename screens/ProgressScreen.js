// src/screens/ProgressScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, DataTable, ActivityIndicator } from 'react-native-paper';
import { getProgress } from '../services/api';

const ProgressScreen = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const fetchedProgress = await getProgress();
      setProgress(fetchedProgress);
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
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Your Progress</Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Lesson</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
          <DataTable.Title>Completed At</DataTable.Title>
        </DataTable.Header>

        {progress.map((item) => (
          <DataTable.Row key={item.lesson_id}>
            <DataTable.Cell>Lesson {item.lesson_id}</DataTable.Cell>
            <DataTable.Cell numeric>{(item.score * 100).toFixed(0)}%</DataTable.Cell>
            <DataTable.Cell>{new Date(item.completed_at).toLocaleDateString()}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
});

export default ProgressScreen;
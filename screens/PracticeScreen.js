// src/screens/PracticeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { getLesson, assessPronunciation } from '../services/api';

const PracticeScreen = ({ route }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [practicing, setPracticing] = useState(false);
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    if (route.params?.lessonId) {
      fetchLesson(route.params.lessonId);
    } else {
      setLoading(false);
    }
  }, [route.params?.lessonId]);

  const fetchLesson = async (lessonId) => {
    try {
      const fetchedLesson = await getLesson(lessonId);
      setLesson(fetchedLesson);
    } catch (error) {
      console.error(error);
      // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  const handleStartPractice = async () => {
    setPracticing(true);
    try {
      // In a real app, you'd record audio here
      const dummyAudioUri = 'dummy_audio.mp3';
      const result = await assessPronunciation(dummyAudioUri, lesson.id);
      setAssessment(result);
    } catch (error) {
      console.error(error);
      // Show error message to user
    } finally {
      setPracticing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Title>No Lesson Selected</Title>
        <Paragraph>Please choose a lesson from the Lessons tab.</Paragraph>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Title>{lesson.title}</Title>
      <Paragraph>{lesson.content}</Paragraph>
      <Button
        mode="contained"
        onPress={handleStartPractice}
        style={styles.button}
        loading={practicing}
        disabled={practicing}
      >
        Start Practice
      </Button>
      {assessment && (
        <View style={styles.assessment}>
          <Title>Assessment Results</Title>
          <Paragraph>Overall Score: {assessment.overall_score}</Paragraph>
          <Paragraph>Accuracy: {assessment.detailed_feedback.accuracy}</Paragraph>
          <Paragraph>Fluency: {assessment.detailed_feedback.fluency}</Paragraph>
          <Paragraph>Areas for Improvement: {assessment.detailed_feedback.areas_for_improvement.join(', ')}</Paragraph>
        </View>
      )}
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
  button: {
    marginTop: 20,
  },
  assessment: {
    marginTop: 20,
  },
});

export default PracticeScreen;
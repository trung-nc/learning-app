// src/services/api.js
import { mockLessons, mockProgress } from './mockData';

export const login = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Accept any non-empty username and password
  if (username && password) {
    return { access_token: 'mock_token_123' };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const getLessons = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLessons;
};

export const getLesson = async (lessonId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (lesson) return lesson;
  throw new Error('Lesson not found');
};

export const assessPronunciation = async (audioUri, lessonId) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    overall_score: Math.random().toFixed(2),
    detailed_feedback: {
      accuracy: (Math.random() * 0.5 + 0.5).toFixed(2),
      fluency: (Math.random() * 0.5 + 0.5).toFixed(2),
      areas_for_improvement: ['th sound', 'word stress']
    }
  };
};

export const getProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProgress;
};

// Update src/services/api.js to include new methods
export const getPhonemes = async () => {
  // Implement API call to fetch phonemes
  // For now, return mock data
  return [
    { id: 1, symbol: 'æ', example: 'cat' },
    { id: 2, symbol: 'ð', example: 'this' },
    { id: 3, symbol: 'ʃ', example: 'ship' },
    // Add more phonemes...
  ];
};

export const getTopics = async () => {
  // Implement API call to fetch topics
  // For now, return mock data
  return [
    { id: 1, name: 'Greetings', description: 'Learn common greetings' },
    { id: 2, name: 'Food and Dining', description: 'Vocabulary for restaurants and cooking' },
    { id: 3, name: 'Travel', description: 'Essential phrases for travelers' },
    // Add more topics...
  ];
};
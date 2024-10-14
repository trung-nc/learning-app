// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import PhonemeScreen from '../screens/PhonemeScreen';
import TopicScreen from '../screens/TopicScreen';
import PracticeScreen from '../screens/PracticeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator();
const LessonStack = createStackNavigator();

const LessonStackScreen = () => (
  <LessonStack.Navigator>
    <LessonStack.Screen name="Phonemes" component={PhonemeScreen} />
    <LessonStack.Screen name="Topics" component={TopicScreen} />
    <LessonStack.Screen name="Practice" component={PracticeScreen} />
  </LessonStack.Navigator>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Lessons') {
            iconName = 'book-open-variant';
          } else if (route.name === 'Progress') {
            iconName = 'chart-line';
          } else if (route.name === 'User') {
            iconName = 'account';
          } else if (route.name === 'Phonemes') {
            iconName = 'alphabetical-variant';
          } else if (route.name === 'Topics') {
            iconName = 'bookshelf';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Phonemes" component={PhonemeScreen} />
      <Tab.Screen name="Topics" component={TopicScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import PhonemeScreen from '../screens/PhonemeScreen';
import TopicScreen from '../screens/TopicScreen';
import PronunciationScreen from '../screens/PronunciationScreen';
import ProgressScreen from '../screens/ProgressScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator();
const PhonemeStack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Phonemes') {
            iconName = 'alphabetical-variant';
          } else if (route.name === 'Topics') {
            iconName = 'bookshelf';
          } else if (route.name === 'Progress') {
            iconName = 'chart-line';
          } else if (route.name === 'User') {
            iconName = 'account';
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
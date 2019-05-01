import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/HistoryScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import SettingsScreen from '../screens/AddScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Delivery: DeliveryScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Livraisons',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='local-shipping' />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Historique',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='history'/>
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Ajouter',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='add-circle-outline'/>
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

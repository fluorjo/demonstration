import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {XMLParser} from 'fast-xml-parser';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DemoIcon from './src/icons/DemoIcon.svg';
import RestroomIcon from './src/icons/RestroomIcon.svg';
import DemoInfoPage from './src/page/DemoInfoPage';
import RestRoomPage from './src/page/RestRoomPage';

const Tab = createBottomTabNavigator();
function HomeScreen() {
  return <Text>Home</Text>;
}

function RestRoom() {
  return <RestRoomPage />;
}
function Demo() {
  return <DemoInfoPage />;
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="RestRoom">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '홈',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="RestRoom"
            component={RestRoom}
            options={{
              title: '화장실 정보',
              tabBarIcon: ({color, size}) => (
                <RestroomIcon width={40} height={40} />
              ),
            }}
          />
          <Tab.Screen
            name="Demo"
            component={Demo}
            options={{
              title: '집회 정보',
              tabBarIcon: ({color, size}) => (
                <DemoIcon width={40} height={40} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

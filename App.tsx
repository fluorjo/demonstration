import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import DemoIcon from "./src/icons/DemoIcon";
import RestroomIcon from "./src/icons/RestroomIcon";
import DemoInfoPage from "./src/page/DemoInfoPage";
import RestRoomPage from "./src/page/RestRoomPage";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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
              tabBarIcon: () => (
                  <Ionicons
                      name="home"
                      size={35}
                  />
              ),
          }}
          />
          <Tab.Screen
            name="RestRoom"
            component={RestRoom}
            options={{
              title: "화장실 정보",
              tabBarIcon: ({ color, size }) => <RestroomIcon />,
            }}
          />
          <Tab.Screen
            name="Demo"
            component={Demo}
            options={{
              title: "집회 정보",
              tabBarIcon: ({ color, size }) => <DemoIcon />,
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
    backgroundColor: "#fff",
  },
});

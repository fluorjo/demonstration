import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import DemoIcon from "./src/icons/DemoIcon";
import RestroomIcon from "./src/icons/RestroomIcon";
import DemoInfoPage from "./src/page/DemoInfoPage";
import RestRoomPage from "./src/page/RestRoomPage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [city, setCity] = useState<string>();
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    if (location[0].city) {
      setCity(location[0].city);
    } else {
      setCity("no city");
    }
  };

  useEffect(() => {
    ask();
  }, []);
  function HomeScreen() {
    return <Text>{city}</Text>;
  }

  function RestRoom() {
    return <RestRoomPage />;
  }
  function Demo() {
    return <DemoInfoPage />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="RestRoom">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={35} />,
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

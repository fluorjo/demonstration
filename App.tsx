import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DemoIcon from "./src/icons/DemoIcon";
import RestroomIcon from "./src/icons/RestroomIcon";
import PoliceDemoInfoPage from "./src/page/PoliceDemoInfoPage";
import RestRoomPage from "./src/page/RestRoomPage";
import LoadingComponent from "./src/components/Loading";
import CandlePage from "./src/page/CandlePage";
import Flame from "./src/page/Flame";
import SVG from "./src/page/Svg";
import SkiaSVG from "./src/page/Skia";

const Tab = createBottomTabNavigator();

export default function App() {
  const [city, setCity] = useState<string>();
  const [currentLatitude, setLatitude] = useState<number>();
  const [currentLongitude, setLongitude] = useState<number>();
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
      setLatitude(latitude);
      setLongitude(longitude);
    } else {
      setCity("no city");
    }
  };

  useEffect(() => {
    if (!currentLatitude && !currentLongitude) {
      ask();
    }
  }, []);

  function HomeScreen() {
    return (
      <View>
        <Text>{currentLatitude}</Text>
        <Text>{currentLongitude}</Text>
      </View>
    );
  }

  function RestRoom() {
    return <RestRoomPage />;
  }
  function Demo() {
    return <PoliceDemoInfoPage />;
    // return <LoadingComponent />;
  }
  function Candle() {
    // return <CandlePage />;
    // return <Flame />;
    // return <SVG />;
    return <SkiaSVG />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Candle">
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
          <Tab.Screen
            name="Candle"
            component={Candle}
            options={{
              title: "촛불",
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

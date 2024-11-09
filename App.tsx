import Entypo from "@expo/vector-icons/Entypo";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import CandleIcon from "./src/icons/CandleIcon";
import DemoIcon from "./src/icons/DemoIcon";
import RestroomIcon from "./src/icons/RestroomIcon";
import ETCPage from "./src/page/ETCPage";
import ETCStackNavigator from "./src/page/ETCStackNavigator";
import PoliceDemoInfoPage from "./src/page/PoliceDemoInfoPage";
import RestRoomPage from "./src/page/RestRoomPage";
import SkiaSVG from "./src/page/Skia";
const Tab = createBottomTabNavigator();
// 탭바 디자인 좀 하자.
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

  function ETC() {
    return <ETCPage />;
  }
  function RestRoom() {
    return <RestRoomPage />;
  }
  function Demo() {
    return <PoliceDemoInfoPage />;
  }
  function Candle() {
    return <SkiaSVG />;
  }
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCandleActive, setIsCandleActive] = useState(false);
  let timer: NodeJS.Timeout | null = null;

  const handleUserActivity = () => {
    if (isCandleActive) {
      setIsFullScreen(false);
      StatusBar.setHidden(false, "fade");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsFullScreen(true);
        StatusBar.setHidden(true, "slide");
      }, 5000);
    }
  };

  useEffect(() => {
    if (isCandleActive) {
      handleUserActivity();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCandleActive]);
  return (
    <TouchableWithoutFeedback onPress={handleUserActivity}>
      <SafeAreaView
        style={[styles.container, isFullScreen && styles.fullScreen]}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle:
                isFullScreen && route.name === "Candle"
                  ? { display: "none" }
                  : {},
              tabBarActiveTintColor: "#007AFF",
              tabBarInactiveTintColor : "#666666",
            })}
            initialRouteName="Candle"
          >
            <Tab.Screen
              name="RestRoom"
              component={RestRoom}
              options={{
                title: "화장실 정보",
                tabBarIcon: ({ color }) => <RestroomIcon color={color} />,
              }}
            />
            <Tab.Screen
              name="Demo"
              component={Demo}
              options={{
                title: "집회 정보",
                tabBarIcon: ({ color }) => <DemoIcon color={color} />,
              }}
            />
            <Tab.Screen
              name="Candle"
              component={SkiaSVG}
              listeners={{
                focus: () => setIsCandleActive(true),
                blur: () => setIsCandleActive(false),
              }}
              options={{
                title: "촛불",
                headerShown: !isFullScreen,
                tabBarIcon: ({ color }) => <CandleIcon color={color} />,
              }}
            />
            <Tab.Screen
              name="기타"
              component={ETCStackNavigator}
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Entypo
                    name="dots-three-horizontal"
                    size={30}
                    color={color}
                  />
                ),
              }}
            ></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullScreen: {
    marginTop: 0,
    marginBottom: 0,
  },
});

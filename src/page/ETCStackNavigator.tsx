import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ETCPage from "./ETCPage";
import AppInfoPage from "./AppInfoPage"; 

const Stack = createNativeStackNavigator();

const ETCStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ETCPage" 
      component={ETCPage} 
      options={{ title: "ETC" }}
    />
    <Stack.Screen 
      name="AppInfoPage" 
      component={AppInfoPage} 
      options={{ title: "앱 설명 보기" }}
    />
  </Stack.Navigator>
);

export default ETCStackNavigator;

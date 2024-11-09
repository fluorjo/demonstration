import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppInfoPage from "./AppInfoPage";
import ETCPage from "./ETCPage";


export type RootStackParamList = {
    ETCPage: undefined;
    AppInfoPage: undefined;
  };
  
  const Stack = createNativeStackNavigator<RootStackParamList>();

const ETCStackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="ETCPage"
        component={ETCPage}
        options={{ title: "기타" }}
      />
      <Stack.Screen
        name="AppInfoPage"
        component={AppInfoPage}
        options={{ title: "앱 설명 보기" }}
      />
    </Stack.Navigator>
);

export default ETCStackNavigator;

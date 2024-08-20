import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("위치 권한을 허용해주세요.");
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log(location);
};

export const getLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("위치 권한을 허용해주세요.");
    return;
  }
};

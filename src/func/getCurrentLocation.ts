import * as Location from "expo-location";
import { useState } from "react";
const [ok, setOk] = useState(true);
const [city, setCity] = useState<string>();

// export const getCurrentLocation = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") {
//     console.log("위치 권한을 허용해주세요.");
//     return;
//   }

//   let location = await Location.getCurrentPositionAsync({});
//   console.log(location);
// };

// export const getLocationPermission = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") {
//     console.log("위치 권한을 허용해주세요.");
//     return;
//   }
// };
export const getCurrentLocation = async () => {
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
  return location;
};

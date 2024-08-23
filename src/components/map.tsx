import { Platform, StyleSheet } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
const locations = [
  { place: "1", lat: 37.576187, lng: 126.976882 },
  { place: "2", lat: 37.578187, lng: 126.976882 },
  { place: "3", lat: 37.580187, lng: 126.976882 },

];
const Map = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.574187,
        longitude: 126.976882,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
    >
    {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title={location.place}
        />
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

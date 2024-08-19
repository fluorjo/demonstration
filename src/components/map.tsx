import { Platform, StyleSheet } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";

const Map = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.574187,
        longitude: 126.976882,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
    >
      <Marker
        coordinate={{ latitude: 37.574187, longitude: 126.976882 }}
        title="this is a marker"
        description="this is a marker example"
      />
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

import { Image, Platform, StyleSheet } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
interface CurrentLocation {
  lat: number;
  lng: number;
}

interface Location extends CurrentLocation {
  place: string;
  placeType: string;
}

interface MapProps {
  currentLocation?: CurrentLocation;
  locations?: Location[];
}

const Map = ({ currentLocation, locations }: MapProps) => {
  const initialLocation = currentLocation || {
    lat: 37.574187,
    lng: 126.976882,
  };
  const getMarkerImage = (placeType: string) => {
    switch (placeType) {
      case "A":
        return require("../../assets/icon.png");
      case "B":
        return require("../../assets/splash.png");
      case "민간개방화장실":
        return require("../../assets/favicon.png");
      default:
        return require("../../assets/YOUR_MARKER.png");
    }
  };
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: initialLocation.lat,
        longitude: initialLocation.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
    >
      {locations?.map((location, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title={location.place}
        >
          <Image
            source={getMarkerImage(location.placeType)}
            style={{ width: 30, height: 30 }}
          />
        </Marker>
      ))}
      <Marker
        coordinate={{
          latitude: 37.574187,
          longitude: 126.976882,
        }}
        title={"initial"}
      >
        <Image
          source={require("../../assets/YOUR_MARKER.png")}
          style={{ width: 30, height: 30 }}
        />
        {/* <Callout>
          <Image source={require("../../assets/YOUR_MARKER.png")} />
          <Text>aaa </Text>
        </Callout> */}
      </Marker>
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

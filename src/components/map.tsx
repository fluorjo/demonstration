import { useState } from "react";
import { Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
// import MapView from "react-native-map-clustering";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
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
  filteredLocations?: Location[];
}

const Map = ({ currentLocation, locations }: MapProps) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>();
  const initialLocation = currentLocation || {
    lat: 37.574187,
    lng: 126.976882,
  };
  const filterLocations = (region: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

    const minLat = latitude - latitudeDelta / 2;
    const maxLat = latitude + latitudeDelta / 2;
    const minLng = longitude - longitudeDelta / 2;
    const maxLng = longitude + longitudeDelta / 2;

    if (locations) {
      const filtered = locations.filter(
        (location) =>
          location.lat >= minLat &&
          location.lat <= maxLat &&
          location.lng >= minLng &&
          location.lng <= maxLng
      );
      setFilteredLocations(filtered);
    }
  };
  const getMarkerImage = (placeType: string) => {
    switch (placeType) {
      case "개":
      case "개방":
      case "민간개방화장실":
        return require("../../assets/Building.png");
      case "공공":
      case "공공기":
      case "공공기관":
      case "공공청사":
        return require("../../assets/Government.png");
      case "공중":
        return require("../../assets/PublicToilet.png");
      case "지하철":
      case "지하철역":
        return require("../../assets/Subway.png");
      default:
        return require("../../assets/YOUR_MARKER.png");
    }
  };
  const [mapWidth, setMapWidth] = useState("99%");

  const updateMapStyle = () => {
    setMapWidth("100%");
  };
  const [mapRef, setMapRef] = useState<MapView | null>(null);

  const moveToCurrentLocation = () => {
    console.log(mapRef)
    if (mapRef && currentLocation) {
      const currentLo = {
        latitude: 37.574187,
        longitude: 126.976882,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    
      mapRef.animateToRegion(currentLo, 100);
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
      onRegionChangeComplete={filterLocations}
      provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      showsMyLocationButton={true}
      showsUserLocation={true}
      onMapReady={() => {
        updateMapStyle();
      }}
      ref={(ref) => setMapRef(ref)}

    >
      {filteredLocations?.map((location, index) => (
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
      </Marker>
      <TouchableOpacity style={styles.floatingbtn} onPress={moveToCurrentLocation}>
</TouchableOpacity>
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
  },
  floatingbtn:{
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 5,
    right: 10,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 100,
 }
  
});

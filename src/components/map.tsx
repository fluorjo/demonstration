import { useCallback, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import FloatingActionBtn from "./FloatingActionButton";
import FloatingButton from "./FloatingButton";

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
  filteredType?: string[];
}

const Map = ({ currentLocation, locations }: MapProps) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>();
  const [filteredType, setFilteredType] = useState([
    "지하철",
    "공중",
    "공공청사",
    "민간개방화장실",
  ]);
  const toggleFilterType = (type: string) => {
    setFilteredType((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };
  const initialLocation = currentLocation || {
    lat: 37.574187,
    lng: 126.976882,
  };
  const filterLocations = useCallback(
    (region: Region) => {
      const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
      const minLat = latitude - latitudeDelta / 2;
      const maxLat = latitude + latitudeDelta / 2;
      const minLng = longitude - longitudeDelta / 2;
      const maxLng = longitude + longitudeDelta / 2;

      if (locations) {
        const arr = filteredType;

        const filtered = locations.filter(
          (location) =>
            location.lat >= minLat &&
            location.lat <= maxLat &&
            location.lng >= minLng &&
            location.lng <= maxLng &&
            filteredType.includes(location.placeType)
        );
        // var typedarr = [];
        // if (arr)
        //   for (let i = 0; i < arr.length; i++) {
        //     const filteredType = filtered.filter((locations) =>
        //       locations.placeType.includes(arr[i])
        //     );
        //     for (let e = 0; e < filteredType.length; e++) {
        //       const element = filteredType[e];
        //       typedarr.push(element);
        //     }
        //   }
        // setFilteredLocations(typedarr);
        setFilteredLocations(filtered);
      }
    },
    [locations, filteredType]
  );

  const getMarkerImage = (placeType: string) => {
    switch (placeType) {
      case "민간개방화장실":
        return require("../../assets/Building.png");
      case "공공청사":
        return require("../../assets/Government.png");
      case "공중":
        return require("../../assets/PublicToilet.png");
      case "지하철":
        return require("../../assets/Subway.png");
      default:
        return require("../../assets/YOUR_MARKER.png");
    }
  };

  const [mapRef, setMapRef] = useState<MapView | null>(null);

  const moveToCurrentLocation = () => {
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
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.lat,
          longitude: initialLocation.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={filterLocations}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        ref={(ref: any) => setMapRef(ref)}
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
      </MapView>
      <FloatingButton
        onPress={moveToCurrentLocation}
        IconName={"my-location"}
      />
      <FloatingActionBtn toggleFilter={toggleFilterType} />  
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

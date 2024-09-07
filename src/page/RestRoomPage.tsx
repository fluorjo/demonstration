import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import RestRoomDataJson from "../../assets/data/RestRoomData.json";
import Map from "../components/map";

interface RestRoom {
  place: string;
  placeType: string;
  lat: number;
  lng: number;
}

export default function RestRoomPage() {
  const [RestRoomData, setRestRoomData] = useState<RestRoom[]>([]);


  useEffect(() => {
    const getRestRoomData = async () => {
      try {
        setRestRoomData(RestRoomDataJson);
        // console.log("dd", RestRoomData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRestRoomData();
  }, []);

  const currentLocation = {
    lat: 37.574187,
    lng: 126.976882,
  };

  return (
    <SafeAreaView>
      {/* {RestRoomData ? (
        <Text>RestRoomData loaded: {JSON.stringify(RestRoomData)}</Text>
      ) : (
        <Text>null</Text>
      )} */}
      <Map
        currentLocation={currentLocation}
        locations={RestRoomData!}
      />
    </SafeAreaView>
  );
}

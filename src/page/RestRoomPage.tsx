import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import RestRoomDataJson from "../../assets/data/RestRoomData.json";
import Map from "../components/map";

export default function RestRoomPage() {
  const [RestRoomData, setRestRoomData] = useState();
  const [accInfoData, setAccInfoData] = useState([]);
  const parser = new XMLParser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        var jsonData = RestRoomDataJson;
        setRestRoomData(jsonData);
        console.log("dd", RestRoomData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <Map currentLocation={currentLocation} locations={RestRoomData!} />
    </SafeAreaView>
  );
}

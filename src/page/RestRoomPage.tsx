import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Map from "../components/map";

export default function RestRoomPage() {
  const [RestRoomData, setRestRoomData] = useState(null);
  const [accInfoData, setAccInfoData] = useState([]);
  const parser = new XMLParser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "http://openAPI.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/SearchPublicToiletPOIService/1/5/";
        const response = await axios.get(url);
        var jsonData = parser.parse(response.data);

        const extractedData = jsonData.SearchPublicToiletPOIService.row.map(
          (item) => {
            return {
              place: item.FNAME,
              // ANAME: item.ANAME,
              lng: item.X_WGS84,
              lat: item.Y_WGS84,
            };
          }
        );
        console.log(extractedData)
        setRestRoomData(extractedData);

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

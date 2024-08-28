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
        setRestRoomData(response);
        var jsonData = parser.parse(response.data);
        console.log(jsonData.SearchPublicToiletPOIService.row[0].FNAME);
        // console.log('Data fetched:', response.data);
        // const accInfoArray = jsonData.AccInfo.row ? jsonData.AccInfo.row : [];
        // setAccInfoData(accInfoArray);
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
  const locations = [
    { place: "1", lat: 37.576187, lng: 126.976882 },
    { place: "2", lat: 37.578187, lng: 126.976882 },
    { place: "3", lat: 37.580187, lng: 126.976882 },
  ];
  
  return (
    <SafeAreaView>
      {/* {RestRoomData ? (
        <Text>RestRoomData loaded: {JSON.stringify(RestRoomData)}</Text>
      ) : (
        <Text>null</Text>
      )} */}
       <Map currentLocation={currentLocation} locations={locations} />
    </SafeAreaView>
  );
}

import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

export default function RestRoomPage() {
  const [RestRoomData, setRestRoomData] = useState(null);
  const [accInfoData, setAccInfoData] = useState([]);
  const parser = new XMLParser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'http://openAPI.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/SearchPublicToiletPOIService/1/5/';
        const response = await axios.get(url);
        setRestRoomData(response);
        var jsonData = parser.parse(response.data);
        // console.log(jsonData.AccInfo.row[0].acc_info);
        // console.log('Data fetched:', response.data);
        // const accInfoArray = jsonData.AccInfo.row ? jsonData.AccInfo.row : [];
        // setAccInfoData(accInfoArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <SafeAreaView>
      {RestRoomData ? (
        <Text>RestRoomData loaded: {JSON.stringify(RestRoomData)}</Text>
      ) : (
        <Text>null</Text>
      )}
    </SafeAreaView>
  );
}

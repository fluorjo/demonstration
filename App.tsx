import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
export default function App() {
  const [data, setData] = useState(null);
  const [accInfoData, setAccInfoData] = useState([]);
  const parser = new XMLParser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/';
        const response = await axios.get(url);
        setData(response);
        var jsonData = parser.parse(response.data);
        console.log(jsonData.AccInfo.row[0].acc_info);
        // console.log('Data fetched:', response.data);
        const accInfoArray = jsonData.AccInfo.row ? jsonData.AccInfo.row : [];
        setAccInfoData(accInfoArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({item}) => (
    <View>
      <Text>{item.acc_info}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {accInfoData.length > 0 ? (
        <FlatList
          data={accInfoData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

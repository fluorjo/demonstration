import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default function App() {
  const [data, setData] = useState(null);
  const [accInfoData, setAccInfoData] = useState([]);
  const parser = new XMLParser();

  async function loadHTML() {
    const searchUrl =
      'https://www.smpa.go.kr/user/nd54882.do?View&uQ=&pageST=SUBJECT&pageSV=&imsi=imsi&page=1&pageSC=SORT_ORDER&pageSO=DESC&dmlType=&boardNo=00310495&returnUrl=https://www.smpa.go.kr:443/user/nd54882.do';
    const HTMLresponse = await fetch(searchUrl); // fetch page

    const htmlString = await HTMLresponse.text(); // get response text
    console.log('htmlString');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/';
        const response = await axios.get(url);
        setData(response);
        var jsonData = parser.parse(response.data);
        // console.log(jsonData.AccInfo.row[0].acc_info);
        // console.log('Data fetched:', response.data);
        const accInfoArray = jsonData.AccInfo.row ? jsonData.AccInfo.row : [];
        setAccInfoData(accInfoArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    loadHTML();
  }, []);
  const renderItem = ({item}) => (
    <View>
      <Text style={styles.demoName}>{item.acc_info}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {accInfoData.length > 0 ? (
        <FlatList
          data={accInfoData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
          numColumns={1}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
      <Image
        source={{
          uri: 'https://www.smpa.go.kr/common/attachfile/attachfileView.do?attachNo=00244699',
        }}
        style={styles.TodayDemoInfoImg}
      />
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
  flatList: {
    backgroundColor: 'blue',
  },
  demoName: {
    backgroundColor: 'green',
  },
  TodayDemoInfoImg: {
    width: 400,
    height: 600,
    marginRight: 8,
    backgroundColor: 'red',
  },
});

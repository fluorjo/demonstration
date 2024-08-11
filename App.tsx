import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'http://openapi.seoul.go.kr:8088/724c4f6f79666c753931556966736e/xml/AccInfo/1/5/';
        const response = await axios.get(url);
        setData(response.data);
        console.log('Data fetched:', response.data);

        // 데이터를 다 불러온 다음 실행할 코드
        console.log('데이터가 성공적으로 불러와졌습니다.');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data ? (
          <Text>Data loaded: {JSON.stringify(data)}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
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

import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import * as Linking from 'expo-linking';

export default function PaperInfoPage() {
  const [testhtml, settesthtml] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const date = "2024-09-25";
      const formattedDate = `${date.split("-")[1][1]}월${date.split("-")[2]}일`;
      console.log(formattedDate);
      const searchQuery = `[오늘의 주요일정]사회(${formattedDate}`;
      const encodedQuery = encodeURIComponent(searchQuery);
      const searchUrl = `https://m.search.daum.net/search?nil_profile=btn&w=news&DA=SBC&q=${encodedQuery}`;
      const HTMLresponse = await fetch(searchUrl);
      const daumUrl = "http://v.daum.net/v/";
      const htmlString = (await HTMLresponse.text())
        .split(daumUrl)[1]
        .split(`"`)[0];
      return `${daumUrl}${htmlString}`;
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };
  const link = async () => {
    const url = await fetchData()
    if(url)
    Linking.openURL(url)
}
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView>
      <TouchableOpacity onPress={link}>
        <Text>링크</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

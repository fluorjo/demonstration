import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function PaperInfoPage() {
  const [testhtml, settesthtml] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const date = "9월22일";
      const searchQuery = `[오늘의 주요일정]사회(${date}`;
      const encodedQuery = encodeURIComponent(searchQuery);
      const searchUrl = `https://m.search.daum.net/search?nil_profile=btn&w=news&DA=SBC&q=${encodedQuery}`;
      const HTMLresponse = await fetch(searchUrl);
      const daumUrl = "http://v.daum.net/v/";
      const htmlString = (await HTMLresponse.text())
        .split(daumUrl)[1]
        .split(`"`)[0];
      settesthtml(`${daumUrl}${htmlString}`);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView>
      <Text>{testhtml}</Text>
    </ScrollView>
  );
}

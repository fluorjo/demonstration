import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function PaperInfoPage() {
  const [testhtml, settesthtml] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const searchQuery =
        "https://news.nate.com/search?q=%5B%EC%98%A4%EB%8A%98%EC%9D%98+%EC%A3%BC%EC%9A%94%EC%9D%BC%EC%A0%95%5D%EC%82%AC%ED%9A%8C";

      const HTMLresponse = await fetch(searchQuery);
      const htmlString = await HTMLresponse.text();
      console.log(htmlString);
      settesthtml(htmlString);
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

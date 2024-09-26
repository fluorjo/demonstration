import * as Linking from "expo-linking";

export default async function getPaperInfo(targetDate: string) {
  try {
    const date = targetDate;
    const formattedDate = `${Number(date.split("-")[1])}월${
      date.split("-")[2]
    }일`;
    const searchQuery = `[오늘의 주요일정]사회(${formattedDate}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    const searchUrl = `https://m.search.daum.net/search?nil_profile=btn&w=news&DA=SBC&q=${encodedQuery}`;
    const HTMLresponse = await fetch(searchUrl);
    const daumUrl = "http://v.daum.net/v/";
    const htmlString = (await HTMLresponse.text())
      .split(daumUrl)[1]
      .split(`"`)[0];
    const paperUrl = `${daumUrl}${htmlString}`;
  
    return paperUrl;
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    return null;
  }
}

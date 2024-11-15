// 날짜에 해당되는 페이지 없거나 하면 경고 띄워서 없다고 할까. 아니면 검색 결과 페이지로 이동시키거나.

export default async function getPaperInfo(targetDate: string) {
  try {
    var date = targetDate;
    var formattedDate = `${Number(date.split("-")[1])}월${
      date.split("-")[2]
    }일`;
    if (formattedDate[3] === "0") {
      var formattedDate = formattedDate.substring(0, 3)+formattedDate.substring(4,6);
    }
    var searchQuery = `[오늘의 주요일정]사회(${formattedDate}`;
    var encodedQuery = encodeURIComponent(searchQuery);
    var searchUrl = `https://m.search.daum.net/search?nil_profile=btn&w=news&DA=SBC&q=${encodedQuery}`;
    // console.log(searchUrl);
    var HTMLresponse = await fetch(searchUrl);
    const daumUrl = "http://v.daum.net/v/";
    var htmlString = (await HTMLresponse.text())
      .split(daumUrl)[1]
      .split(`"`)[0];
    var paperUrl = `${daumUrl}${htmlString}`;
    return paperUrl;
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
    return null;
  }
}

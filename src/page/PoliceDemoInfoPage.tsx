import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
export default function PoliceDemoInfoPage() {
  const [IMG_URL, setIMG_URL] = useState("");

  async function searchByDate(html: string, date: string) {
    const splitByDate = html.split(date)[0].split(`');`);
    const BoardNumber = splitByDate[splitByDate.length - 2].substring(
      splitByDate[splitByDate.length - 2].length - 8
    );
    const BoardURL = `https://www.smpa.go.kr/user/nd54882.do?View&uQ=&pageST=SUBJECT&pageSV=&imsi=imsi&page=1&pageSC=SORT_ORDER&pageSO=DESC&dmlType=&boardNo=${BoardNumber}&returnUrl=https://www.smpa.go.kr:443/user/nd54882.do`;
    return BoardURL;
  }

  async function getImgURL(BoardURL: string) {
    const BoardURL_Response = await fetch(BoardURL);
    const BoardURL_Response_String = await BoardURL_Response.text();
    const splitByAttachNo = BoardURL_Response_String.split("attachNo=");
    const IMG_URL = `https://www.smpa.go.kr/common/attachfile/attachfileView.do?attachNo=${await splitByAttachNo[1].substring(
      0,
      8
    )}`;
    return IMG_URL;
  }

  const fetchPageData = async (pageNumber: string, date: string) => {
    const formData = new URLSearchParams();
    formData.append("uQ", "");
    formData.append("pageST", "SUBJECT");
    formData.append("pageSV", "");
    formData.append("imsi", "imsi");
    formData.append("page", pageNumber);
    formData.append("pageSC", "SORT_ORDER");
    formData.append("pageSO", "DESC");
    formData.append("dmlType", "SELECT");
    formData.append("boardNo", "");
    formData.append("satisMenuCode", "www");
    formData.append("satisMenuTitle", "오늘의 집회/시위");
    formData.append("satisMenuId", "nd54882");
    formData.append("returnUrl", "https://www.smpa.go.kr:443/user/nd54882.do");

    try {
      const response = await fetch("https://www.smpa.go.kr/user/nd54882.do", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const html = await response.text();
        const BoardURL = searchByDate(html, date);
        const IMG_URL = getImgURL(await BoardURL);
        setIMG_URL(await IMG_URL);
      } else {
        console.error("페이지 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };
  function getTodayDate() {
    let today = new Date();
    let year = today.getFullYear().toString().substring(2, 4);
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let date = today.getDate().toString().padStart(2, "0");
    let todayDate = `${year}${month}${date}`;
    return todayDate;
  }
  useEffect(() => {
    fetchPageData("1", getTodayDate());
  }, []);

  return (
    <ScrollView style={styles.container}>
      {IMG_URL ? (
        <Image
          source={{
            uri: IMG_URL,
          }}
          style={styles.TodayDemoInfoImg}
        />
      ) : (
        <Text>loading...</Text>
      )}
      <Text></Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatList: {
    backgroundColor: "blue",
  },
  demoName: {
    backgroundColor: "green",
  },
  TodayDemoInfoImg: {
    width: 400,
    height: 600,
    marginRight: 8,
  },
});

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
export default function PoliceDemoInfoPage() {
  const [data, setData] = useState("");
  const [attachedFileNo, setAttachedFileNo] = useState("");

  async function loadHTML() {
    const searchUrl = "https://www.smpa.go.kr/user/nd54882.do";
    const HTMLresponse = await fetch(searchUrl);
    const htmlString = await HTMLresponse.text();
    const splitByTodayDemo = htmlString.split("오늘의 집회 ");
    const Date = splitByTodayDemo[2].substring(0, 6);
    const boardNum = splitByTodayDemo[2].split(Date);
    // const boardNum = splitByTodayDemo[1].split("View")[2].substring(3, 11);
  }
  useEffect(() => {
    loadHTML();
  }, []);
  // async function searchByDate(html: string, date: number) {
  //   const HTMLresponse = await fetch(searchUrl);
  //   const htmlString = await HTMLresponse.text();
  //   const splitByAttachNo = htmlString.split("attachNo=");
  //   const attachNo = splitByAttachNo[1].substring(0, 8);
  //   setAttachedFileNo(attachNo);
  //   console.log("attachNo", attachNo);
  // }
  async function searchByDate(html: string, date: number) {
    const HTMLresponse = await fetch(searchUrl);
    const htmlString = await HTMLresponse.text();
    const splitByAttachNo = htmlString.split("attachNo=");
    const attachNo = splitByAttachNo[1].substring(0, 8);
    setAttachedFileNo(attachNo);
    console.log("attachNo", attachNo);
  }
  const fetchPageData = async (pageNumber: string) => {
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
        const splitByDate = html.split("240905")[0].split(`');`);
        const BoardNumber = splitByDate[splitByDate.length - 2].substring(
          splitByDate[splitByDate.length - 2].length - 8
        );
        const BoardURL = `https://www.smpa.go.kr/user/nd54882.do?View&uQ=&pageST=SUBJECT&pageSV=&imsi=imsi&page=1&pageSC=SORT_ORDER&pageSO=DESC&dmlType=&boardNo=${BoardNumber}&returnUrl=https://www.smpa.go.kr:443/user/nd54882.do`;
        const BoardURL_Response = await fetch(BoardURL);
        const BoardURL_Response_String = await BoardURL_Response.text();
        setData(BoardURL_Response_String)
      } else {
        console.error("페이지 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchPageData("1");
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Image
        source={{
          uri: `https://www.smpa.go.kr/common/attachfile/attachfileView.do?attachNo=${attachedFileNo}`,
        }}
        style={styles.TodayDemoInfoImg}
      /> */}
      <Text>{data}</Text>
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

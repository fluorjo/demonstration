import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import FloatingButton from "../components/FloatingButton";
export default function PoliceDemoInfoPage() {
  const [IMG_URL_Array, setIMG_URL_Array] = useState<String[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [zoomScrollView, setZoomScrollView] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  async function searchByDate(html: string, date: string) {
    const splitByDate = html.split(date);
    if (splitByDate.length !== 2) {
      setErrorMessage("해당되는 날짜의 집회 정보가 없습니다.");
      return null;
    }
    const splitBySymbol = splitByDate[0].split(`');`);
    const BoardNumber = splitBySymbol[splitBySymbol.length - 2].substring(
      splitBySymbol[splitBySymbol.length - 2].length - 8
    );
    const BoardURL = `https://www.smpa.go.kr/user/nd54882.do?View&uQ=&pageST=SUBJECT&pageSV=&imsi=imsi&page=1&pageSC=SORT_ORDER&pageSO=DESC&dmlType=&boardNo=${BoardNumber}&returnUrl=https://www.smpa.go.kr:443/user/nd54882.do`;
    return BoardURL;
  }

  async function getImgURL(BoardURL: string) {
    const BoardURL_Response = await fetch(BoardURL);
    const BoardURL_Response_String = await BoardURL_Response.text();
    const splitByAttachNo = BoardURL_Response_String.split("attachNo=");
    let IMG_URL_Array: string[] = [];
    for (let i = 1; i < splitByAttachNo.length; i++) {
      IMG_URL_Array.push(
        `https://www.smpa.go.kr/common/attachfile/attachfileView.do?attachNo=${await splitByAttachNo[
          i
        ].substring(0, 8)}`
      );
    }
    return IMG_URL_Array;
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
        const BoardURL = await searchByDate(html, date);
        if (BoardURL) {
          const IMG_URL_Array = await getImgURL(BoardURL);
          setIMG_URL_Array(IMG_URL_Array);
        }
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
  // useEffect(() => {
  //   fetchPageData("1", getTodayDate());
  // }, []);
  function zoom() {
    setZoomScrollView((prevZoom) => {
      if (prevZoom) {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
      }
      return !prevZoom;
    });
  }
  useEffect(() => {
    fetchPageData("1", "240910");
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        bouncesZoom={true}
        maximumZoomScale={3.0}
        zoomScale={zoomScrollView ? 2.5 : 1.0}
      >
        {errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : IMG_URL_Array ? (
          IMG_URL_Array.map((i) => (
            <Image
              key={i.toString()}
              source={{
                uri: i.toString(),
              }}
              style={styles.TodayDemoInfoImg}
            />
          ))
        ) : (
          <Text>loading...</Text>
        )}
      </ScrollView>
      <FloatingButton
        IconName={zoomScrollView ? "zoom-out" : "zoom-in"}
        onPress={zoom}
        ExtraStyle={styles.zoomButton}
      />
    </>
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
    width: "100%",
    // width: '180%',
    height: 600,
    marginRight: 8,
    objectFit: "fill",
  },
  zoomButton: {
    position: "absolute",
    bottom: 20,
  },
});

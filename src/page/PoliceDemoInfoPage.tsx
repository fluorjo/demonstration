import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarComponent from "../components/Calendar";
import FloatingButton from "../components/FloatingButton";
export default function PoliceDemoInfoPage() {
  const [IMG_URL_Array, setIMG_URL_Array] = useState<String[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const isButtonZoom = useRef<boolean>(false);
  const [test, setTest] = useState<string | null>(null);
  const [NewestDay, setNewestDay] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [targetDay, setTargetDay] = useState<string | undefined>(getTodayDate());

  async function searchByDate(html: string, date: string) {
    const splitByDate = html.split(date);
    if (splitByDate.length !== 2) {
      setErrorMessage("해당되는 날짜의 집회 정보가 없습니다.");
      // throw new Error("해당되는 날짜의 집회 정보가 없습니다.");
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

  async function changeDateFormat(targetDate: string) {
    switch (targetDate) {
      case "2024-08-01":
      case "2024-08-02":
      case "2024-08-03":
      case "2024-08-04":
      case "2024-08-05":
      case "2024-08-06":
      case "2024-08-07":
        let FormattedTagetDatePlus0 =
          targetDate.split("-")[0].substring(2, 4) +
          "0" +
          targetDate.split("-")[1] +
          targetDate.split("-")[2];
        return FormattedTagetDatePlus0;

      default:
        let FormattedTagetDate =
          targetDate.split("-")[0].substring(2, 4) +
          targetDate.split("-")[1] +
          targetDate.split("-")[2];
        return FormattedTagetDate;
    }
  }

  async function getDatePageNumber(NewestDay: string, targetDate: string) {
    let newestDay = new Date(NewestDay);
    let targetDay = new Date(targetDate);
    let diffTime = newestDay.getTime() - targetDay.getTime();
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    let targetPage = Math.floor(diffDays / 10);
    return targetPage;
  }

  const fetchPageData = async (targetDate: string) => {
    setErrorMessage(null);
    setIMG_URL_Array(null);
    setIsModalVisible(false);
    setTargetDay(targetDate)
    let date = changeDateFormat(targetDate);
    const formData = new URLSearchParams();
    let targetPage =
      NewestDay !== undefined ? getDatePageNumber(NewestDay, targetDate) : 0;
    // console.log("targetPage", targetPage);
    formData.append("page", (await targetPage) + 1 + "");
    formData.append("uQ", "");
    formData.append("pageST", "SUBJECT");
    formData.append("pageSV", "");
    formData.append("imsi", "imsi");
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
        const NewestDay = html.split("오늘의 집회")[3].substring(1, 7);
        const ChageNewestDayFormat =
          "20" +
          NewestDay.substring(0, 2) +
          "-" +
          NewestDay.substring(2, 4) +
          "-" +
          NewestDay.substring(4, 6);
        const BoardURL = await searchByDate(html, await date);
        // const BoardURL = await searchByDate(html, "240909");
        if (BoardURL) {
          let IMG_URL_Array = await getImgURL(BoardURL);
          setIMG_URL_Array(IMG_URL_Array);
        }
        return ChageNewestDayFormat;
      } else {
        console.error("페이지 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  function getTodayDate() {
    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let date = today.getDate().toString().padStart(2, "0");
    let todayDate = `${year}-${month}-${date}`;
    return todayDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      const todayDate = getTodayDate();
      await fetchPageData(todayDate);
      setNewestDay(await fetchPageData(todayDate));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTargetDay(targetDay)
  }, [targetDay]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isButtonZoom.current) {
      const zoom = event.nativeEvent.zoomScale || 1;
      setZoomScale(zoom);
    }
  };
  function zoom() {
    if (zoomScale !== 1) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
      setZoomScale(1);
    } else {
      setZoomScale(2.5);
    }

    isButtonZoom.current = true;
    setTimeout(() => {
      isButtonZoom.current = false;
    }, 300);
  }

  const setCalendarModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        bouncesZoom={true}
        maximumZoomScale={4.5}
        zoomScale={zoomScale}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* <CalendarComponent onPress={fetchPageData} /> */}
        {errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : IMG_URL_Array === null ? (
          <Text>loading...</Text>
        ) : (
          IMG_URL_Array.map((i) => (
            <Image
              key={i.toString()}
              source={{
                uri: i.toString(),
              }}
              style={styles.TodayDemoInfoImg}
            />
          ))
        )}
        <View style={{ marginTop: 400 }}>
          <Modal
            animationType="none"
            visible={isModalVisible}
            transparent={true}
          >
            <View style={styles.modalView}>
              <CalendarComponent onPress={fetchPageData} interSelectedDate={targetDay} />
              <TouchableOpacity
                onPress={onPressModalClose}
                style={styles.modalClose}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <FloatingButton
        IconName={zoomScale === 1 ? "zoom-in" : "zoom-out"}
        onPress={zoom}
        ExtraStyle={styles.zoomButton}
      />
      <FloatingButton
        IconName={"calendar-month"}
        onPress={setCalendarModal}
        ExtraStyle={styles.calendarButton}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  TodayDemoInfoImg: {
    width: "100%",
    height: 600,
    marginRight: 8,
    objectFit: "fill",
  },
  zoomButton: {
    position: "absolute",
    bottom: 20,
  },
  calendarButton: {
    position: "absolute",
    top: 20,
  },
  testtest: {
    backgroundColor: "red",
    zIndex: 2,
    top: 40,
    width: 50,
    height: 50,
  },
  modalView: {
    marginTop: 230,
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalClose: {
    position: "absolute",
    top: 30,
    right: 30,
  },
});

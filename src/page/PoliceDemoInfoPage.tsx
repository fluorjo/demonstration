import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
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
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CalendarComponent from "../components/Calendar";
import FloatingButton from "../components/FloatingButton";
import getPaperInfo from "./PaperInfo";

export default function PoliceDemoInfoPage() {
  const [IMG_URL_Array, setIMG_URL_Array] = useState<String[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const isButtonZoom = useRef<boolean>(false);
  const [NewestDay, setNewestDay] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isArrowVisible, setIsArrowVisible] = useState<boolean>(false);
  const [targetDay, setTargetDay] = useState<string | undefined>(
    getTodayDate()
  );
  const [imgIndex, setImgIndex] = useState(0);
  const [paperLink, setpaperLink] = useState<string | null>(null);

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
  // 가끔이랄지 뭔가 갱신할 때 삑사리가 잘 나는데 원인 파악하기.
  const fetchPageData = async (targetDate: string) => {
    setErrorMessage(null);
    setIMG_URL_Array(null);
    setIsModalVisible(false);
    setTargetDay(targetDate);
    setpaperLink(await getPaperInfo(targetDate));
    let date = changeDateFormat(targetDate);
    const formData = new URLSearchParams();
    let targetPage =
      NewestDay !== undefined ? getDatePageNumber(NewestDay, targetDate) : 0;

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
      // await fetchPageData("2024-09-07");
      // setNewestDay(await fetchPageData("2024-09-07"));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTargetDay(targetDay);
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

  function changeTargetDay(direction: string) {
    if (targetDay) {
      let newTargetDay =
        direction === "left"
          ? new Date(new Date(targetDay).getTime() + 1000 * 60 * 60 * 24)
          : new Date(new Date(targetDay).getTime() - 1000 * 60 * 60 * 24);
      const formattedNewTargetDay = newTargetDay.toISOString().split("T")[0];
      fetchPageData(formattedNewTargetDay);
    }
  }

  const { width, height } = Dimensions.get("screen");

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));
  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      if (zoomScale === 1) {
        const maxTranslateX = width / 2 - 50;
        const maxTranslateY = height / 2 - 50;

        translationX.value = clamp(
          prevTranslationX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX
        );
      }
    })
    .onTouchesDown(() => {
      setIsArrowVisible(true);
    })
    .onEnd(() => {
      if (zoomScale === 1) {
        if (translationX.value > 50) {
          translationX.value = withTiming(0);
          changeTargetDay("right");
        } else if (translationX.value < -50) {
          translationX.value = withTiming(-width);
          translationX.value = withTiming(0);
          changeTargetDay("left");
        } else {
          translationX.value = withTiming(0);
        }
      }
    })
    .onFinalize(() => {
      setIsArrowVisible(false);
    })
    .minDistance(20)
    .runOnJS(true);

  function changePage(direction: string) {
    if (IMG_URL_Array && IMG_URL_Array.length > 1)
      direction === "down"
        ? setImgIndex((prevIndex) =>
            Math.min(prevIndex + 1, IMG_URL_Array.length - 1)
          )
        : setImgIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }

  function renderArrows() {
    if (!IMG_URL_Array || IMG_URL_Array.length <= 1) {
      return null;
    } else if (
      IMG_URL_Array &&
      IMG_URL_Array.length > 1 &&
      IMG_URL_Array.indexOf(IMG_URL_Array[imgIndex]) === 0
    ) {
      return (
        <TouchableOpacity
          style={extra_styles.downArrowContainer}
          onPress={() => changePage("down")}
          activeOpacity={1}
        >
          <Text style={styles.pageButtonText}>다음 페이지</Text>
        </TouchableOpacity>
      );
    } else if (
      IMG_URL_Array &&
      IMG_URL_Array.length > 1 &&
      IMG_URL_Array.indexOf(IMG_URL_Array[imgIndex]) ===
        IMG_URL_Array.length - 1
    ) {
      return (
        <TouchableOpacity
          style={extra_styles.upArrowContainer}
          onPress={() => changePage("up")}
          activeOpacity={1}
        >
          <Text style={styles.pageButtonText}>이전 페이지</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            style={extra_styles.upArrowContainer}
            onPress={() => changePage("up")}
            activeOpacity={1}
          >
            <Text style={styles.pageButtonText}>이전 페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={extra_styles.downArrowContainer}
            onPress={() => changePage("down")}
            activeOpacity={1}
          >
            <Text style={styles.pageButtonText}>다음 페이지</Text>
          </TouchableOpacity>
        </>
      );
    }
  }
  const openLink = async () => {
    if (paperLink) {
      Linking.openURL(paperLink);
    } else {
      null;
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          {/* <GestureDetector gesture={pan}>
            <Animated.View style={[animatedStyles]}>
              <Image
                source={require("../../assets/image.png")}
                style={styles.TodayDemoInfoImg}
              />
            </Animated.View>
          </GestureDetector> */}
          {errorMessage ? (
            <Text>{errorMessage}</Text>
          ) : IMG_URL_Array === null ? (
            // 로딩 화면 나중에 좀 제대로 만들어서 정보 없을 경우에도 스와이프 가능하게 해야 함.
            <Text>loading...</Text>
          ) : (
            <GestureDetector gesture={pan}>
              <Animated.View style={[animatedStyles, styles.ImgContainer]}>
                <Image
                  source={{ uri: IMG_URL_Array[imgIndex].toString() }}
                  style={styles.TodayDemoInfoImg}
                />
                {isArrowVisible ? (
                  <>
                    <MaterialIcons
                      name={"chevron-left"}
                      color="black"
                      style={extra_styles.arrow_left}
                    />
                    <MaterialIcons
                      name={"chevron-right"}
                      color="black"
                      style={extra_styles.arrow_right}
                    />
                  </>
                ) : null}
              </Animated.View>
            </GestureDetector>
          )}
          {/* <GestureDetector gesture={composed}>
            <Animated.View style={[styles.box, animatedStyles]}></Animated.View>
          </GestureDetector> */}
          <View style={{ marginTop: 0 }}>
            <Modal
              animationType="none"
              visible={isModalVisible}
              transparent={true}
            >
              <View style={styles.modalView}>
                <CalendarComponent
                  onPress={fetchPageData}
                  interSelectedDate={targetDay}
                />
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
        <FloatingButton
          IconName={"link"}
          onPress={openLink}
          ExtraStyle={styles.linkButton}
        />
        <>{renderArrows()}</>
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TodayDemoInfoImg: {
    width: "100%",
    height: 600,
    marginRight: 8,
    objectFit: "fill",
  },
  ImgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  zoomButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 10,
    left: 20,
  },
  calendarButton: {
    position: "absolute",
    top: 20,
    zIndex: 10,
  },
  linkButton: {
    position: "absolute",
    bottom: 20,
    zIndex: 10,
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
  box: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#b58df1",
  },
  arrow: {
    fontSize: 32,
    position: "absolute",
    opacity: 0.4,
  },
  ArrowContainer: {
    backgroundColor: "#35353546",
    position: "absolute",
    height: 25,
    zIndex: 1,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -10 }],
    borderRadius: 15,
  },
  pageButtonText: {
    color: "white",
  },
});
const extra_styles = StyleSheet.create({
  arrow_left: {
    ...styles.arrow,
    left: 15,
  },
  arrow_right: {
    ...styles.arrow,
    right: 15,
  },
  upArrowContainer: {
    top: 25,
    ...styles.ArrowContainer,
  },
  downArrowContainer: {
    bottom: 0,
    ...styles.ArrowContainer,
  },
});

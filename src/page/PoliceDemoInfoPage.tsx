import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import * as Linking from "expo-linking";
import React, { createRef, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
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
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CalendarComponent from "../components/Calendar";
import FloatingActionBtnContainer from "../components/FABtnContainer";
import LoadingComponent from "../components/Loading";
import getPaperInfo from "./PaperInfo";

export default function PoliceDemoInfoPage() {
  const [IMG_URL_Array, setIMG_URL_Array] = useState<String[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
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
      const fetchedNewestDay = await fetchPageData(todayDate);
      setNewestDay(fetchedNewestDay);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTargetDay(targetDay);
  }, [targetDay]);

  // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   if (!isButtonZoom.current) {
  //     const zoom = event.nativeEvent.zoomScale || 1;
  //     setZoomScale(zoom);
  //   }
  // };
  function zoom() {
    if (zoomScale !== 1) {
      zoomableViewRef.current!.zoomTo(1);
      setZoomScale(1);
    } else {
      zoomableViewRef.current!.zoomTo(3.5);
      setZoomScale(3.5);
    }
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
      console.log(translationX.value);

      // if (zoomScale === 1) {
      //   if (translationX.value > 50) {
      //     translationX.value = withTiming(0);
      //     changeTargetDay("right");
      //   } else if (translationX.value < -50) {
      //     translationX.value = withTiming(-width);
      //     translationX.value = withTiming(0);
      //     changeTargetDay("left");
      //   } else {
      //     translationX.value = withTiming(0);
      //   }
      // }
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
  //2개 있는 날 - 0928
  function changePageText() {
    if (!IMG_URL_Array || IMG_URL_Array.length <= 1) {
      return null;
    } else if (
      IMG_URL_Array &&
      IMG_URL_Array.length > 1 &&
      IMG_URL_Array.indexOf(IMG_URL_Array[imgIndex]) === 0
    ) {
      return (
        <TouchableOpacity
          style={styles.ArrowContainer}
          onPress={() => changePage("down")}
          activeOpacity={1}
        >
          <Text style={styles.pageButtonText}>뒷장이 있습니다</Text>
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
          style={styles.ArrowContainer}
          onPress={() => changePage("up")}
          activeOpacity={1}
        >
          <Text style={styles.pageButtonText}>앞장이 있습니다</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            style={styles.ArrowContainer}
            onPress={() => changePage("up")}
            activeOpacity={1}
          >
            <Text style={styles.pageButtonText}>이전 페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ArrowContainer}
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
      // 해당되는 페이지 없거나 에러나는 등의 경우 알람 띄우는 게 좋으려나.
      null;
    }
  };
  const zoomableViewRef = createRef<ReactNativeZoomableView>();
  const setNewZoomLevel = (event, gestureState, zoomableViewEventObject) => {
    setZoomScale(zoomableViewEventObject.zoomLevel);
    // console.log(zoomScale);
  };

  const zoomIconName = zoomScale === 1 ? "zoom-in" : "zoom-out";
  const isExpanded = useSharedValue(false);
  let pageCondition = 0;

  if (!IMG_URL_Array || IMG_URL_Array.length <= 1) {
    pageCondition = 0;
  } else if (
    IMG_URL_Array &&
    IMG_URL_Array.length > 1 &&
    IMG_URL_Array.indexOf(IMG_URL_Array[imgIndex]) === 0
  ) {
    pageCondition = 1;
  } else if (
    IMG_URL_Array &&
    IMG_URL_Array.length > 1 &&
    IMG_URL_Array.indexOf(IMG_URL_Array[imgIndex]) === IMG_URL_Array.length - 1
  ) {
    pageCondition = 2;
  }

  const buttons = [
    {
      isExpanded: isExpanded,
      index: 0,
      IconName: "calendar-month",
      onPress: setCalendarModal,
      // ExtraStyle: styles.calendarButton,
    },
    {
      isExpanded: isExpanded,
      index: 1,
      IconName: "link",
      onPress: openLink,
      // ExtraStyle: styles.linkButton,
    },

    {
      isExpanded: isExpanded,
      index: 2,
      IconName: "skip-previous",
      onPress: () => changeTargetDay("left"),
      // ExtraStyle: styles.calendarButton,
    },

    {
      isExpanded: isExpanded,
      index: 3,
      IconName: "skip-next",
      onPress: () => changeTargetDay("right"),
      // ExtraStyle: styles.calendarButton,
    },
    {
      isExpanded: isExpanded,
      index: 4,
      IconName: zoomIconName,
      onPress: zoom,
      // ExtraStyle: styles.zoomButton,
    },

    {
      isExpanded: isExpanded,
      index: 5,
      IconName:
        pageCondition === 2
          ? "keyboard-double-arrow-up"
          : "keyboard-double-arrow-down",
      onPress:
        pageCondition === 1
          ? () => changePage("down")
          : pageCondition === 2
          ? () => changePage("up")
          : null,
      disabled:
        pageCondition === 0 ? true : pageCondition === 1 || 2 ? false : true,
    },
  ];
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <>
        <ReactNativeZoomableView
          maxZoom={3.5}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={zoomScale}
          bindToBorders={true}
          onZoomAfter={setNewZoomLevel}
          style={styles.container}
          ref={zoomableViewRef}
          disablePanOnInitialZoom={false}
        >
          <GestureDetector gesture={pan}>
            {errorMessage ? (
              <View style={styles.loadingOrErrorContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            ) : IMG_URL_Array === null ? (
              <View style={styles.loadingOrErrorContainer}>
                <LoadingComponent />
              </View>
            ) : (
              <>
                <Image
                  source={{ uri: IMG_URL_Array[imgIndex].toString() }}
                  style={styles.TodayDemoInfoImg}
                />
                {/* <Image
                  source={require("../../assets/image.png")}
                  style={styles.TodayDemoInfoImg}
                /> */}
              </>
            )}
          </GestureDetector>
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
                  <Ionicons name="close-circle" size={36} color="black" />
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ReactNativeZoomableView>
        <>{changePageText()}</>
      </>
      <FloatingActionBtnContainer buttons={buttons} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    // alignItems:'center',
  },
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
    top: 20,
    right: 20,
  },

  box: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  arrow: {
    fontSize: 32,
    position: "absolute",
    opacity: 0.4,
  },
  ArrowContainer: {
    backgroundColor: "#2a2a2a",
    position: "absolute",
    height: 30,
    zIndex: 1,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    left: "80%",
    transform: [{ translateX: -50 }, { translateY: -10 }],
    borderRadius: 15,
    top: 15,
  },
  pageButtonText: {
    color: "white",
  },
  loadingOrErrorContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 500,
  },
  errorMessage: {
    fontSize: 24,
  },
  changePageButton: {
    backgroundColor: "#b6b6b6",
  },
});

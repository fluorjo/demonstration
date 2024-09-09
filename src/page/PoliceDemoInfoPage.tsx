import { XMLParser } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
export default function PoliceDemoInfoPage() {
  const [data, setData] = useState(null);
  const [attachedFileNo, setAttachedFileNo] = useState("");

  async function loadHTML() {
    const searchUrl =
      "https://www.smpa.go.kr/user/nd54882.do?View&uQ=&pageST=SUBJECT&pageSV=&imsi=imsi&page=1&pageSC=SORT_ORDER&pageSO=DESC&dmlType=&boardNo=00310495&returnUrl=https://www.smpa.go.kr:443/user/nd54882.do";
    const HTMLresponse = await fetch(searchUrl);
    const htmlString = await HTMLresponse.text();
    const splitByAttachNo = htmlString.split("attachNo=");
    const attachNo = splitByAttachNo[1].substring(0, 8);
    setAttachedFileNo(attachNo);
    console.log("attachNo", attachNo);
  }
  useEffect(() => {
    loadHTML();
  }, []);
  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.demoName}>{item.acc_info}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: `https://www.smpa.go.kr/common/attachfile/attachfileView.do?attachNo=${attachedFileNo}`,
        }}
        style={styles.TodayDemoInfoImg}
      />
    </SafeAreaView>
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

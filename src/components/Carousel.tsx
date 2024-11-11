import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

export default function Carousel({ pages, pageWidth, gap, offset }: ICarousel) {
  const [page, setPage] = useState(0);

  function renderItem({ item }: any) {
    return (
      //   <CarouselImage item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
      <View />
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap)
    );
    setPage(newPage);
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <View style={[styles.IndicatorWrapper]}>
        {Array.from({ length: pages.length }, (_, i) => i).map((i) => (
          <View style={[styles.Indicator]} />
          //   <View key={`indicator_${i}`} focused={i === page} />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f19d9d",
    justifyContent: "center",
    alignItems: "center",
  },
  IndicatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    backgroundColor:'#8e2d2d6c'
  },
  Indicator: {
    marginTop: 0,
    marginBottom: 4,
    marginLeft: 4,
    backgroundColor: "#262626",
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

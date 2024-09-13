import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function CalendarComponent({ onPress }) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  LocaleConfig.locales["ko"] = {
    monthNames: [
      "01월",
      "02월",
      "03월",
      "04월",
      "05월",
      "06월",
      "07월",
      "08월",
      "09월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "오늘",
  };
  LocaleConfig.defaultLocale = "ko";

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log(day.dateString);
          onPress(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#0000ff",
            selectedTextColor: "#ffffff",
          },
        }}
        monthFormat={"yyyy년 MM월"}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          selectedDayTextColor: "#6491ff",
          selectedDayBackgroundColor: "#eef6ff",
          todayTextColor: "#ffffff",
          todayBackgroundColor: "#e80808",
          dayTextColor: "#616d82",
          textDisabledColor: "#d9e1e8",
          arrowColor: "orange",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
        }}
      />
    </View>
  );
}

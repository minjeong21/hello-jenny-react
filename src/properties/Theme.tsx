const themeMap = [
  { key: "Daily", value: "🍚 일상 속 대화" },
  {
    key: "Friend",
    value: "🙋🏻‍♀️ 친구만들기 ",
  },
  { key: "Love", value: "💑 애인만들기 " },
  { key: "Elementary", value: "🧚🏻‍♂️ 초등학생 영어 " },
  { key: "Business", value: "👔 비즈니스 영어 " },
  { key: "News", value: "📰 뉴스 속 문장 " },
  { key: "movie", value: "🍿 영화 속 대사 " },
  { key: "song", value: "🎙 팝송 부르자 " },
];
export const convertThemesToMainTheme = (themes: String[] | undefined) => {
  let theme: any = themeMap[0];
  if (themes) {
    theme = themeMap.find(
      (item) => item.key.toLowerCase() === themes[0].toLowerCase()
    );
  }
  return theme.value;
};

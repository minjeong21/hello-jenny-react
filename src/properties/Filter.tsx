export const LEVEL_MENU = [
  { value: "1", displayName: "πΆ μμ£Ό μ¬μμ" },
  { value: "2", displayName: "π€­ μ‘°κΈ μ¬μμ" },
  { value: "3", displayName: "π€¨ μ€κ° λμ΄λ" },
  { value: "4", displayName: "π€ μ½κ° μ΄λ €μμ" },
  { value: "5", displayName: "π λ§€μ° μ΄λ €μμ" },
  { value: "6", displayName: "π€© μ΄κ³ μ" },
];
export const THEME_MENU = [
  {
    value: "friend",
    text: "ππ»ββοΈ μΉκ΅¬ λ§λ€κΈ°",
  },
  {
    value: "business",
    text: "π λΉμ¦λμ€ μμ΄",
  },
  { value: "daily", text: "π μΌμ" },
  { value: "love", text: "π μ¬λ" },
  {
    value: "wise_saying",
    text: "π¨βπ« μΈμ λͺμΈ",
  },
  { value: "news", text: "π λ΄μ€" },
];

export const getLevelName = (value: string) => {
  const level: any = LEVEL_MENU.find((item) => item.value === value);
  return level.displayName;
};
export const getThemeName = (value: string) => {
  const theme: any = THEME_MENU.find((item) => item.value === value);
  return theme.text;
};

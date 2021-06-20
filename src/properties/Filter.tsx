export const LEVEL_MENU = [
  { value: "1", displayName: "👶 쉬워요" },
  { value: "3", displayName: "🤨 중간 난이도" },
  { value: "5", displayName: "😎 어려워요" },
];

export const getLevelName = (value: string) => {
  const level: any = LEVEL_MENU.find((item) => item.value === value);
  return level ? level.displayName : "";
};

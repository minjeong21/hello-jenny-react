export const LEVEL_MENU = [
  { value: "1", displayName: "👶 아주 쉬워요" },
  { value: "2", displayName: "🤭 조금 쉬워요" },
  { value: "3", displayName: "🤨 중간 난이도" },
  { value: "4", displayName: "🤓 약간 어려워요" },
  { value: "5", displayName: "😎 매우 어려워요" },
  { value: "6", displayName: "🤩 초고수" },
];

export const getLevelName = (value: string) => {
  const level: any = LEVEL_MENU.find((item) => item.value === value);
  return level.displayName;
};

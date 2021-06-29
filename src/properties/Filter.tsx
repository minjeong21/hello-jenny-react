export const LEVEL_MENU = [
  { value: "1", displayName: "Easy" },
  { value: "2", displayName: "Medium" },
  { value: "3", displayName: "Advanced" },
];

export const getLevelName = (value: string) => {
  const level: any = LEVEL_MENU.find((item) => item.value === value);
  return level ? level.displayName : "";
};

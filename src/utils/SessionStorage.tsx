import ITheme from "interface/ITheme";

const LEVEL = "LEVEL";
const THEME = "THEME";

const SessionStorage = {
  saveCurrentLevel: (level: number) => {
    sessionStorage.setItem(LEVEL, `${level}`);
  },
  saveCurrentTheme: (theme: ITheme) => {
    sessionStorage.removeItem(THEME);
    sessionStorage.setItem(THEME, JSON.stringify(theme));
  },
  loadCurrentLevel: () => {
    const level = sessionStorage.getItem(LEVEL);
    return level ? Number(level) : 1;
  },
  loadCurrentTheme: () => {
    const themes = sessionStorage.getItem(THEME);
    if (themes && themes.length > 0) {
      return JSON.parse(themes);
    } else {
      return null;
    }
  },
};
export default SessionStorage;

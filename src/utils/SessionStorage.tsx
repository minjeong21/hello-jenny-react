import ITheme from "interface/ITheme";

const LEVELS = "levels";
const THEMES = "themes";

const SessionStorage = {
  saveSelectedLevels: (levels: string[]) => {
    sessionStorage.setItem(LEVELS, levels.join(","));
  },
  saveSelectedThemes: (themes: ITheme[]) => {
    sessionStorage.removeItem(THEMES);
    sessionStorage.setItem(THEMES, JSON.stringify(themes));
  },
  getSelectedLevels: () => {
    const levels = sessionStorage.getItem(LEVELS);
    if (levels && levels.length > 0) {
      return levels.split(",");
    } else {
      return [];
    }
  },
  getSelectedThemes: () => {
    const themes = sessionStorage.getItem(THEMES);
    if (themes && themes.length > 0) {
      console.log("getSelectedThemes");
      console.log(JSON.parse(themes));
      return JSON.parse(themes);
    } else {
      return [];
    }
  },
};
export default SessionStorage;

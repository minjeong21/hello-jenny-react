const LEVELS = "levels";
const THEMES = "themes";

const SessionStorage = {
  saveSelectedLevels: (levels: string) => {
    sessionStorage.setItem(LEVELS, levels);
  },
  saveSelectedThemes: (themes: string) => {
    sessionStorage.setItem(THEMES, themes);
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
      return themes.split(",");
    } else {
      return [];
    }
  },
};
export default SessionStorage;

const LEVELS = "levels";
const THEMES = "themes";

export default {
  setSelectedLevelsToSession: (levels: string) => {
    sessionStorage.setItem(LEVELS, levels);
  },
  setSelectedThemesToSession: (themes: string) => {
    sessionStorage.setItem(THEMES, themes);
  },
  getSelectedLevelsFromSession: () => {
    const levels = sessionStorage.getItem(LEVELS);
    if (levels && levels.length > 0) {
      return levels.split(",");
    } else {
      return [];
    }
  },
  getSelectedThemesFromSession: () => {
    const themes = sessionStorage.getItem(THEMES);
    if (themes && themes.length > 0) {
      return themes.split(",");
    } else {
      return [];
    }
  },
};

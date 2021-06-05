const LEVELS = "levels";
const THEMES = "themes";
const TOKEN = "token";
const USER_BASIC = "USER_BASIC";

export default {
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
  saveToken: (token: string | null) => {
    token
      ? sessionStorage.setItem(TOKEN, token)
      : sessionStorage.removeItem(TOKEN);
  },
  getToken: () => {
    return sessionStorage.getItem(TOKEN);
  },
  saveUser: (user: string | null) => {
    user
      ? sessionStorage.setItem(USER_BASIC, user)
      : sessionStorage.removeItem(USER_BASIC);
  },
  getUser: () => {
    const user = sessionStorage.getItem(USER_BASIC);
    return user ? JSON.parse(user) : null;
  },
};

const TOKEN = "token";
const USER_BASIC = "USER_BASIC";

const LocalStorage = {
  saveToken: (token: string | null) => {
    token ? localStorage.setItem(TOKEN, token) : localStorage.removeItem(TOKEN);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
  saveUser: (user: string | null) => {
    user
      ? localStorage.setItem(USER_BASIC, user)
      : localStorage.removeItem(USER_BASIC);
  },
  getUser: () => {
    const user = localStorage.getItem(USER_BASIC);
    return user ? JSON.parse(user) : null;
  },
};

export default LocalStorage;

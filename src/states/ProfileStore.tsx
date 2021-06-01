import { action, makeObservable, observable, runInAction } from "mobx";

interface IUser {
  id: number;
  username: string;
  email: string;
}
export class ProfileStore {
  rootStore;
  user: IUser | null;

  constructor(root: any) {
    makeObservable(this, {
      user: observable,
    });
    this.rootStore = root;
    let userString = sessionStorage.getItem("USER_PROFILE");
    this.user = userString ? JSON.parse(userString) : null;
  }

  @action setUser = (user: IUser | null) => {
    sessionStorage.setItem("USER_PROFILE", JSON.stringify(user));
    this.user = user;
  };
  getUser = () => {
    return this.user;
  };

  setToken = (token: string) => {
    sessionStorage.setItem("JWT_TOKEN", token);
  };
  getToken = () => {
    return sessionStorage.getItem("JWT_TOKEN");
  };

  isLogined = () => {
    return sessionStorage.getItem("JWT_TOKEN") ? true : false;
  };

  logout = () => {
    sessionStorage.removeItem("JWT_TOKEN");
    sessionStorage.removeItem("USER_PROFILE");
    this.setUser(null);
  };
}

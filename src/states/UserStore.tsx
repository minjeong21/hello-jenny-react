import {
  getAccessTokenFromKakao,
  getUserByEmail,
  loginKakaoLastStep,
  loginWithGoogle,
  registerUser,
} from "apis/AuthApi";
import { action, makeObservable, observable } from "mobx";
import LocalStorage from "utils/LocalStorage";
import { getKakaoCallMethodObject, Method } from "utils/UserAgent";

const KAKAO_OAUTH_TOKEN_API = `https://kauth.kakao.com/oauth/authorize`;

interface IUser {
  pk: number;
  username: string;
  email: string;
}
export class UserStore {
  rootStore;
  user: IUser | null;
  token: string | null;
  userProfile: { photo: string | null } | null;

  constructor(root: any) {
    makeObservable(this, {
      user: observable,
    });
    this.rootStore = root;
    this.user = LocalStorage.getUser();
    this.token = LocalStorage.getToken();
    this.userProfile = null;
  }

  @action setUser = (user: IUser | null) => {
    if (user) {
      LocalStorage.saveUser(JSON.stringify(user));
    }
    this.user = user;
  };

  getUser = () => {
    if (!this.user) {
      this.user = LocalStorage.getUser();
    }
    return this.user;
  };

  setToken = (token: string) => {
    LocalStorage.saveToken(token);
  };

  isLogined = () => {
    return LocalStorage.getUser();
  };

  logout = () => {
    LocalStorage.saveToken(null);
    LocalStorage.saveUser(null);
    this.setUser(null);
  };

  fetchAccessCodeFromKakao = async (kakaoCode: string) => {
    let response = await getAccessTokenFromKakao(kakaoCode);
    //실패 처리
    if (response instanceof Error || !response) {
      alert("카카오 서버에 에러가 발생했습니다. 다시 시도해주세요");
      return null;
    } else {
      return response;
    }
  };
  private successCallback = () => {
    document.querySelector("#signin-loading")?.classList.add("hidden");
    window.location.href = "/profile";
  };
  private failCallback = () => {
    alert("실패");
  };

  @action loginKakao = async () => {
    let browerObject = getKakaoCallMethodObject(navigator.userAgent);
    if (browerObject.method === Method.API) {
      // API 로그인
      let BASE_URL = process.env.REACT_APP_PUBLIC_URL;
      let KakaoCallUrl = `${KAKAO_OAUTH_TOKEN_API}?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${BASE_URL}/oauth/&response_type=code`;
      window.location.href = KakaoCallUrl;
    } else {
      // SDK로 로그인
      const loginServerByKakaoAccessToken = this.loginServerByKakaoAccessToken;
      const successCallback = this.successCallback;
      const failCallback = this.failCallback;
      const currentWindow: any = window;
      if (!currentWindow["Kakao"].isInitialized()) {
        currentWindow["Kakao"].init(process.env.REACT_APP_KAKAO_JS_KEY);
      }
      currentWindow["Kakao"].Auth.cleanup();
      await currentWindow["Kakao"].Auth.login({
        persistAccessToken: true,
        persistRefreshToken: true,
        success: function (authObj: any) {
          loginServerByKakaoAccessToken(
            authObj.access_token,
            false,
            successCallback,
            failCallback
          );
        },
        fail: function (err: any) {
          console.log(JSON.stringify(err));
          this.failCallback();
        },
      });
    }

    // let token = loadJWTFromStorage();

    // 로그인 먹통된 경우, 일단 Loading 페이지 제거
    // let closeLoginModal = this.closeLoginModal;
    // let closeLoadingPage = this.closeLoadingPage;

    // closeLoginModal = this.closeLoginModal;
    // closeLoadingPage = this.closeLoadingPage;

    // let loginCheck = setInterval(function () {
    //   console.log('hello')
    //   if (token) {
    //     // closeLoginModal();
    //     // closeLoadingPage();
    //     // document.body.setAttribute("style", "");
    //     clearInterval(loginCheck);
    //   }
    // }, 500);

    // setTimeout(function () {
    //   //TODO 로그인이 안된 상황 (팝업이 아닌)에 대한 유저 알림 필요
    //   try {
    //     clearInterval(loginCheck);
    //   } catch (err) {
    //     console.log(err);
    //   }

    //   if (!loadJWTFromStorage()) {
    //     Sentry.captureMessage("[Login] 7초 동안 로그인 안됨");
    //   }

    //   document.body.setAttribute("style", "");
    //   closeLoadingPage();
    //   closeLoginModal();
    // }, 7000);
  };

  loginServerByKakaoAccessToken = async (
    accessToken: string,
    fromAPI: boolean,
    callbackSuccess: () => void,
    callbackFail: () => void
  ) => {
    let response = await loginKakaoLastStep(accessToken); //토큰 반환
    if (response instanceof Error || !response) {
      alert("로그인을 다시 시도해주세요. 문제가 반복될 시 1:1로 문의 해주세요");
      if (fromAPI) {
        window.location.href = "/";
      } else {
        callbackFail();
      }
    } else {
      this.setUser(response.user);
      this.setToken(response.token);
      callbackSuccess();
    }
  };

  @action loginGoogle = async (accessToken: string) => {
    const response = await loginWithGoogle(accessToken);
    if (response instanceof Error) {
      alert("다시 시도해주세요.");
      this.failCallback();
    } else {
      this.setUser(response.user);
      this.setToken(response.token);
      this.successCallback();
    }
  };

  singUpUser = async (email: string, username: string, password: string) => {
    const response = await registerUser(email, username, password);
    if (response instanceof Error || !response) {
      return { success: false, message: response };
    } else {
      return { success: true, user: response };
    }
  };

  getUserByEmail = async (email: string) => {
    const response = await getUserByEmail(email);
    if (response instanceof Error || !response) {
      return { error: true };
    } else {
      return { error: false, isUser: response.is_user, user: response.user };
    }
  };
}

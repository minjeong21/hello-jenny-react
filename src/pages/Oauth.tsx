import React, { useEffect } from "react";
import { useStores } from "states/Context";
import { useLocation } from "react-router-dom";
import queryString from "querystring";

const OauthKakao = () => {
  let location = useLocation();
  const { userStore } = useStores();

  useEffect(() => {
    //카카오톡 Code 가져오
    console.log(location.search);

    const parsedQuery: any = queryString.parse(
      location.search.replace("?", "")
    );
    console.log(parsedQuery);
    if (parsedQuery && parsedQuery.code) {
      kakaoLogin(parsedQuery.code);
    } else {
      alert("로그인에 문제가 생겼습니다.");
    }
  }, []);

  const kakaoLogin = async (code: string) => {
    let response: any = await userStore.fetchAccessCodeFromKakao(code);
    if (response instanceof Error) {
      alert("로그인 에러 발생");
      console.log(response);
    } else if (response) {
      await userStore.loginServerByKakaoAccessToken(
        response.access_token,
        true,
        callbackLoginSuccess,
        callbackLoginFail
      );
    } else {
      callbackLoginFail();
    }
  };

  const callbackLoginSuccess = () => {
    const redirectPath = sessionStorage.getItem("SUCCESS_REDIRECT_PATH");
    sessionStorage.removeItem("SUCCESS_REDIRECT_PATH");
    window.location.href = redirectPath ? redirectPath : "/";
  };

  const callbackLoginFail = () => {
    const redirectPath = sessionStorage.getItem("FAIL_REDIRECT_PATH");
    sessionStorage.removeItem("FAIL_REDIRECT_PATH");
    window.location.href = redirectPath ? redirectPath : "/";
  };

  return (
    <div className="sm:pt-20 pt-12 pb-56" id="profile-main">
      로그인 중...
    </div>
  );
};

export default OauthKakao;

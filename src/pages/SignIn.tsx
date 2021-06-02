import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { observer } from "mobx-react";
import GoogleIcon from "components/icons/GoogleIcon";
import KakaoIcon from "components/icons/KakaoIcon";
import { fetchUserProfile, loginUser } from "apis/AuthApi";
import { useStores } from "states/Context";

const Main = styled.main`
  .margin-auto {
    margin: 0 auto;
  }
  .margin-x-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .width-460 {
    max-width: 460px;
  }

  input:focus-visible {
    outline-color: #53cfc8;
  }
  button:focus-visible {
    outline: none;
  }
  button {
    cursor: pointer;
  }
  .text-button:hover {
    text-decoration: underline;
  }

  .kakao-signin {
    background-color: rgb(254, 229, 0);
  }
  .gmail-signin {
    background-color: white;
  }
  #signup-button {
  }
`;

const SignIn = observer(() => {
  const pathManager = new PathManager(useHistory());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { profileStore } = useStores();

  useEffect(() => {}, []);

  const signinWithEmail = async () => {
    // AuthStore 추가
    const response = await loginUser(email, password);
    if (response instanceof Error) {
      alert("회원 정보가 없습니다.");
      setPassword("");
    } else {
      const token = response.token;
      const profile = await fetchUserProfile(token);
      profileStore.setUser(profile);
      profileStore.setToken(token);
      pathManager.goHome();
    }
  };

  const signinWithKakao = () => {
    alert(email + "/" + password + " ->kakao");
  };
  const signinWithGoogle = () => {
    alert(email + "/" + password + " ->google");
  };

  const findEmail = () => {
    alert("찾기");
  };
  const findPassword = () => {
    alert("찾기");
  };
  const signup = (e: any) => {
    pathManager.goReigster(e);
  };
  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signinWithEmail();
  };
  return (
    <Main className="pt-36 flex flex-col items-center">
      <div className="w-full margin-auto p-3 sm:p-0">
        <section className="p-8 max-w-screen-sm width-460 bg-white border rounded-lg  shadow-custom z-10">
          <h3 className="sm:text-3xl text-2xl font-bold pt-2 pb-8 text-center">
            제니 로그인하기
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              className="p-3 mb-1 border-gray-300 w-full"
              type="email"
              name="email"
              placeholder="email"
              value={email}
              required
              onChange={changeEmail}
            />
            <input
              className="p-3 mb-1 border-gray-300 w-full"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              required
              onChange={changePassword}
            />

            <button
              type="submit"
              className="py-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full shadow-md"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-between pt-2 text-sm sm:text-base font-bold">
            <button
              className="text-button bg-gray-200 rounded-lg px-3 py-1"
              onClick={signup}
            >
              회원가입
            </button>
            <div className="flex ">
              <button
                className=" bg-gray-200 rounded-lg px-3 py-1 mr-1"
                onClick={findEmail}
              >
                아이디 찾기
              </button>
              <button
                className="bg-gray-200 rounded-lg px-3 py-1"
                onClick={findPassword}
              >
                비밀번호찾기
              </button>
            </div>
          </div>
          <div className="py-6 flex items-center justify-center margin-auto">
            <div className="flex-1 border-t-2 border-gray-200"></div>
            <span className=" text-sm uppercase mx-5 font-medium text-gray-600">
              Or
            </span>
            <div className="flex-1 border-t-2"></div>
          </div>
          <section className="rounded-lg">
            <button
              className="py-3 mb-3 border-0 font-bold w-full shadow-md kakao-signin"
              onClick={signinWithKakao}
            >
              <div className="flex justify-center text-sm sm:text-base ">
                <KakaoIcon />
                <span>카카오로 로그인</span>
              </div>
            </button>
            <button
              className="py-3 mb-3 border-0 font-bold w-full shadow-md gmail-signin"
              onClick={signinWithGoogle}
            >
              <div className="flex justify-center  text-sm sm:text-base ">
                <GoogleIcon />
                <span>구글로 로그인</span>
              </div>
            </button>
          </section>
        </section>

        {/* 뱃지 */}
      </div>
    </Main>
  );
});

export default SignIn;

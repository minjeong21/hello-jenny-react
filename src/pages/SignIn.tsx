import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { observer } from "mobx-react";
import GoogleIcon from "components/GoogleIcon";
import KakaoIcon from "components/KakaoIcon";
import { loginUser } from "apis/AuthApi";

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

// https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/187749158_5518684844869977_4143896323752426109_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=r5k68SUl0-gAX-xiemP&_nc_ht=scontent-gmp1-1.xx&oh=18d79f3e5f549cf6aa66b31a1ad34c39&oe=60D04BED

const SignIn = observer(() => {
  const pathManager = new PathManager(useHistory());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const signinWithEmail = async () => {
    // AuthStore 추가
    const response = await loginUser(email, password);
    console.log(response);
    sessionStorage.setItem("token", response.token);
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

  return (
    <Main className="pt-28 pt-12 pb-20 flex flex-col items-center">
      <div className="w-full margin-auto p-3 md:p-0">
        <header className="flex justify-between width-460 margin-auto relative pt-4">
          <button
            id="signup-button"
            className="absolute bottom-0 right-2  bg-gray-400 text-white font-bold px-4 py-3 rounded-t self-end md:text-medium text-sm"
            onClick={signup}
          >
            회원가입 하러가기
          </button>
        </header>
        <section className="p-8 max-w-screen-sm width-460 bg-white border rounded-lg  shadow-custom z-10">
          <h3 className="md:text-3xl text-2xl font-bold pb-6 text-center">
            제니 로그인하기
          </h3>
          <input
            className="p-3 mb-1 border-gray-300 w-full"
            type="text"
            name="email"
            placeholder="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3 mb-1 border-gray-300 w-full"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="py-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
            onClick={signinWithEmail}
          >
            Sign in
          </button>
          <div className="flex justify-end pt-2">
            <div className="text-sm flex text-sm md:text-medium ">
              <span>🔓 </span>
              <button className="text-button" onClick={findEmail}>
                아이디
              </button>
              <span>,</span>
              <button className="text-button" onClick={findPassword}>
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
              className="py-3 mb-3 border-0 font-bold w-full shadow-custom kakao-signin"
              onClick={signinWithKakao}
            >
              <div className="flex justify-center text-sm md:text-medium ">
                <KakaoIcon />
                <span>카카오로 로그인</span>
              </div>
            </button>
            <button
              className="py-3 mb-3 border-0 font-bold w-full shadow-custom gmail-signin"
              onClick={signinWithGoogle}
            >
              <div className="flex justify-center  text-sm md:text-medium ">
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

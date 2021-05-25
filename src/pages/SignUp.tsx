import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { observer } from "mobx-react";
import GoogleIcon from "components/GoogleIcon";
import KakaoIcon from "components/KakaoIcon";

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

const SignUp = observer(() => {
  const pathManager = new PathManager(useHistory());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {}, [step]);

  const goNextStep = () => {
    console.log(step);
    let allPass = true;
    switch (step) {
      case 1:
        allPass = email ? true : false;
        break;
      case 2:
        allPass = password && password2 && username ? true : false;
        break;
      case 3:
        break;
    }
    if (allPass) {
      setStep(step + 1);
    } else {
      alert("모든 칸을 채워주세요!");
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
  const signin = (e: any) => {
    pathManager.goSignIn(e);
  };

  return (
    <Main className="pt-24 pb-24 flex flex-col items-center">
      <div className="w-full margin-auto p-3 md:pt-16">
        <header className="flex justify-between width-460 margin-auto relative pt-4">
          <button
            id="signup-button"
            className="absolute bottom-0 right-2 bg-gray-400 text-white font-bold px-4 py-3 rounded-t self-end md:text-medium text-sm"
            onClick={signin}
          >
            로그인 하러가기
          </button>
        </header>

        <section className="p-8 max-w-screen-sm width-460 bg-white border rounded-lg  shadow-custom z-10">
          <h3 className="md:text-3xl text-2xl font-bold mb-6 text-center">
            제니 멤버 되기
          </h3>
          {step === 0 && (
            <>
              <input
                className="p-3 mb-1 border-gray-300 w-full"
                type="email"
                name="email"
                placeholder="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="py-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
                onClick={goNextStep}
              >
                Continue
              </button>
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
                  <div className="flex justify-center md:text-medium text-sm">
                    <KakaoIcon />
                    <span>카카오로 멤버 되기</span>
                  </div>
                </button>
                <button
                  className="py-3 mb-3 border-0 font-bold w-full shadow-custom gmail-signin"
                  onClick={signinWithGoogle}
                >
                  <div className="flex justify-center md:text-medium text-sm">
                    <GoogleIcon />
                    <span>구글로 멤버 되기</span>
                  </div>
                </button>
              </section>
            </>
          )}
          {step === 1 && (
            <>
              <div className="pb-1">Nickname</div>
              <input
                className="p-3 mb-1 border-gray-300 w-full"
                type="text"
                name="name"
                placeholder="이름 또는 닉네임을 입력해주세요"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="pb-1 pt-6">Password</div>
              <input
                className="p-3 mb-1 border-gray-300 w-full"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="p-3 mb-1 border-gray-300 w-full"
                type="password"
                name="password2"
                placeholder="위와 동일한 비밀번호를 입력해주세요"
                value={password2}
                required
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button
                className="py-3 mt-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
                onClick={goNextStep}
              >
                Continue
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="pb-1">관심분야 체크</div>

              <button className="py-3 mt-3 mb-1 bg-gray-200 border-0 font-bold w-full">
                비지니스
              </button>

              <button className="py-3 mt-3 mb-1 bg-gray-200 border-0 font-bold w-full">
                토익 준비
              </button>

              <button className="py-3 mt-3 mb-1 bg-gray-200 border-0 font-bold w-full">
                여행 영어
              </button>

              <button
                className="py-3 mt-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
                onClick={goNextStep}
              >
                Continue
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <div className="pb-1 text-3xl">
                제니의 멤버가 되신 것을 환영해요!!
              </div>
              <div className="pb-1">다시 로그인 해주세요 :)</div>

              <button
                className="py-3 mt-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
                onClick={(e) => pathManager.goSignIn(e)}
              >
                로그인
              </button>
            </>
          )}
        </section>

        {/* 뱃지 */}
      </div>
    </Main>
  );
});

export default SignUp;

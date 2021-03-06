import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { observer } from "mobx-react";
import { fetchUserProfile, loginUser } from "apis/AuthApi";
import { useStores } from "states/Context";
import LogoIcon from "components/icons/LogoIcon";
import { emailValidate, passwordValidate } from "utils/Validation";
import LoadingSpinner from "components/LoadingSpinner";

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

  button {
    cursor: pointer;
  }
  .text-button:hover {
    text-decoration: underline;
  }

  .kakao-icon {
    background-color: rgb(254, 229, 0);
  }
  .gmail-icon {
    background-color: white;
  }
  .naver-icon {
    background-color: #1ec800;
  }
`;

const SignIn = observer(() => {
  const pathManager = new PathManager(useHistory());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const { userStore } = useStores();

  useEffect(() => {
    //User Access Token 가져오기
  }, []);

  const signinWithEmail = async () => {
    // AuthStore 추가
    const response = await loginUser(email, password);
    if (response instanceof Error) {
      alert("회원 정보가 없습니다.");
      setPassword("");
    } else {
      const token = response.token;
      const profile = await fetchUserProfile(token);
      userStore.setUser(profile);
      userStore.setToken(token);
      pathManager.goHome();
    }
  };

  const signinWithKakao = () => {
    userStore.loginKakao();
    document.querySelector("#signin-loading")?.classList.remove("hidden");
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
    emailValidate(e.target.value) && passwordValidate(password)
      ? setValidated(true)
      : setValidated(false);
  };
  const changePassword = (e: any) => {
    setPassword(e.target.value);

    passwordValidate(e.target.value) && emailValidate(email)
      ? setValidated(true)
      : setValidated(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signinWithEmail();
  };
  return (
    <Main className="pt-36 flex flex-col items-center">
      <div className=" hidden" id="signin-loading">
        <LoadingSpinner />
      </div>
      <div className="w-full margin-auto p-3 sm:p-0">
        <section className="p-8 max-w-screen-sm width-460 bg-white rounded-lg  shadow-lg z-10">
          <div className="flex justify-center">
            <img
              className="w-9 h-10 mr-2"
              src="/assets/small-quokka.png"
              alt="quokka logo"
            />

            <h3 className="sm:text-xl text-lg font-bold pt-2 pb-8 text-center">
              영작으로 영어와 친해져요!
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="p-3 mb-1 border-gray-200 w-full"
              type="email"
              name="email"
              placeholder="이메일"
              value={email}
              required
              onChange={changeEmail}
            />
            <input
              className="p-3 mb-1 border-gray-200 w-full"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              required
              onChange={changePassword}
            />

            <button
              type="submit"
              disabled={!validated}
              className="py-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full shadow-md"
            >
              이메일로 로그인
            </button>
          </form>

          <div className="flex justify-center pt-6">
            <div>
              <button
                className="flex justify-center items-center w-12 h-12 rounded-3xl shadow-md naver-icon mr-1 "
                onClick={signinWithKakao}
              >
                <LogoIcon name="naver" />
              </button>
            </div>{" "}
            <div>
              <button
                className="flex justify-center items-center w-12 h-12 rounded-3xl shadow-md kakao-icon mr-1 "
                onClick={signinWithKakao}
              >
                <LogoIcon name="kakao" />
              </button>
            </div>
            <div>
              <button
                className="flex justify-center items-center w-12 h-12 rounded-3xl shadow-md gmail-icon mr-1 "
                onClick={signinWithGoogle}
              >
                <LogoIcon name="google" />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="text-primary-700 px-3 py-4 text-sm mb-3 hover:underline"
              onClick={findEmail}
            >
              가입 정보를 잊으셨나요?
            </button>
          </div>
          <div className="flex justify-center pt-2 sm:text-sm">
            <span className="text-gray-500">아직 회원이 아니신가요? </span>
            <button
              className="pl-3 font-bold text-primary-700 hover:underline"
              onClick={signup}
            >
              회원가입
            </button>
          </div>
        </section>
      </div>
    </Main>
  );
});

export default SignIn;

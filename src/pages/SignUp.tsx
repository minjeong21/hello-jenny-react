import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { observer } from "mobx-react";
import { registerUser } from "apis/AuthApi";
import LogoIcon from "components/icons/LogoIcon";
import { validateEmail, validatePassword } from "utils/Validation";
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

const checkList = {
  all: "아래 약관에 모두 동의합니다.",
  tos: "서비스 이용약관 (필수)",
  pricyPolicy: "개인정보 처리 방침 (필수)",
  marketingSMS: "이벤트 등 프로모션 알림 SMS 수신 (선택)",
  marketingEmail: "이벤트 등 프로모션 알림 Email 수신 (선택)",
};

const SignUp = observer(() => {
  const pathManager = new PathManager(useHistory());
  const { userStore } = useStores();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  // 유효셩 체크
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [validatedPassword2, setValidatedPassword2] = useState(false);
  // 이용약관 동의 관련
  const [checkAll, setCheckAll] = useState(false);
  const [checkTos, setCheckTos] = useState(false);
  const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);
  const [checkMarketingEmail, setCheckMarketingEmail] = useState(false);
  const [checkMarketingSMS, setCheckMarketingSMS] = useState(false);
  // view 전환
  const [step, setStep] = useState(0);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {}, [step]);

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;

      case "email":
        setEmail(value);
        setValidatedEmail(validateEmail(value));
        break;

      case "password":
        setPassword(value);
        setValidatedPassword(validatePassword(value));
        break;
      case "password2":
        setPassword2(value);
        setValidatedPassword2(password === value);
    }
  };
  const goPreviosStep = () => {
    setStep(step - 1);
  };
  const goCheckEmailAndNextStep = async () => {
    document.querySelector("#email-check-spinner")?.classList.remove("hidden");
    const response: any = await userStore.getUserByEmail(email);
    document.querySelector("#email-check-spinner")?.classList.add("hidden");
    if (response.error) {
      alert("에러 발생");
    } else if (response.isUser) {
      // TODO: Notice 팝업으로 대체
      alert("이미 가입된 이메일입니다.");
    } else {
      setStep(1);
    }
  };

  const onKeyPressEnter = (event: any) => {
    if (event.charCode == 13 && validatedEmail) {
      goCheckEmailAndNextStep();
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

  const onToggleCheckbox = (name: string) => {
    switch (name) {
      case "all":
        const status = !checkAll;
        setCheckAll(status);
        setCheckTos(status);
        setCheckPrivacyPolicy(status);
        setCheckMarketingSMS(status);
        setCheckMarketingEmail(status);
        break;
      case "tos":
        setCheckTos(!checkTos);
        break;
      case "pricy":
        setCheckPrivacyPolicy(!checkPrivacyPolicy);
        break;
      case "sms":
        setCheckMarketingSMS(!checkMarketingSMS);
        break;
      case "email":
        setCheckMarketingEmail(!checkMarketingEmail);
        break;
    }
  };
  const validatedSignUpButton = () => {
    return (
      validatedEmail &&
      validatedPassword &&
      validatedPassword2 &&
      checkTos &&
      checkPrivacyPolicy
    );
  };

  const signUpUser = async () => {
    const response = await userStore.singUpUser(email, username, password);
    console.log(response);
    setSignUpSuccess(true);
    setStep(10);
  };

  return (
    <Main className="pt-24 pb-24 flex flex-col items-center">
      <div className="w-full margin-auto p-3 sm:pt-16">
        <section className="p-8 max-w-screen-sm width-460 bg-white border rounded-lg  shadow-lg z-10">
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
          {step === 0 && (
            <>
              <input
                className="p-3 mb-1 border-gray-300 w-full"
                type="email"
                name="email"
                placeholder="이메일"
                value={email}
                required
                onChange={onChangeInput}
                onKeyPress={onKeyPressEnter}
              />
              {email.length > 2 && !validatedEmail && (
                <div
                  className="pl-1 text-red-700 text-xs pb-1"
                  id="email-validation"
                >
                  ! 이메일 형식에 맞게 입력해주세요.
                </div>
              )}
              <button
                disabled={!validatedEmail}
                className="py-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full shadow-md"
                onClick={goCheckEmailAndNextStep}
              >
                <div className="flex justify-center">
                  <div className="mr-3">이메일로 가입하기</div>
                  <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-100 h-5 w-5 hidden"
                    id="email-check-spinner"
                  ></div>
                </div>
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
                  <div className="flex justify-center sm:text-base text-sm">
                    <LogoIcon name="kakao" />
                  </div>
                </button>
                <button
                  className="py-3 mb-3 border-0 font-bold w-full shadow-custom gmail-signin"
                  onClick={signinWithGoogle}
                >
                  <div className="flex justify-center sm:text-base text-sm"></div>
                </button>
              </section>
            </>
          )}
          {step === 1 && (
            <>
              <div className="pb-2">
                <h6 className="pl-1 pb-1 text-sm">이메일</h6>
                <input
                  className="p-3 mb-1 border-gray-300 w-full"
                  type="email"
                  name="email"
                  placeholder="이메일"
                  value={email}
                  disabled
                  required
                />
              </div>
              <div className="pb-2">
                <h6 className="pl-1 pb-1 text-sm">닉네임</h6>
                <input
                  className="p-3 border-gray-300 w-full"
                  type="text"
                  name="username"
                  placeholder="이름 또는 닉네임"
                  value={username}
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="pb-2">
                <h6 className="pl-1 pb-1 text-sm">비밀번호</h6>
                <input
                  className="p-3 mb-1 border-gray-300 w-full"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  required
                  onChange={onChangeInput}
                />

                {password.length > 0 && !validatedPassword && (
                  <div className="pl-1 text-red-700 text-xs pb-1 ">
                    ! 영문, 숫자, 특수문자 포함 8~36자로 설정해주세요.
                  </div>
                )}

                <input
                  className="p-3 mb-1 border-gray-300 w-full"
                  type="password"
                  name="password2"
                  placeholder="비밀번호 확인"
                  value={password2}
                  required
                  onChange={onChangeInput}
                />
                {password2.length > 0 && !validatedPassword2 && (
                  <div className="pl-1 text-red-700 text-xs pb-1 ">
                    ! 비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
              <AgreeCheckList
                checkAll={checkAll}
                checkTos={checkTos}
                checkPrivacyPolicy={checkPrivacyPolicy}
                checkMarketingSMS={checkMarketingSMS}
                checkMarketingEmail={checkMarketingEmail}
                onToggleCheckbox={onToggleCheckbox}
              />
              <div className="flex gap-1">
                <button
                  className="py-3 mt-3 mb-1 bg-whtie border-primary-700 text-primary-700 border font-bold w-full"
                  onClick={goPreviosStep}
                >
                  이전으로
                </button>
                <button
                  className="py-3 mt-3 mb-1 bg-primary-700 text-white border-0 font-bold w-full"
                  disabled={!validatedSignUpButton()}
                  onClick={signUpUser}
                >
                  회원 가입
                </button>
              </div>
            </>
          )}

          {signUpSuccess && (
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

const AgreeCheckbox = ({
  checked,
  text,
  onClick,
}: {
  checked: boolean;
  text: string;
  onClick: (e: any) => void;
}) => {
  return (
    <div className="flex items-center cursor-pointer pb-1" onClick={onClick}>
      <input
        checked={checked}
        type="checkbox"
        className="border-gray-700"
        onChange={onClick}
      />
      <div className="pl-1 text-sm text-gray-900">{text}</div>
    </div>
  );
};

const AgreeCheckList = ({
  checkAll,
  checkTos,
  checkPrivacyPolicy,
  checkMarketingSMS,
  checkMarketingEmail,
  onToggleCheckbox,
}: {
  checkAll: boolean;
  checkTos: boolean;
  checkPrivacyPolicy: boolean;
  checkMarketingSMS: boolean;
  checkMarketingEmail: boolean;
  onToggleCheckbox: (name: string) => void;
}) => (
  <div className="pb-2">
    <div className="pb-1 mb-1 border-b">
      <AgreeCheckbox
        checked={checkAll}
        text={checkList.all}
        onClick={() => onToggleCheckbox("all")}
      />
    </div>
    <AgreeCheckbox
      checked={checkTos}
      text={checkList.tos}
      onClick={() => onToggleCheckbox("tos")}
    />
    <AgreeCheckbox
      checked={checkPrivacyPolicy}
      text={checkList.pricyPolicy}
      onClick={() => onToggleCheckbox("pricy")}
    />
    <AgreeCheckbox
      checked={checkMarketingSMS}
      text={checkList.marketingSMS}
      onClick={() => onToggleCheckbox("sms")}
    />
    <AgreeCheckbox
      checked={checkMarketingEmail}
      text={checkList.marketingEmail}
      onClick={() => onToggleCheckbox("email")}
    />
  </div>
);

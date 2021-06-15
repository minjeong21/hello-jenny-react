import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "states/Context";
import PathManager from "utils/PathManager";
import DotMenuIcon from "components/icons/DotMenuIcon";
import LocalStorage from "utils/LocalStorage";
import SectionSolvedWriting from "components/section/SectionSolvedWriting";
import SectionBookmark from "components/section/SectionBookmark";
import path from "path";

const Main = styled.main`
  min-height: calc(100vh - 45px);
  .bg-main {
    background-image: url(/assets/bg-main-8.jpg);
    background-size: cover;
  }
  .margin-auto {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Membership = observer(() => {
  const pathManager = new PathManager(useHistory());
  const { userActivityStore } = useStores();
  const [selectedProductId, setSelectedProductId] = useState(1);

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      // userActivityStore.fetchAllSolvedWritings(token);
    } else {
      alert("유저 정보를 찾을 수 없습니다");
    }

    document.querySelector("#profile-main")?.addEventListener("click", () => {
      document.querySelector("#setting-modal")?.classList.add("hidden");
    });
  }, []);

  const onClickPaymentButton = () => {
    alert("결제해 주셔서 감사합니다 :) Home으로 이동");
    pathManager.goHome();
  };
  const products = [
    {
      id: 1,
      emphasis: true,
      name: "수퍼 얼리버드",
      period: "6개월",
      originPrice: "24,000",
      discount: 67,
      price: "7,900",
    },
    {
      id: 2,
      emphasis: false,
      name: "얼리버드",
      period: "3개월",
      originPrice: "12,000",
      discount: 25,
      price: "8,900",
    },
    {
      id: 3,
      emphasis: false,
      name: "얼리버드",
      period: "6개월",
      originPrice: "24,000",
      discount: 37,
      price: "13,900",
    },
    {
      id: 4,
      emphasis: false,
      name: "얼리버드",
      period: "12개월",
      originPrice: "48,000",
      discount: 58,
      price: "19,900",
    },
  ];

  const functions = [
    { text: "무제한 이용 가능", isOpen: true },
    { text: "테마별, 난이도별 영작", isOpen: true },
    { text: "북마크, 푼 문제 저장", isOpen: true },
    { text: "매일 문장 받기", isOpen: false },
    { text: "스피킹 연습 기능", isOpen: false },
  ];
  return (
    <Main className="sm:pt-20 pt-12 pb-56" id="profile-main">
      <div className="mt-6 p-2 w-full max-w-screen-md  margin-auto">
        <header>
          <div className="text-center text-3xl font-bold pb-4">
            멤버십 혜택보기
          </div>
          <div className="text-center textpb-20 text-gray-600 pb-12">
            <div className="pb-2">오픈 기념 수퍼 얼리버드 행사 중이에요.</div>
            <div>
              두번 다시 오지 않을 기회! 놓치지 마세요!!
              <img
                className="inline"
                src="/assets/party_blob.gif"
                width="25"
                alt="happy emoji"
              />
            </div>
          </div>
        </header>

        <div className="flex gap-3">
          <div className=" flex-1 p-4 border bg-white rounded-lg shadow-lg">
            <h3 className="text-primary-700 font-bold pb-1 text-lg">
              제니 멤버를 위한 혜택
            </h3>
            <div className="pb-8 text-gray-500 text-xs">
              계속 추가되는 혜택을 기대해주세요!
            </div>
            <ul>
              {functions.map((item, index) => (
                <li key={index} className="pb-5 text-sm">
                  {item.isOpen ? (
                    <div className="flex gap-1">
                      <CheckImg /> {item.text}
                    </div>
                  ) : (
                    <div className="flex text-gray-500 gap-1">
                      <ClockIcon />
                      {item.text} (준비 중)
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-2 flex flex-col gap-2 justify-between">
            {products.map((product) => (
              <div
                onClick={() => setSelectedProductId(product.id)}
                key={product.id}
                className={`p-3 shadow rounded flex-1 flex justify-between cursor-pointer
                ${product.emphasis ? "bg-gradient-200" : "bg-white"} ${
                  selectedProductId === product.id
                    ? "border-primary-500 border-2"
                    : "border-2 border-white"
                }`}
              >
                <div className="flex">
                  <div
                    className={`w-6 pt-1 ${
                      selectedProductId === product.id
                        ? "text-primary-700"
                        : "text-gray-300"
                    }`}
                  >
                    <CheckCircleImg checked={true} />
                  </div>
                  <div>
                    <h4 className="text-bold pb-2 text-lg font-bold">
                      {product.name}
                    </h4>
                    <div>{product.period}</div>
                  </div>
                </div>
                <div>
                  <div className="line-through text-gray-400 text-right text-sm">
                    {product.originPrice}원
                  </div>
                  <div className="flex gap-1 items-center text-lg font-bold">
                    <div className="bg-primary-700 py-1 px-2 text-bold text-white text-xs rounded-xl text-center ">
                      -{product.discount}%
                    </div>
                    <div>{product.price}원</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            className="text-xl bg-primary-600 text-white px-16 py-5 rounded shadow-lg font-bold"
            onClick={onClickPaymentButton}
          >
            멤버십 구매하기
          </button>
        </div>
        {/* <img src="/assets/membership_sample.png" alt="membership samle" /> */}
      </div>
    </Main>
  );
});

export default Membership;

const CheckImg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-4 text-gray-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckCircleImg = ({ checked }: { checked: boolean }) => {
  if (checked) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
};

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

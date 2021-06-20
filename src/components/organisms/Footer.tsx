import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 justify-center py-10 px-6 text-sm text-gray-200 bottom-0 w-full">
      <div className="max-width">
        <div className="flex pb-3">
          <div className="flex-1">
            <h4 className="text-white text-xl font-bold">헬로제니</h4>
          </div>
          <div className="flex-1 flex">
            <a href="#" className="pb-1 px-2">
              회사소개
            </a>
            <a href="#" className="pb-1 px-2">
              고객센터
            </a>
            <a href="#" className="pb-1 px-2">
              이용약관
            </a>
            <a href="#" className="pb-1 px-2">
              개인정보 처리방침
            </a>
          </div>
        </div>

        <div className="bg-gray-800 text-gray-400 text-sm">
          <div>쿠러쉬 coorush </div>
          <div className="flex">
            <div>경기도 성남시 분당구 정자동 75-8, 102호 |&nbsp;</div>
            <div>대표 구민정 |&nbsp;</div>
            <div>문의: developer@coorush.com</div>
          </div>
          <div className="flex">
            <div>사업자 등록번호 : 546-41-00703 |&nbsp;</div>
            <div>통신판매업 신고번호 : 제2019-서울강남 </div>
          </div>

          <div className="text-center pt-6">
            © 2021 Coorush All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

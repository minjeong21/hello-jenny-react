import styled from "styled-components";
const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
`;
const FilterNavigation = () => {
  return (
    <Navgation className="text-sm flex mb-2">
      <div className="text-sm w-full pb-3">
        <div className="text-sm inline-block mr-2 mt-2">
          <button className="text-sm mr-2">난이도</button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50 bg-blue-200 border">
            #아주_쉬워요
          </button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50">
            #조금_쉬워요
          </button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50">
            #중간_난이도
          </button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50">
            #약간_어려워요
          </button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50">
            #매우_어려워요
          </button>
          <button className="text-sm text-blue-600 text-sm p-1 mr-2 rounded-md hover:bg-blue-50">
            #초고수
          </button>
        </div>
        <br />
        <div className="text-sm inline-block mr-2 mt-2">
          <button className="text-sm mr-2">테마</button>
          <button className="text-sm bg-green-100 text-green-600 text-sm p-1 mr-2 rounded-md border-green-600 hover:bg-green-50">
            #친구_만들기
          </button>
          <button className="text-sm text-green-600 text-sm p-1 mr-2 rounded-md border-green-600 hover:bg-green-50">
            #비즈니스_영어
          </button>
          <button className="text-sm text-green-600 text-sm p-1 mr-2 rounded-md border-green-600 hover:bg-green-50">
            #영화_명대사
          </button>
          <button className="text-sm text-green-600 text-sm p-1 mr-2 rounded-md border-green-600 hover:bg-green-50">
            #노래_한곡_외우기
          </button>
        </div>
      </div>
    </Navgation>
  );
};

export default FilterNavigation;

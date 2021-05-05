import styled from "styled-components";
const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
`;
const FilterNavigation = () => {
  return (
    <Navgation className="flex mb-2">
      <div className="w-full pb-3">
        <div className="inline-block mr-2 mt-2">
          <button className="text-sm mr-2 font-semibold">난이도</button>
          <SmallButtonSeconday text="#아주_쉬워요" active />
          <SmallButtonSeconday text="#조금_쉬워요" />
          <SmallButtonSeconday text="#중간_난이도" />
          <SmallButtonSeconday text="#약간_어려워요" />
          <SmallButtonSeconday text="#매우_어려워요" />
          <SmallButtonSeconday text="#초고수" />
        </div>
        <br />
        <div className="inline-block mr-2 mt-2">
          <button className="text-sm mr-2">테마</button>
          <SmallButton text="#친구_만들기" />
          <SmallButton text="#비즈니스_영어" />
          <SmallButton text="#영화_명대사" />
        </div>
      </div>
    </Navgation>
  );
};
const SmallButtonSeconday = ({
  text,
  active,
}: {
  text: string;
  active?: boolean;
}) => (
  <button className=" font-semibol text-sm text-secondary-600 p-1 mr-2 rounded-md hover:bg-secondary-300 ">
    {text}
  </button>
);

const SmallButton = ({ text }: { text: string }) => (
  <button className=" font-semibol text-sm text-primary-600 p-1 mr-2 rounded-md hover:bg-primary-300">
    {text}
  </button>
);

export default FilterNavigation;

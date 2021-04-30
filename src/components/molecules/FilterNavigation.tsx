import styled from "styled-components";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "utils/Path";
const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
`;

const FilterNavigation = ({ id }: { id: number }) => {
  return (
    <Navgation className="flex">
      <a href="#" onClick={() => generateRandomPath(id)}>
        랜덤
      </a>
      <a href="#" onClick={() => alert("aa")}>
        테마
      </a>
      <a href="#" onClick={() => alert("aa")}>
        레벨
      </a>
      <a href="#" onClick={() => alert("aa")}>
        형식
      </a>
    </Navgation>
  );
};

export default FilterNavigation;

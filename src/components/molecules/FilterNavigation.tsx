import styled from "styled-components";
const Navgation = styled.ul`
  li {
    width: 100px;
  }
`;

const FilterNavigation = () => {
  return (
    <Navgation className="flex">
      <li>랜덤</li>
      <li>테마</li>
      <li>레벨</li>
      <li>형식</li>
    </Navgation>
  );
};

export default FilterNavigation;

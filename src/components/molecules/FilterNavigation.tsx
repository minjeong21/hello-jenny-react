import IWriting from "interface/IWriting";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
`;

interface Props {}
const FilterNavigation = () => {
  return (
    <Navgation className="flex">
      <div className="w-full pb-3">
        <div className="inline-block mr-2 mt-2">
          <button className="focus:outline-none text-blue-600 text-sm py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-50">
            모든형식
          </button>
        </div>
        <div className="inline-block mr-2 mt-2">
          <button className="focus:outline-none text-gray-600 text-sm py-2 px-4 rounded-md border border-gray-600 hover:bg-gray-50">
            제니모드
          </button>
        </div>
        <div className="inline-block mr-2 mt-2">
          <button className="focus:outline-none text-green-600 text-sm py-2 px-4 rounded-md border border-green-600 hover:bg-green-50">
            모든테마
          </button>
        </div>
      </div>
    </Navgation>
  );
};

export default FilterNavigation;

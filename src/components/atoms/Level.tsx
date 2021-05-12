import { LEVEL_MENU } from "properties/Menu";

interface IProps {
  levelNumber: number;
}
const Level = ({ levelNumber }: IProps) => {
  const level = LEVEL_MENU.find((item) => Number(item.value) === levelNumber);

  return (
    <div className="pb-l">
      <div className="text">{level?.text}</div>
    </div>
  );
};

export default Level;

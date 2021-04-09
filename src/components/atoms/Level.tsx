import styled from "styled-components";
const Container = styled.div<{ fontColor: string; bgColor: string }>`
  background: ${(props) => props.bgColor};
  border: 0.5px solid ${(props) => props.fontColor};
  box-sizing: border-box;
  border-radius: 50px;
  width: 45px;
  text-align: center;
  .text {
    font-weight: bold;
    font-size: 12px;
    align-items: center;
    letter-spacing: -0.03em;
    color: ${(props) => props.fontColor};
  }
`;

interface IProps {
  levelNumber?: number;
}

const getColors = (level: number) => {
  let fontColor = "#999999";
  let bgColor = "#F4F4F4";
  switch (level) {
    case 1:
      fontColor = "#FFC83A";
      bgColor = "rgba(255, 209, 91, 0.2);";
      break;
    case 2:
      fontColor = "#00C2FF";
      bgColor = "rgba(0, 194, 255, 0.2)";
      break;
    case 3:
      fontColor = "#FF6969";
      bgColor = "rgba(255, 105, 105, 0.2)";
      break;
    case 4:
      fontColor = "#69FF81";
      bgColor = "rgba(105, 255, 120, 0.2)";
      break;
    default:
      fontColor = "#9969FF";
      bgColor = "rgba(162, 105, 255, 0.2)";
      break;
  }
  return { fontColor, bgColor };
};

const Level = ({ levelNumber }: IProps) => {
  const level = levelNumber ? Number(levelNumber) : 1;
  const { fontColor, bgColor } = getColors(level);

  return (
    <div className=" font-body weigth-400 font-gray-2 pb-l">
      <Container fontColor={fontColor} bgColor={bgColor}>
        <div className="text">{`LV. ${level}`}</div>
      </Container>
    </div>
  );
};

export default Level;

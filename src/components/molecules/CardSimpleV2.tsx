import IWriting from "../../interface/IWriting";
import { getEllipsis } from "../../utils/ManagerSentence";
import Level from "../atoms/Level";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
const Container = styled.div`
  flex: 1;
  cursor: pointer;
  .move-button {
    width: 100%;
    box-sizing: border-box;
    background: #f4f4f4;
    border-radius: 6px;
    letter-spacing: -0.03em;
    color: #999999;
    line-height: 17px;
    padding: 8px;
  }
`;

const WritingImage = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  border-radius: 6px;
  opacity: 0.9;
  background-size: cover;
  background-position: center;
  width: 100%;
  box-sizing: border-box;
  height: 260px;
`;

interface IProps {
  writing: IWriting;
  index: number;
  id: number;
  moveWriting: (value: number) => void;
}

const CardSimpleV2 = ({ writing, index, id, moveWriting }: IProps) => {
  return (
    <Container onClick={() => moveWriting(id)}>
      <div className="pad-m">
        <div className="pb-xs">
          {writing.image_url ? (
            <WritingImage className="image" src={writing.image_url} />
          ) : null}
        </div>

        <div className="flex justify-between pb-xs font-small">
          <MainTheme themes={writing.themes} />
          <Level levelNumber={writing.level} />
        </div>

        <div>
          <div className="font-body font-bold pb-l ellipsis">
            {getEllipsis(writing.kr_text, 60)}
          </div>
        </div>
        <div className="move-button font-small pointer">
          <span className="font-primary">|</span> 영작하기
        </div>
      </div>
    </Container>
  );
};

export default CardSimpleV2;

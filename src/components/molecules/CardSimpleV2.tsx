import WritingManager from "../../utils/WritingManager";
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
  writingManager: WritingManager;
  index: number;
  id: number;
  moveWriting: (value: number) => void;
}

const CardSimpleV2 = ({ writingManager, index, id, moveWriting }: IProps) => {
  const writing = writingManager.getWriting();
  return (
    <Container onClick={() => moveWriting(id)}>
      <div className="p-3">
        <div className="pb-2">
          {writing.image_url ? (
            <WritingImage className="image" src={writing.image_url} />
          ) : null}
        </div>

        <div className="flex justify-between pt-1 pb-2 text-sm text-gray-500">
          <MainTheme themes={writing.themes} />
          <Level levelNumber={writing.level} />
        </div>

        <div>
          <div className="font-bold pb-8 ellipsis text-xl">
            {writingManager.getEllipsis()}
          </div>
        </div>
        <div className="text-sm pointer text-gray-400 bg-gray-100 py-2.5 px-3 rounded-lg">
          <span className="text-pink-500">|</span> 영작하기
        </div>
      </div>
    </Container>
  );
};

export default CardSimpleV2;

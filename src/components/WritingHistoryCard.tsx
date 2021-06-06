import PathManager from "utils/PathManager";
import styled from "styled-components";
import HeartIcon from "./icons/HeartIcon";
interface IProps {
  id: number;
  imageUrl: string;
  level: number;
  themes: { display_name: string }[];
  korSentence: string;
  pathManager: PathManager;
  onClickHeart: (e: any, wrtingId: number) => void;
}

const Container = styled.article``;
const WritingHistoryCard = ({
  id,
  imageUrl,
  level,
  themes,
  korSentence,
  pathManager,
  onClickHeart,
}: IProps) => {
  const targetThemes = themes.length > 2 ? themes.splice(0, 2) : themes;

  return (
    <Container className="sm:p-0 h-fill mb-1 cursor-pointer bg-white shadow-custom rounded">
      <div className="sm:p-3 p-2 rounded-lg sm:block flex relative">
        <div className="bg-gray-100 sm:w-full sm:h-24 w-20 relative">
          <div className="absolute w-full h-full flex justify-between">
            <div
              className="flex flex-1"
              onClick={(e) => pathManager.goNextWriting(e, id)}
            />
            <div
              className="text-primary-600 px-1"
              onClick={(e) => onClickHeart(e, id)}
            >
              <HeartIcon />
            </div>
          </div>
          <div
            className="w-full h-full bg-cover bg-center rounded-t"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <div
          className="flex-1 sm:pt-2 pb-1 sm:pl-0 pl-2 "
          onClick={(e) => pathManager.goNextWriting(e, id)}
        >
          {/* 레벨/테마 */}
          <div className="text-sm">
            <div className="flex justify-between gap-1">
              <div className="flex gap-1">
                {targetThemes.map((theme, index) => (
                  <div
                    key={index}
                    className=" text-xs p-1 text-gray-700 rounded"
                  >
                    {theme.display_name}
                  </div>
                ))}
              </div>
              <div className="text-xs py-1 px-2 text-gray-700  bg-primary-200 rounded">
                <div>Lv.{level}</div>
              </div>
            </div>
          </div>
          <div className="block mt-2 text-sm text-gray-900 font-bold">
            {korSentence}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default WritingHistoryCard;

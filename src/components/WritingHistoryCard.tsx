import PathManager from "utils/PathManager";
import HeartIcon from "./icons/HeartIcon";
import IWriting from "interface/IWriting";
import styled from "styled-components";
import { useStores } from "states/Context";
const Container = styled.article`
  .heart {
    color: var(--color-gray-300);
  }
  .heart.active {
    color: var(--color-primary-600);
  }
`;

interface IProps {
  writing: IWriting;
  pathManager: PathManager;
  onClickHeart: (e: any, wrtingId: number) => void;
  isBookmarkSection: boolean;
}

const WritingHistoryCard = ({
  pathManager,
  writing,
  onClickHeart,
  isBookmarkSection,
}: IProps) => {
  const { userActivityStore } = useStores();
  const targetThemes =
    writing.themes.length > 2 ? writing.themes.splice(0, 2) : writing.themes;
  let hasBookmark = true;
  if (!isBookmarkSection) {
    hasBookmark = userActivityStore.hasBookmark(writing.id);
  }
  return (
    <Container className="sm:p-0 h-fill mb-1 cursor-pointer bg-white shadow-custom rounded">
      <div className="sm:p-3 p-2 rounded-lg sm:block flex relative">
        <div className="bg-gray-100 sm:w-full sm:h-24 w-20 relative">
          <div className="absolute w-full h-full flex justify-between">
            {!isBookmarkSection && (
              <div className="text-right">
                <div className="text-xs bg-white bg-opacity-70 px-1 rounded-sm">
                  2021.04.05
                </div>
              </div>
            )}
            <div
              className="flex flex-1"
              onClick={(e) => pathManager.goNextWriting(writing.id)}
            />
            {isBookmarkSection ? (
              <div
                className={"px-1 text-primary-600"}
                onClick={(e) => onClickHeart(e, writing.id)}
              >
                <HeartIcon />
              </div>
            ) : (
              <div
                className={`heart px-1 ${hasBookmark ? "active" : ""}`}
                onClick={(e) => onClickHeart(e, writing.id)}
                data-id={writing.id}
              >
                <HeartIcon />
              </div>
            )}
          </div>
          <div
            className="w-full h-full bg-cover bg-center rounded-t"
            style={{ backgroundImage: `url(${writing.image_url})` }}
          />
        </div>
        <div
          className="flex-1 sm:pt-2 pb-1 sm:pl-0 pl-2 "
          onClick={() => pathManager.goNextWriting(writing.id)}
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
                <div>Lv.{writing.level}</div>
              </div>
            </div>
          </div>
          <div className="block mt-2 text-sm text-gray-900 font-bold">
            {writing.kr_sentence}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default WritingHistoryCard;

import { Box, Image } from "grommet";
const HeaderSection = ({ viewSize }: { viewSize: string }) => {
  const mainText = `따끈따끈~ 오늘의 문장이 도착했어요!\n같이 한번 풀어볼까요?? `;
  const subText = "문제를 모두 맞춘다면, 기분 좋은 하루가 될꺼에요!!";
  return (
    <Box background="#faf8f8">
      <header>
        <div
          className={` pt-l margin-center ${
            viewSize === "small" ? "flex-column" : "flex"
          }`}
        >
          {viewSize === "small" ? (
            <>
              <div className="flex-1 text-center">
                <Image src="/assets/header-rabit-bottom.png" width="200px" />
              </div>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
            </>
          ) : (
            <>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
              <div className="flex-1">
                <Image src="/assets/header-rabit3.png" width="300px" />
              </div>
            </>
          )}
          {/* Text */}
        </div>
      </header>
    </Box>
  );
};
export default HeaderSection;

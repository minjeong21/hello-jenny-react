import { Box, Image } from "grommet";
const HeaderSection = ({ viewSize }: { viewSize: string }) => {
  const mainText = `Hello, I’m Jenny!\n나랑 친구가 되어줄래?`;
  const subText =
    "나랑 친구가 되면, 네가 영어로 글을 쓸 수 있게 만들어줄께 !! \n어려울것 같아? 걱정마!\n내 힌트는 너를 영어 천재로 만들어 줄거야! ";
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
              <div className="flex-2 flex flex-column justify-center pad-m ">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
            </>
          ) : (
            <>
              {/* 이미지 */}
              <div className="flex-1">
                <Image src="/assets/header-rabit.png" width="300px" />
              </div>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="bg-lightpink radius-10 pad-l">
                  <div className="pre-line font-large font pb-xs">
                    {mainText}
                  </div>
                  <div className="font-small font-gray-3 pre-line">
                    {subText}
                  </div>
                </div>
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

const HeaderSection = ({ viewSize }: { viewSize: string }) => {
  const mainText = `나랑 영어공부 할래? 내가 도와줄께!!`;
  const subText =
    "나는 힌트 왕이거든! \n내 힌트는 너를 영어 천재로 만들어 줄거야! ";
  return (
    <div>
      <header>
        <div
          className={` pt-l margin-center ${
            viewSize === "small" ? "flex-column" : "flex"
          }`}
        >
          {viewSize === "small" ? (
            <>
              <div className="flex-1 text-center">
                <img src="/assets/header-rabit-bottom.png" width="200px" />
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
                <img src="/assets/header-rabit.png" width="300px" />
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
    </div>
  );
};
export default HeaderSection;

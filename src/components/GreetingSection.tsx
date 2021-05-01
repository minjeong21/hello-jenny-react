import { HOME_GREETING_DESC, HOME_GREETING_HEADING } from "properties/Text";
import useWindowSize from "utils/useWindowSize";

const GreetingSection = () => {
  const { width } = useWindowSize();

  return (
    <div>
      <div
        className={` pt-l margin-center ${width > 680 ? "flex" : "flex-col"}`}
      >
        <div className="flex-1">
          <img src="/assets/header-rabit.png" width="300px" />
        </div>
        <div className="flex-2 flex flex-column justify-center pad-m">
          <div className="bg-lightpink radius-10 pad-l">
            <div className="pre-line font-large font pb-xs">
              {HOME_GREETING_HEADING}
            </div>
            <div className="font-small font-gray-3 pre-line">
              {HOME_GREETING_DESC}
            </div>
          </div>
        </div>
        {/* 이미지 */}
      </div>
    </div>
  );
};
export default GreetingSection;

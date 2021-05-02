import { HOME_GREETING_DESC, HOME_GREETING_HEADING } from "properties/Text";
import useWindowSize from "utils/useWindowSize";

const GreetingSection = () => {
  const { width } = useWindowSize();

  return (
    <div>
      <div className=" justify-center  md:flex pt-10">
        <div className="flex-shrink-0">
          <img src="/assets/header-rabit.png" width="250px" />
        </div>

        <div className="bg-pink-100 fit-h p-6 rounded-lg  shadow-lg self-center">
          <h4 className="text-3xl text-gray-900 leading-tight whitespace-pre-line pb-3 font-semibold">
            {HOME_GREETING_HEADING}
          </h4>
          <p className="text-base text-gray-600 leading-normal whitespace-pre-line">
            {HOME_GREETING_DESC}
          </p>
        </div>
      </div>
    </div>
  );
};
export default GreetingSection;

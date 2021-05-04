import { HOME_GREETING_DESC, HOME_GREETING_HEADING } from "properties/Text";

const GreetingSection = () => {
  return (
    <div className="bg-main">
      <div className=" justify-center  md:flex pt-10">
        <div className="flex-shrink-0">
          <img src="/assets/quokka.png" width="300px" alt="quokka character" />
        </div>

        <div className="bg-green-100 fit-h p-6 rounded-lg  shadow-lg self-center">
          <h4 className="text-3xl text-gray-900 leading-tight whitespace-pre-line pb-3 font-semibold font-quite">
            {HOME_GREETING_HEADING}
          </h4>
          <p className="text-base text-gray-600 leading-normal whitespace-pre-line font-quite">
            {HOME_GREETING_DESC}
          </p>
        </div>
      </div>
    </div>
  );
};
export default GreetingSection;

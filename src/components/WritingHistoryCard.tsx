import WritingImage from "./atoms/WritingImage";
interface IProps {
  id: number;
  imageUrl: string;
  level: number;
  themes: { display_name: string }[];
  korSentence: string;
}

const WritingHistoryCard = ({
  id,
  imageUrl,
  level,
  themes,
  korSentence,
}: IProps) => {
  return (
    <article className="sm:p-0 h-fill mb-1">
      <div className="bg-white p-2 rounded-lg shadow-custom">
        <div className="bg-gray-100 w-full sm:h-24 h-0 ">
          <WritingImage imageUrl={imageUrl} size={null} />
        </div>
        <div className="py-2">
          {/* 레벨/테마 */}
          <div className={`text-sm`}>
            <div className="flex justify-between gap-1">
              <div className="flex gap-1">
                {themes.map((theme, index) => (
                  <div key={index} className="text-xs p-1 text-gray-700">
                    {theme.display_name}
                  </div>
                ))}
              </div>
              <div className="text-xs p-1 text-gray-700  border rounded-2xl">
                <div>Lv.{level}</div>
              </div>
            </div>
          </div>
          <div className="block mt-1 text-sm text-gray-900 font-bold">
            {korSentence}
          </div>
        </div>
      </div>
    </article>
  );
};
export default WritingHistoryCard;

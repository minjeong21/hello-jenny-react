import WritingHistoryCard from "components/WritingHistoryCard";
import IWriting from "interface/IWriting";
import PathManager from "utils/PathManager";

const SectionSolvedWriting = ({
  writings,
  pathManager,
  goSolvedWritings,
  onClickHeart,
}: {
  writings: { writing: IWriting }[];
  pathManager: PathManager;
  goSolvedWritings: (e: any) => void;
  onClickHeart: (e: any, writingId: number) => void;
}) => {
  return (
    <section className="py-8">
      <button
        className="border rounded bg-white px-2 py-1 text-sm shadow-sm"
        onClick={goSolvedWritings}
      >
        ❤️&nbsp; 영작문 모아풀기
      </button>

      <div className="sm:grid grid-cols-3 gap-x-2 gap-y-3 py-2">
        {writings.map((solvedWriting) => {
          return (
            <WritingHistoryCard
              writing={solvedWriting.writing}
              key={solvedWriting.writing.id}
              pathManager={pathManager}
              onClickHeart={onClickHeart}
              isBookmarkSection={false}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionSolvedWriting;

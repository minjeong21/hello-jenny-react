import WritingHistoryCard from "components/WritingHistoryCard";
import IWriting from "interface/IWriting";
import PathManager from "utils/PathManager";

const SectionCorrectWriting = ({
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
          const writing: IWriting = solvedWriting.writing;
          return (
            <WritingHistoryCard
              id={writing.id}
              key={writing.id}
              imageUrl={writing.image_url}
              level={writing.level}
              themes={writing.themes}
              korSentence={writing.kr_sentence}
              pathManager={pathManager}
              onClickHeart={onClickHeart}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCorrectWriting;

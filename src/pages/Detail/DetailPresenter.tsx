import Footer from "../../components/organisms/Footer";
import TopNavigation from "../../components/organisms/TopNavigation";
import WritingBox from "components/WritingBox";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";

interface IProps {
  moveNextWriting: () => void;
  writingManager: WritingManager;
  fetcedWriting: boolean;
  writings: IWriting[];
}
const DetailPresenter = ({
  writingManager,
  writings,
  fetcedWriting,
  moveNextWriting,
}: IProps) => {
  console.log(writingManager);
  return (
    <div>
      {writingManager ? (
        <main>
          <section id="section-1" className={`max-width margin-center`}>
            <WritingBox
              viewSize={"large"}
              writings={writings}
              writingManager={writingManager}
              moveNextWriting={moveNextWriting}
            />
          </section>
          )
          {/* <Box margin="medium" />
          {visibleAnswer || isCorrect ? (
            <DescriptionSection
              isCorrect={isCorrect}
              visibleAnswer={visibleAnswer}
              writing={writing}
            />
          ) : null} */}
        </main>
      ) : (
        <>
          {fetcedWriting ? (
            <div>
              <h3>
                문장이 사라졌어요..
                <br />
                (어디갔을까...😭)
                <button onClick={moveNextWriting}>다른 문제 풀어보기</button>
              </h3>
            </div>
          ) : (
            <div>
              <h3>문장 불러오는 중...</h3>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default DetailPresenter;

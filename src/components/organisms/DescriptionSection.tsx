import IWriting from "../../interface/IWriting";
interface IProps {
  isCorrect: boolean;
  visibleAnswer: boolean;
  writing: IWriting;
}
const DescriptionSection = ({ isCorrect, visibleAnswer, writing }: IProps) => {
  return (
    <section id="section-2">
      <div>
        <article>
          {isCorrect || visibleAnswer ? (
            <>
              <div className="flex">
                {isCorrect ? (
                  <div>
                    {/* 또 다른 표현 */}
                    {writing.alter_sentences.length > 0 ? (
                      <div>
                        <div>
                          <span>⭐️&nbsp;&nbsp;또 다르게 표현할 수 있어요</span>
                        </div>
                        {writing.alter_sentences.map((item, index) => {
                          return (
                            <div key={index}>
                              <span>{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    {/* 또 다른 표현 */}
                    <div>
                      <div>
                        <span>
                          ⭐️&nbsp;&nbsp;정답! 이렇게 표현할 수 있어요.
                        </span>
                      </div>
                      <div>
                        <span>{writing.en_sentence}</span>
                      </div>
                      );
                      {writing.alter_sentences.length > 0 && (
                        <>
                          {writing.alter_sentences.map((item, index) => (
                            <div key={index}>
                              <span>{item}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 문제 해설 */}
                {/* <div>
                  {writing.hin ? (
                    <div>
                      {writing.related_descriptions.map((item) => (
                        <div>
                          <div pad={{ bottom: "small" }}>
                            <span weight="bold">
                              📗&nbsp;&nbsp;{item.title}
                            </span>
                          </div>
                          <div pad={{ left: "7px", bottom: "7px" }}>
                            <span style={{ whiteSpace: "pre-line" }}>
                              {item.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div> */}
              </div>
            </>
          ) : null}
        </article>
      </div>
    </section>
  );
};

export default DescriptionSection;

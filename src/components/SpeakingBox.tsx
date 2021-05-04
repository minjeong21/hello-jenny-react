import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import Level from "components/atoms/Level";
import IWriting from "interface/IWriting";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }

  #explain-section {
    max-height: 200px;
    scrollbar-color: yellow;
    overflow-y: auto;
    margin-bottom: 10px;
  }
`;

const StartButton = styled.button`
  border-radius: 40px;
`;

const NextButton = styled.button`
  border-radius: 40px;
`;
const ProblemContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const KorSentenceContainer = styled.div`
  color: gray;
  font-size: 16px;
  width: 33%;
`;

const EngSentenceContainer = styled.div`
  color: black;
  font-size: 16px;
  width: 33%;
`;

const ButtonCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`;

const CheckButton = styled.button`
  border-radius: 5px;
  background-color: #ff005b;
  color: white;
  font-size: 15px;
  border: 0;
  outline: none;
  margin: 0 5px 0 5px;
  padding: 0 15px 0 15px;
`;

interface IProps {
  writing: IWriting;
  moveNextWriting: () => void;
}

const sentenceList = [
  {
    korean: "현주는 노는 것을 좋아한다.",
    english: "Hyunju likes playing.",
  },
  {
    korean: "현주는 공부를 싫어한다.",
    english: "Hyunju hates studying.",
  },
  {
    korean: "나는 친구를 찾으려고 하고 있어요.",
    english: "I am trying to find my friend.",
  },
  {
    korean: "나는 커피 마시길 원해",
    english: "I want to drink coffee.",
  },
  {
    korean: "나 이거 가져가고 싶어요.",
    english: "I want to take this.",
  },
];

const SpeakingBox = (props: IProps) => {
  const { writing } = props;

  const [infoSentence, setInfoSentence] = useState("화이팅");
  const [korSentence, setKorSentence] = useState(
    "5초씩 5개의 한글 문장이 주어질 거에요. 영어로 말해보세요 :)"
  );
  const [engSentence, setEngSentence] = useState("sdfsd");
  const [isStart, setIsStart] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [remainTime, setRemainTime] = useState(10);
  const [problemCount, setProblemCount] = useState(0);
  const [correctProblem, setCorrectProblem] = useState([
    true,
    true,
    true,
    false,
    false,
  ]);

  useEffect(() => {}, []);

  const startOnClick = () => {
    setIsStart(true);
    setInfoSentence("아래 문장을 영어로 말해보세요.");
    setKorSentence(sentenceList[0].korean);
    setEngSentence(sentenceList[0].english);
  };

  const nextOnClick = () => {
    setIsStart(true);
    var problemNum = problemCount;
    setProblemCount(problemNum + 1);
    if (problemNum < 4) {
      setKorSentence(sentenceList[problemNum + 1].korean);
      setEngSentence(sentenceList[problemNum + 1].english);
    }
  };

  // const CheckOnclick = (i: Number) => {
  //   console.log(i);
  // }

  const CheckOnclick = (i: number) => {
    // console.log(i);
    var correctList = correctProblem;
    correctList[i] = true;
    setCorrectProblem(correctList);
  };

  const CheckNoOnclick = (i: number) => {
    // console.log(i);
    var correctList = correctProblem;
    correctList[i] = false;
    setCorrectProblem(correctList);
  };

  // console.log(
  //   hintCount,
  //   writing.hints.length - 1,
  //   hintCount >= writing.hints.length - 1
  // );

  console.log(writing.themes);
  return (
    <Container>
      <section>
        {/* 왼쪽 이미지 */}
        {problemCount < 5 ? (
          <div className="pad-xs ">
            <article className="p-3 flex">
              <div className="">
                <WritingImage imageUrl={writing.image_url} size={null} />
              </div>
              {/* 설명 */}
              <div className="flex-1 pl-2">
                <div className="flex justify-between pb-4">
                  <MainTheme themes={writing.themes} />
                  <Level levelNumber={writing.level} />
                </div>

                {writing.situation && (
                  <div className="font-gray-200 py-1 text-sm">
                    {infoSentence}
                  </div>
                )}

                <div
                  className="text-lg font-bold text-gray-600"
                  style={{ wordBreak: "keep-all" }}
                >
                  {korSentence}
                </div>
                <div className="mr-1">
                  {isStart ? (
                    <div style={{ float: "right" }}>
                      <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={[
                          ["#004777", 0.33],
                          ["#F7B801", 0.33],
                          ["#A30000", 0.33],
                        ]}
                        size={60}
                      >
                        {/* {({ remainingTime }) => remainingTime} */}
                        {({ remainingTime }) => {
                          if (remainingTime) {
                            setRemainTime(remainingTime);
                            setIsNext(true);
                            if (remainingTime === 1) {
                              setTimeout(function () {
                                setRemainTime(10);
                                setIsStart(false);
                              }, 1000);
                            }
                            return remainingTime;
                          }
                        }}
                      </CountdownCircleTimer>
                      {/* <div>{remainTime}</div> */}
                    </div>
                  ) : (
                    <div>
                      {isNext ? (
                        <div>
                          <div
                            className="text-lg weigth-500 text-green-600 pb-3"
                            style={{
                              wordBreak: "keep-all",
                            }}
                          >
                            {engSentence}
                          </div>
                          <div className="flex justify-end">
                            <NextButton
                              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                              onClick={nextOnClick}
                            >
                              다음문제
                            </NextButton>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <StartButton
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={startOnClick}
                          >
                            시작하기
                          </StartButton>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className="w-full p-6 rounded">
            <div className="flex justify-between pb-3">
              <MainTheme themes={writing.themes} />
            </div>
            {sentenceList.map((item, index) => (
              <ProblemContainer>
                <KorSentenceContainer>{item.korean}</KorSentenceContainer>
                <EngSentenceContainer>{item.english}</EngSentenceContainer>
                <ButtonCheckContainer>
                  {correctProblem[index] ? (
                    <>
                      <CheckButton onClick={() => CheckOnclick(index)}>
                        맞았다!
                      </CheckButton>
                      <CheckButton
                        style={{ opacity: 0.5 }}
                        onClick={() => CheckNoOnclick(index)}
                      >
                        틀렸다!
                      </CheckButton>
                    </>
                  ) : (
                    <>
                      <CheckButton
                        style={{ opacity: 0.5 }}
                        onClick={() => CheckOnclick(index)}
                      >
                        맞았다!
                      </CheckButton>
                      <CheckButton onClick={() => CheckNoOnclick(index)}>
                        틀렸다!
                      </CheckButton>
                    </>
                  )}
                </ButtonCheckContainer>
              </ProblemContainer>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};

export default SpeakingBox;

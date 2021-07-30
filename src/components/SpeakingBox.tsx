import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import Speaking from "utils/Speaking";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import Level from "components/atoms/Level";
import IWriting from "interface/IWriting";
import ISpeaking from "interface/ISpeaking";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { getLevelName, getThemeName } from "properties/Filter";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SpeakingStore } from "states/SpeakingStore";
import { resolvePtr } from "dns";
// import * as googleTTS from 'google-tts-api'; //Typescript
// import ReactPlayer from 'react-player'

const Container = styled.div`
  height: 200px;
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
  height: 30px;
  background-color: #ff005b;
  color: white;
  font-size: 15px;
  border: 0;
  outline: none;
  margin: 0 5px 0 5px;
  padding: 0 15px 0 15px;
`;

const ProblemImage = styled.img`
  width: 200px;
  object-fit: cover;
  margin: 20px;
`;

interface IProps {
  // writing: IWriting;
  // moveNextWriting: (e: any) => void;
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

function problemNum(total: number) {
  let lotto: number[] = [];
  let i = 0;
  while (i < 5) {
    let n = Math.floor(Math.random() * total);
    if (!lotto.find((e) => e === n)) {
      lotto.push(n);
      i++;
    }
  }
  return lotto;
}

const useAudio = (url: string) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const SpeakingBox = observer((props: IProps) => {
  // const { writing } = props;
  const welcomeSentence = "5초씩 5개의 한글 문장이 주어질 거에요. 영어로 말해보세요 :)"
  const [infoSentence, setInfoSentence] = useState("화이팅");
  const [korSentence, setKorSentence] = useState(
    welcomeSentence
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
  const [engAudioBase64, setEngAudioBase64] = useState("");

  // const { writingId, writing } = props;
  // const writing = Writing
  const [textInWriting, setTextInWriting] = useState("");
  const [isShowColorHelp, setIsShowColorHelp] = useState(false);
  const { dialogStore, speakingStore } = useStores();
  const [checkButtonClick, setCheckButtonClick] = useState(false);
  const [speaking, setSpeaking] = useState<ISpeaking[] | undefined>(undefined);

  // const [audioPlay, setAudioPlay] = useState(false);
  useEffect(() => {
    console.log(correctProblem);
  }, [checkButtonClick]);

  useEffect(() => {
    if (speakingStore.getSpeaking() != undefined) {
      speakingStore.getSpeaking().then((response) => {
        console.log(response.list);
        const randomNum = problemNum(response.list.length);
        console.log(randomNum);
        var tmpProblemList: ISpeaking[] = [];
        randomNum.map((num) => {
          tmpProblemList.push(response.list[num]);
        });
        setSpeaking(tmpProblemList);
      });
    }
  }, []);

  const startOnClick = () => {
    setIsStart(true);
    setInfoSentence("아래 문장을 영어로 말해보세요.");
    if (speaking) {
      setKorSentence(speaking[0].kr_sentence);
      setEngSentence(speaking[0].en_sentence);
    }
    // const result = googleTTS.getAllAudioBase64(engSentence, {
    //   lang:'en',
    //   slow: false,
    //   host: 'https://translate.google.com',
    //   timeout: 10000,
    //   splitPunct: ',.?',
    // })

    // console.log(result)
    // // setEngAudioBase64(result);
  };

  const nextOnClick = () => {
    setIsStart(true);
    var problemNum = problemCount;
    setProblemCount(problemNum + 1);
    if (problemNum < 4 && speaking) {
      setKorSentence(speaking[problemNum + 1].kr_sentence);
      setEngSentence(speaking[problemNum + 1].en_sentence);
    }
  };

  const CheckOnclick = (i: number) => {
    var correctList = correctProblem;
    correctList[i] = true;
    setCorrectProblem(correctList);
    setCheckButtonClick(!checkButtonClick);
  };

  const CheckNoOnclick = (i: number) => {
    // console.log(i);
    var correctList = correctProblem;
    correctList[i] = false;
    setCorrectProblem(correctList);
    setCheckButtonClick(!checkButtonClick);
    console.log(correctList);
  };

  // console.log(
  //   hintCount,
  //   writing.hints.length - 1,
  //   hintCount >= writing.hints.length - 1
  // );

  const ListenOnclick = (sentence: string) => {
    // const url = googleTTS.getAudioUrl(sentence, {
    //   lang: 'en',
    //   slow: false,
    //   host: 'https://translate.google.com',
    // });
    // console.log(url);
    // setAudioPlay(true)
    // const [audioPlay, toggle] = useAudio(url);
    // var audio = new Audio(url);
    // audio.play();
  };

  // console.log(writing.themes);

  return (
    <Container>
      <section>
        {/* 왼쪽 이미지 */}
        {problemCount < 5 && speaking ? (
          <div className="pad-xs " style={{backgroundColor:"transparent"}}>
            <article style={{ height: "180px"}} className="p-3 flex">
              <div className="">
                {/* <WritingImage imageUrl={writing.image_url} size={null} /> */}
              </div>
              {/* 설명 */}
              <div
                style={{
                  display: "flex",
                  flexWrap:"nowrap",
                  // justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {korSentence == welcomeSentence ? (
                  <></>
                ) : (
                  <ProblemImage src={speaking[problemCount].image_url} />
                )}
                <div className="flex-1 pl-2">
                  <div className="flex justify-between pb-4">
                    {/* <MainTheme themes={writing.themes} /> */}
                    {/* <Level levelNumber={writing.level} /> */}
                  </div>

                  {/* {writing.situation && (
                  <div className="font-gray-200 py-1 text-sm">
                    {infoSentence}
                  </div>
                )} */}

                  <div>
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
                                {/* <button onClick={() => ListenOnclick(engSentence)}>{audioPlay ? "Pause" : "Play"}</button> */}
                                {/* <button onClick={()=>toggle}>{audioPlay ? "Pause" : "Play"}</button> */}
                                {/* <Player sentence={engSentence}/> */}
                                {/* <button onClick={() => ListenOnclick(engSentence)}>듣기</button> */}
                                <audio
                                  autoPlay
                                  controls
                                  src={`data:audio/ogg;base64,${speaking[problemCount].audio}`}
                                >
                                  Your browser does not support the audio tag.
                                </audio>
                                {/* <ReactPlayer url={'https://translate.google.com/translate_tts?ie=UTF-8&q=Hyunju%20likes%20playing.&tl=en&total=1&idx=0&textlen=21&client=tw-ob&prev=input&ttsspeed=1'} config={{file:{forceAudio:true}}}/> */}
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
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className="w-full p-6 rounded">
            <div className="flex justify-between pb-3">
              {/* <MainTheme themes={writing.themes} /> */}
            </div>
            {speaking ? (
              <>
                {speaking.map((item, index) => (
                  <ProblemContainer key={index}>
                    <KorSentenceContainer>
                      {item.kr_sentence}
                    </KorSentenceContainer>
                    <EngSentenceContainer>
                      {item.en_sentence}
                    </EngSentenceContainer>
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
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </section>
    </Container>
  );
});

export default SpeakingBox;

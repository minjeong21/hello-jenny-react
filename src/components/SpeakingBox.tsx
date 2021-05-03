import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import { compareAnswer, getMatchedWordPercent } from "utils/ManagerSentence";
import Level from "components/atoms/Level";
import IWriting from "interface/IWriting";
import WritingForm from "components/WritingForm";
import {
  DialogHint,
  DialogJenny,
  DialogAnswer,
  DialogCorrect,
  DialogWrong,
} from "components/Dialog";
import DialogButtons from "components/DialogButtons";
import { start } from "node:repl";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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
`

const NextButton = styled.button`
  border-radius: 40px;
`
const ProblemContainer =  styled.div`
  display:flex;
  width: 100%;
  margin-bottom: 20px;
`

const KorSentenceContainer = styled.div`
  color: gray;
  font-size: 16px;
  width: 33%;
`

const EngSentenceContainer = styled.div`
  color: black;
  font-size: 16px;
  width: 33%;
`

const ButtonCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`

const CheckButton = styled.button`
  border-radius: 5px;
  background-color: #ff005b;
  color: white;
  font-size: 15px;
  border: 0;
  outline: none;
  margin: 0 5px 0 5px;
  padding: 0 15px 0 15px;
`

interface IProps {
  writing: IWriting;
  viewSize: string;
  moveNextWriting: () => void;
}

const sentenceList = [{
                      'korean' : '현주는 노는 것을 좋아한다.',
                      'english' : 'Hyunju likes playing.'
                      }, {
                        'korean' : '현주는 공부를 싫어한다.',
                        'english' : 'Hyunju hates studying.'
                      }, {
                      'korean' : '나는 친구를 찾으려고 하고 있어요.',
                      'english' : 'I am trying to find my friend.'
                      },{
                      'korean' : '나는 커피 마시길 원해',
                      'english' : 'I want to drink coffee.'
                      },{
                      'korean' : '나 이거 가져가고 싶어요.',
                      'english' : 'I want to take this.'
                      },]

const SpeakingBox = (props: IProps) => {
  const { writing } = props;
  const [dialogType, setDialogType] = useState("help");
  const [textInWrinting, setTextInWrinting] = useState("");
  const [userCentence, setUserCentence] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [dialogList, setDialogList] = useState<
    { type: string; element: JSX.Element }[]
  >([]);
  const [infoSentence, setInfoSentence] = useState('화이팅');
  const [korSentence, setKorSentence] = useState('5초씩 5개의 한글 문장이 주어질 거에요. 영어로 말해보세요 :)');
  const [engSentence, setEngSentence] = useState('sdfsd');
  const [isStart, setIsStart] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [remainTime, setRemainTime] = useState(10);
  const [problemCount, setProblemCount] = useState(0);
  const [correctProblem, setCorrectProblem] = useState([true, true, true, false, false])


  useEffect(() => {
    setTextInWrinting("");
    setUserCentence("");
  }, []);


  // async function timerReset() {
  //   var tempRemainTime = remainTime

  //   if(tempRemainTime == 1){
  //     tempRemainTime = 10
  //     await setRemainTime(10)
  //     console.log("안돼나여")
  //     console.log(remainTime)
  //   }
  // }

  // timerReset();
  

  const onClickHelpJenny = () => {
    setDialogType("help");
    appendDialog("open", <DialogJenny />);
  };

  const onClickShowAnswer = () => {
    setUserCentence(textInWrinting);
    const Dialog = (
      <DialogAnswer userCentence={userCentence} answer={writing.en_sentence} />
    );

    setDialogType("answer");
    appendDialog("answer", Dialog);
  };
  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();
    let Dialog = null;

    const result = compareAnswer(writing.alter_sentences, textInWrinting);
    console.log(textInWrinting);
    console.log(result);

    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");

      setDialogType("correct");
      Dialog = (
        <DialogCorrect writing={writing} userCentence={textInWrinting} />
      );
    } else {
      // 정답 틀렸을 때
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
      setDialogType("wrong");
      Dialog = <DialogWrong writing={writing} userCentence={textInWrinting} />;
    }
    appendDialog("hint", Dialog);
  };

  const appendDialog = (type: string, element: JSX.Element) => {
    setDialogList((prev) => [...prev, { type, element }]);
    setTimeout(() => {
      var dialogSection = document.getElementById("explain-section");
      console.log(dialogSection);

      if (dialogSection) {
        dialogSection.scrollTop = dialogSection.scrollHeight;
      }
    }, 500);
  };

  const startOnClick = () => {
    setIsStart(true);
    setInfoSentence('아래 문장을 영어로 말해보세요.');
    setKorSentence(sentenceList[0].korean);
    setEngSentence(sentenceList[0].english);
  }

  const nextOnClick = () => {
    setIsStart(true);
    var problemNum = problemCount
    setProblemCount(problemNum+1);
    if(problemNum < 4){
      setKorSentence(sentenceList[problemNum+1].korean)
      setEngSentence(sentenceList[problemNum+1].english)
    }
  }


  // const CheckOnclick = (i: Number) => {
  //   console.log(i);
  // }

  const CheckOnclick = (i: number) => {
    // console.log(i);
    var correctList = correctProblem
    correctList[i] = true
    setCorrectProblem(correctList)
  }

  const CheckNoOnclick = (i: number) => {
    // console.log(i);
    var correctList = correctProblem
    correctList[i] = false
    setCorrectProblem(correctList)
  }


  const onClickShowHint = () => {
    let talkText = "";

    setHintCount(hintCount + 1);
    switch (hintCount) {
      case 0:
        talkText = "첫번째 힌트야";
        break;
      case 1:
        talkText = "두번째 힌트야";
        break;
      case 2:
        talkText = "마지막 힌트야";
    }
    const Dialog = (
      <DialogHint
        talkText={talkText}
        hint={writing.hints[hintCount].description}
      />
    );
    setDialogType("hint");
    appendDialog("hint", Dialog);
  };

  // console.log(
  //   hintCount,
  //   writing.hints.length - 1,
  //   hintCount >= writing.hints.length - 1
  // );

  return (
    <Container>
      <section
        className={`${
          props.viewSize === "small" ? "flex-column small-view" : "flex"
        }`}
      >
        {/* 왼쪽 이미지 */}
        { problemCount < 5 ? 
        <div className="pad-xs ">
          <div>
            <article className="pad-xs flex-1 solving-article">
              <div
                className={`${
                  props.viewSize === "small" ? "flex-column" : "flex"
                }`}
              >
                <div className="pad-m">
                  <WritingImage imageUrl={writing.image_url} size={null} />
                </div>
                {/* 설명 */}
                <div>
                  <div className="flex justify-between">
                    <MainTheme themes={writing.themes} />
                    <Level levelNumber={writing.level} />
                  </div>

                  {writing.situation && (
                    <div className="font-body weigth-400 font-gray-3 pb-xxs pt-xxs">
                      {/* {writing.situation} */}
                      {infoSentence}
                    </div>
                  )}

                  <div className="font-large weigth-700 font-gray-1 pb-m" style={{wordBreak:"keep-all"}}>
                    {/* {writing.kr_sentence} */}
                    {korSentence}
                  </div>
                  {/* writingform 있던 자리 */}
                  <div className="text-right pt-s mr-xs">
                    { isStart ?
                    // <StartButton className="btn-primary font-body weight-700">
                    //   10
                    // </StartButton> 
                    <div style={{float:"right"}}>
                      <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={[
                          ['#004777', 0.33],
                          ['#F7B801', 0.33],
                          ['#A30000', 0.33],
                        ]}
                        size={60}
                      >
                        {/* {({ remainingTime }) => remainingTime} */}
                        {({ remainingTime }) => { 
                          if(remainingTime){
                            setRemainTime(remainingTime); 
                            setIsNext(true);
                            if(remainingTime == 1){
                              setTimeout(function() {setRemainTime(10); setIsStart(false)}, 1000);
                            }
                            return remainingTime 
                          }
                          
                          }}
                      </CountdownCircleTimer>
                      {/* <div>{remainTime}</div> */}
                    </div>
                    :
                    <div> 
                      { isNext ? 
                      <div>
                        <div className="font-large weigth-500 font-gray-2 pb-m" style={{wordBreak:"keep-all", marginTop:"-30px"}}>
                          {/* {writing.kr_sentence} */}
                          {engSentence}
                        </div>
                        <NextButton className="btn-primary font-body weight-700" onClick={nextOnClick}>다음문제</NextButton>
                      </div>
                      :<StartButton className="btn-primary font-body weight-700" onClick={startOnClick}>
                      시작하기
                    </StartButton>}
                    </div> 
                    
                    }
                  </div>
                </div>
              </div>
            </article>
            <section id="explain-section">
              <div>
                {dialogList.map((dialog, index) => (
                  <div key={index}>{dialog.element}</div>
                ))}
              </div>
            </section>
            <section>
              {dialogList.length > 0 && (
                <DialogButtons
                  type={dialogType}
                  isLastHint={hintCount >= writing.hints.length - 1}
                  onShowHint={onClickShowHint}
                  showAnswer={onClickShowAnswer}
                  moveNextWriting={props.moveNextWriting}
                />
              )}
            </section>
          </div>
        </div>    
:
          <div style={{width: "100%"}}> 
             <div className="flex justify-between">
                <MainTheme themes={writing.themes} />
              </div>
              {sentenceList.map((item, index) => (
              <ProblemContainer>
                <KorSentenceContainer>{item.korean}</KorSentenceContainer>
                <EngSentenceContainer>{item.english}</EngSentenceContainer>
                <ButtonCheckContainer>
                  { correctProblem[index] ? 
                  <>
                    <CheckButton onClick={()=>CheckOnclick(index)}>맞았다!</CheckButton>
                    <CheckButton style={{opacity: 0.5}} onClick={()=>CheckNoOnclick(index)}>틀렸다!</CheckButton>
                  </>
                :
                <>
                  <CheckButton style={{opacity: 0.5}} onClick={()=>CheckOnclick(index)}>맞았다!</CheckButton>
                  <CheckButton onClick={()=>CheckNoOnclick(index)}>틀렸다!</CheckButton>
                </>}
                </ButtonCheckContainer>
              </ProblemContainer>
              ))}
          </div>
}
      </section>
    </Container>
  );
};

export default SpeakingBox;

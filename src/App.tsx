import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [korean, setKorean] = useState("");
  const [english, setEnglish] = useState("");
  const [tryAnswer, setTryAnswer] = useState("");
  const [visibleTryAnswer, setVisibleTryAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);

  useEffect(
    () => {
      setKorean("넥타이를 멘 소녀.");
      setEnglish("A girl with a tie.");
    }

    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((users) => {
    //     setUsers(users)
    //     setLoading(false)
    //   })
  );

  const compareAnswer = () => {
    if (english.toLowerCase() == tryAnswer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setVisibleTryAnswer(true)
    setVisibleIsCorrect(true);
  };

  if (korean && english) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Koo's 영작 연습소 </h1>
          <div className="flex">
            <div>한글: </div> <div>{korean}</div>
          </div>

          <div className="flex font-gray">
            <div> 영어: </div>
            <input
              name="english_sentence"
              id="english_input"
              onChange={(e) => setTryAnswer(e.target.value)}
            />
          </div>
          <div className="flex">
            <button
              className="btn-white"
              onClick={compareAnswer}
            >
              맞추기
            </button>
            <button onClick={() => setVisibleTryAnswer(!visibleTryAnswer)} className="btn-white">
              답보기
            </button>
          </div>
          {visibleTryAnswer ? <div>{tryAnswer}</div> : null}

          {visibleIsCorrect ? (
            <div>
              {isCorrect ? <>맞았습니다!! 👏</> : <div>틀렸어요 😹</div>}
            </div>
          ) : null}
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">문장 불러오는 중...</header>
      </div>
    );
  }
}

export default App;

import {
  convertPlainText,
  getUnMatchedWordCount,
  getMatchedWordPercent,
  compareAnswer,
} from "./utils/WritingManager";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe("convertPlainText", () => {
  test("모두 소문자로 바꾸기", () => {
    const input = "A man with a tie";
    const result = convertPlainText(input);
    expect("a man with a tie").toEqual(result);
  });

  test("점 빼기", () => {
    const input = "a man with a tie.";
    const result = convertPlainText(input);
    expect("a man with a tie").toEqual(result);
  });

  test("I'm -> I am으로 바꾸기", () => {
    const input = "I'm a man with a tie.";
    const result = convertPlainText(input);
    expect("i am a man with a tie").toEqual(result);
  });
});

describe("getUnMatchedWordCount", () => {
  test("안 맞는 단어 갯수 0개 ", () => {
    const correctSentence = convertPlainText("A man with a tie.");
    const trySentence = convertPlainText("a man with a tie");
    const wordCount = getUnMatchedWordCount(correctSentence, trySentence);

    expect(wordCount).toEqual(0);
  });

  test("안 맞는 단어 갯수 3개 ", () => {
    const correctSentence = convertPlainText("A man with a tie.");
    const trySentence = convertPlainText("woman with by neck tie who.");
    const wordCount = getUnMatchedWordCount(correctSentence, trySentence);

    expect(wordCount).toEqual(3);
  });

  describe("getMatchedWordPercent", () => {});
  test("30% 맞음.", () => {
    // 10단어 중 3 단어 맞음.
    const correctSentence = convertPlainText(
      "I have a paper but i need even more paper."
    );

    const trySentence = convertPlainText("I need a color tie who.");
    const percent = getMatchedWordPercent(correctSentence, trySentence);

    expect(`${percent}%`).toEqual(`30%`);
  });
});

describe("compareAnswer", () => {
  test("여러 문장 중 첫번째에 정답이 있다", () => {
    const userTryText = "I am a good father";
    const englishTextx = [
      "I'm a good Father.",
      "good father.",
      "I am a good fa.",
    ];
    const result = {
      isCorrect: true,
      correctText: englishTextx[0],
      bestMatchedText: englishTextx[0],
    };
    expect(compareAnswer(englishTextx, userTryText)).toEqual(result);
  });
  test("여러 문장 중 두번째에 정답이 있다", () => {
    const userTryText = "Good Father";
    const englishTextx = [
      "I'm a good Father.",
      "good father.",
      "I am a good fa.",
    ];
    const result = {
      isCorrect: true,
      correctText: englishTextx[1],
      bestMatchedText: englishTextx[1],
    };
    expect(compareAnswer(englishTextx, userTryText)).toEqual(result);
  });

  test("여러 문장 중 정답이 없다.", () => {
    const userTryText = "Good Fathers";
    const englishTextx = [
      "I'm a good Father.",
      "good father.",
      "I am a good fa.",
    ];
    const result = {
      isCorrect: false,
      correctText: "",
      bestMatchedText: englishTextx[1],
    };
    expect(compareAnswer(englishTextx, userTryText)).toEqual(result);
  });
});

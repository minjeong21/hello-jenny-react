import {
  convertPlainText,
  unMatchedWordCount,
  matchedWordPercent,
} from "./ManagerSentence";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("convert Plain Text ", () => {
  const input = "A man with a tie.";
  const result = convertPlainText(input);
  expect("a man with a tie").toEqual(result);
});

test("unMatchedWordCount is 0 ", () => {
  const correctSentence = convertPlainText("A man with a tie.");
  const trySentence = convertPlainText("a man with a tie");
  const wordCount = unMatchedWordCount(correctSentence, trySentence);

  expect(wordCount).toEqual(0);
});

test("unMatchedWordCount is 3 ", () => {
  const correctSentence = convertPlainText("A man with a tie.");
  const trySentence = convertPlainText("woman with by neck tie who.");
  const wordCount = unMatchedWordCount(correctSentence, trySentence);

  expect(wordCount).toEqual(3);
});

test("matchedWordPercent is 30% ", () => {
  // 10단어 중 3 단어 맞음.
  const correctSentence = convertPlainText(
    "I have a paper but i need even more paper."
  );

  const trySentence = convertPlainText("I need a color tie who.");
  const percent = matchedWordPercent(correctSentence, trySentence);
  console.log(percent);

  expect(`${percent}%`).toEqual(`30%`);
});

import {
  convertPlainText,
  UnMatchedWordCount,
  UnMatchedWordPercent,
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
  const unMatchedWordCount = UnMatchedWordCount(correctSentence, trySentence);

  expect(unMatchedWordCount).toEqual(0);
});

test("unMatchedWordCount is 3 ", () => {
  const correctSentence = convertPlainText("A man with a tie.");
  const trySentence = convertPlainText("woman with by neck tie who.");
  const unMatchedWordCount = UnMatchedWordCount(correctSentence, trySentence);

  expect(unMatchedWordCount).toEqual(3);
});

test("unMatchedWordCount is 30% ", () => {
  // 9단어.
  const correctSentence = convertPlainText(
    "I have a paper but i need even more paper."
  );

  const trySentence = convertPlainText("I need a color tie who.");
  const unMatchedWordPercent = UnMatchedWordPercent(
    correctSentence,
    trySentence
  );
  console.log(unMatchedWordPercent);

  expect(`${unMatchedWordPercent}%`).toEqual(`30%`);
});

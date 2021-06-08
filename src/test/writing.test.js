import Writing from "utils/Writing";

const writingObject = {
  kr_sentence: "오늘은 두통이 심하다. ",
  en_sentence: "I've a bad headache today. ",
};
const writing = new Writing(writingObject);

test("앞 뒤 공백 제거", () => {
  expect(writing.getAnswerSentence()).toBe("I've a bad headache today.");
});

test("50% 단어 맞춤", () => {
  const UserTryText = "I've a ";
  const precent = writing.getMatchedWordPercent(UserTryText);
  expect(precent).toBe(40);
});

test("Get Plain Answer", () => {
  const result = writing.getAnswerSentencePlain();
  const userText = "I`ve been have. ";
  const userResult = writing.convertSentencePlain(userText);

  expect(result).toBe("I've a bad headache today");
  expect(userResult).toBe("I've been have");
});

test("Trim", () => {
  const UserTryText = "today";

  const words = writing.getCompareUserSentenceWords(UserTryText);
  console.log(words);

  expect(words).toBe(words);
});

test("getCompareUserSentenceWords", () => {
  const UserTryText = "I will quit smoking.?";
  writing.en_sentence = "I must stop smoking.";

  const words = writing.getCompareUserSentenceWords(UserTryText);
  console.log(words);

  expect(words).toBe(words);
});

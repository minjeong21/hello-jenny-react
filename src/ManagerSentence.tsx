export const convertPlainText = (text: string) => {
  let convertedText = text.toLowerCase().replace(/[.,]/g, "");
  return convertedText;
};

export const unMatchedWordCount = (text1: string, text2: string) => {
  const correctTextWords = text1.split(" ");
  const tryTextWords = text2.split(" ");

  for (let i = 0; i < tryTextWords.length; i++) {
    const index = correctTextWords.indexOf(tryTextWords[i]);
    if (index > -1) {
      correctTextWords.splice(index, 1);
    }
  }
  return correctTextWords.length;
};

export const matchedWordPercent = (text1: string, text2: string) => {
  const correctTextWords = text1.split(" ");
  const countOfCorrectTextWords = correctTextWords.length;
  const tryTextWords = text2.split(" ");

  for (let i = 0; i < tryTextWords.length; i++) {
    const index = correctTextWords.indexOf(tryTextWords[i]);

    if (index > -1) {
      correctTextWords.splice(index, 1);
    }
  }
  return Math.round(
    (1 - correctTextWords.length / countOfCorrectTextWords) * 100
  );
};

export const convertPlainText = (text: string) => {
  // 앞 뒤 공백 제거. 모두 소문자로 변형.
  let convertedText = text.trim().toLowerCase();

  // I'm = I am 처리
  convertedText = convertedText.replace(/(i'm)/gi, "i am");
  convertedText = convertedText.replace(/(you're)/gi, "you are");
  convertedText = convertedText.replace(/(they're)/gi, "they are");
  convertedText = convertedText.replace(/(gotta)/gi, "got to");
  convertedText = convertedText.replace(/(wanna)/gi, "want to");

  //  점 없애기.
  convertedText = convertedText.replace(/[.,]/g, "");

  // 특수기호 변환
  convertedText = convertedText.replace(/[`’"]/g, "'");

  return convertedText;
};
/** 정답 문장에서 안맞는 단어 갯수가 몇개인지 return */
export const getUnMatchedWordCount = (correctText: string, tryText: string) => {
  const correctTextWords = convertPlainText(correctText).split(" ");
  const tryTextWords = convertPlainText(tryText).split(" ");

  for (let i = 0; i < tryTextWords.length; i++) {
    const index = correctTextWords.indexOf(tryTextWords[i]);
    if (index > -1) {
      correctTextWords.splice(index, 1);
    }
  }
  return correctTextWords.length;
};

/** 정답 문장에서 몇 퍼센트 단어 맞췄는지 return */
export const getMatchedWordPercent = (correctText: string, tryText: string) => {
  const unMatchedWordCount = getUnMatchedWordCount(correctText, tryText);
  const wordCount = correctText.split(" ").length;

  return Math.round(((wordCount - unMatchedWordCount) / wordCount) * 100);
};

/** 정답 후보 문장에서 정답이 있는지 확인하고 object로 리턴 */
export const compareAnswer = (
  alternative_en_texts: string[],
  tryText: string
) => {
  let isCorrect = false;
  let correctText = "";
  let bestMatchedText = "";
  let lestUnMatchedCount = 100;

  for (let i = 0; i < alternative_en_texts.length; i++) {
    const unMatchedCount = getUnMatchedWordCount(
      alternative_en_texts[i],
      tryText
    );

    if (
      getUnMatchedWordCount(alternative_en_texts[i], tryText) <
      lestUnMatchedCount
    ) {
      lestUnMatchedCount = unMatchedCount;
      bestMatchedText = alternative_en_texts[i];
    }

    const correctPlainText = convertPlainText(alternative_en_texts[i]);
    const tryPlainText = convertPlainText(tryText);

    if (correctPlainText === tryPlainText) {
      isCorrect = true;
      correctText = alternative_en_texts[i];
      break;
    }
  }
  return {
    isCorrect: isCorrect,
    correctText: correctText,
    bestMatchedText: bestMatchedText,
  };
};

/**
 * 문장이 긴 경우 말줄임표
 * */
export const getEllipsis = (text: string, count: number) => {
  if (text.length > count) {
    return text.slice(0, count) + "...";
  } else {
    return text;
  }
};

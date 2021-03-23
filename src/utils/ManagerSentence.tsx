import { IPractice } from "../interface/IPractice";
import { IPracticeAT } from "../interface/IPracticeAT";

const samePair = [
  {
    text1: "i'm",
    text2: "i am",
  },
  {
    text1: "you're",
    text2: "you are",
  },
  {
    text1: "they're",
    text2: "they are",
  },
  {
    text1: "gotta",
    text2: "got to",
  },
  {
    text1: "wanna",
    text2: "want to",
  },
];

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
export const compareAnswer = (english_texts: string[], tryText: string) => {
  let isCorrect = false;
  let correctText = "";
  let bestMatchedText = "";
  let lestUnMatchedCount = 100;

  for (let i = 0; i < english_texts.length; i++) {
    const unMatchedCount = getUnMatchedWordCount(english_texts[i], tryText);

    if (getUnMatchedWordCount(english_texts[i], tryText) < lestUnMatchedCount) {
      lestUnMatchedCount = unMatchedCount;
      bestMatchedText = english_texts[i];
    }

    const correctPlainText = convertPlainText(english_texts[i]);
    const tryPlainText = convertPlainText(tryText);

    if (correctPlainText === tryPlainText) {
      isCorrect = true;
      correctText = english_texts[i];
      break;
    }
  }
  return {
    isCorrect: isCorrect,
    correctText: correctText,
    bestMatchedText: bestMatchedText,
  };
};

export const convertPracticeATtoPractice = (practiceAT: IPracticeAT) => {
  // 설명 분리
  const related_descriptions: {
    type: string;
    title: string;
    description: string;
  }[] = [];

  if (practiceAT.fields.related_desc) {
    practiceAT.fields.related_desc.map((item) => {
      const items = item.split("$");
      related_descriptions.push({
        type: items[0],
        title: items[1],
        description: items[2],
      });
    });
  }

  // 비디오 파트
  const related_videos_result: { title: string; link: string }[] = [];
  if (practiceAT.fields.related_videos) {
    practiceAT.fields.related_videos.map((item) => {
      const items = item.split("$");
      related_videos_result.push({
        title: items[0],
        link: items[1],
      });
    });
  }

  const practice: IPractice = {
    numid: practiceAT.fields.numid,
    situation: practiceAT.fields.situation ? practiceAT.fields.situation : null,
    publish_date: practiceAT.fields.publish_date,
    source_type: practiceAT.fields.source_type,
    korean_text: practiceAT.fields.korean_text,
    english_texts: practiceAT.fields.english_texts.split("\n"),
    related_descriptions,
    related_videos: related_videos_result,
    image_url: practiceAT.fields.image_url,
    themes: practiceAT.fields.themes,
    hint1: practiceAT.fields.hint1 ? practiceAT.fields.hint1 : null,
    hint2: practiceAT.fields.hint2 ? practiceAT.fields.hint2 : null,
    level: practiceAT.fields.level ? practiceAT.fields.level : null,
  };
  return practice;
};

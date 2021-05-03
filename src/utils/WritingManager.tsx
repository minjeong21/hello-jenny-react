import IWriting from "interface/IWriting";

export default class WritingManager {
  writing: IWriting;
  hintCount: number;

  constructor(writing: IWriting) {
    this.writing = writing;
    this.hintCount = 0;
  }

  hasMoreHint = () => {
    return this.writing.hints.length === this.hintCount;
  };
  getWriting = () => {
    return this.writing;
  };
  convertPlainText = (text: string) => {
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
  getUnMatchedWordCount = (correctText: string, tryText: string) => {
    const correctTextWords = this.convertPlainText(correctText).split(" ");
    const tryTextWords = this.convertPlainText(tryText).split(" ");

    for (let i = 0; i < tryTextWords.length; i++) {
      const index = correctTextWords.indexOf(tryTextWords[i]);
      if (index > -1) {
        correctTextWords.splice(index, 1);
      }
    }
    return correctTextWords.length;
  };

  /** 정답 문장에서 몇 퍼센트 단어 맞췄는지 return */
  getMatchedWordPercent = (tryText: string) => {
    const unMatchedWordCount = this.getUnMatchedWordCount(
      this.writing.en_sentence,
      tryText
    );
    const wordCount = this.writing.en_sentence.split(" ").length;

    return Math.round(((wordCount - unMatchedWordCount) / wordCount) * 100);
  };

  /** 정답 후보 문장에서 정답이 있는지 확인하고 object로 리턴 */
  compareAnswer = (alter_sentences: string[], tryText: string) => {
    let isCorrect = false;
    let correctText = "";
    let bestMatchedText = "";
    let lestUnMatchedCount = 100;

    for (let i = 0; i < alter_sentences.length; i++) {
      const unMatchedCount = this.getUnMatchedWordCount(
        alter_sentences[i],
        tryText
      );

      if (
        this.getUnMatchedWordCount(alter_sentences[i], tryText) <
        lestUnMatchedCount
      ) {
        lestUnMatchedCount = unMatchedCount;
        bestMatchedText = alter_sentences[i];
      }

      const correctPlainText = this.convertPlainText(alter_sentences[i]);
      const tryPlainText = this.convertPlainText(tryText);

      if (correctPlainText === tryPlainText) {
        isCorrect = true;
        correctText = alter_sentences[i];
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

  getSubjective = () => {
    const firstWord = this.writing.first_word
      ? this.writing.first_word
      : this.writing.en_sentence.split(" ")[0];
    return firstWord;
  };

  getHintByNumber = () => {
    return this.writing.hints[this.hintCount].description;
  };
  getHintTitle = () => {
    switch (this.hintCount) {
      case 0:
        return "첫번째 힌트야";
      default:
        return "다음 힌트는!";
    }
  };

  increaseHintNumber = () => {
    this.hintCount += 1;
  };

  getEllipsis = () => {
    if (this.writing.kr_sentence.length > 60) {
      return this.writing.kr_sentence.slice(0, 60) + "...";
    } else {
      return this.writing.kr_sentence;
    }
  };
}

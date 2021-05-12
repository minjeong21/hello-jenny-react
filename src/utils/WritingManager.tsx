import IWriting from "interface/IWriting";

export default class WritingManager {
  writing: IWriting;

  constructor(writing: IWriting) {
    this.writing = writing;
  }

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
    const matchedPercent = Math.round(
      ((wordCount - unMatchedWordCount) / wordCount) * 100
    );

    return matchedPercent > 0 ? matchedPercent : 0;
  };

  getAnswerWords = () => {
    return this.writing.en_sentence.split(" ");
  };

  getUserSentenceWords = (tryText: string) => {
    return tryText.split(" ");
  };

  isCorrect = (userSentecne: string) => {
    return userSentecne.trim() === this.writing.en_sentence.trim();
  };

  isIgnoreCaseCorrect = (userSentecne: string) => {
    return (
      userSentecne.trim().toLocaleLowerCase() ===
      this.writing.en_sentence.trim().toLocaleLowerCase()
    );
  };

  isIgnoreSpecialCharCorrect = (userSentecne: string) => {
    var regExp = /[?.,;:~`!'"]/gi;

    return (
      userSentecne.trim().replace(regExp, "") ===
      this.writing.en_sentence.trim().replace(regExp, "")
    );
  };

  /**
   * 문장이 긴 경우 말줄임표
   * */

  /** 영어 문장 주어 return */
  getSubjective = () => {
    const firstWord = this.writing.first_word
      ? this.writing.first_word
      : this.writing.en_sentence.split(" ")[0];
    return firstWord;
  };

  getEllipsis = () => {
    if (this.writing.kr_sentence.length > 60) {
      return this.writing.kr_sentence.slice(0, 60) + "...";
    } else {
      return this.writing.kr_sentence;
    }
  };
  getAnswerSentence = () => {
    return this.writing.en_sentence;
  };
  getId = () => {
    return this.writing.id;
  };

  getHintDescription = (number: number) => {
    return this.writing.hints[number].description;
  };

  getHints = (startNumber: number) => {
    return this.writing.hints.slice(startNumber, this.getHintSize());
  };
  getHintDescriptionMore = (number: number) => {
    return this.writing.hints[number].description_more;
  };
  getHintSize = () => {
    return this.writing.hints.length;
  };
  getImageURL = () => {
    return this.writing.image_url;
  };
  getMainTheme = () => {
    if (this.writing.themes && this.writing.themes.length > 0) {
      return this.writing.themes[0].display_name.toLowerCase();
    } else {
      return null;
    }
  };
  getLevel = () => {
    return this.writing.level;
  };
  getSituation = () => {
    return this.writing.situation;
  };
  getKoreanSentence = () => {
    return this.writing.kr_sentence;
  };
}

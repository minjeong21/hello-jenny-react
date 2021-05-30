import IWriting from "interface/IWriting";
import { LEVEL_MENU } from "properties/Menu";

class Writing {
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

  /** 영어 문장 주어 return */
  getSubjective = () => {
    const firstWord = this.writing.first_word
      ? this.writing.first_word
      : this.writing.en_sentence.split(" ")[0];
    return firstWord;
  };

  getAnswerSentence = (): string => {
    return this.writing.en_sentence;
  };

  getId = () => {
    return this.writing.id;
  };

  getHintSize = () => {
    if (this.writing.hints) {
      return this.writing.hints.length;
    } else {
      return 0;
    }
  };

  hasMoreHint = (currentIndex: number) => {
    return this.writing ? this.getHintSize() - 1 > currentIndex : false;
  };

  hasHint = (currentIndex: number) => {
    return this.writing ? this.getHintSize() > currentIndex : false;
  };

  getRemainedAllHints = (currentIndex: number) => {
    if (this.hasMoreHint(currentIndex)) {
      return this.writing.hints.slice(currentIndex, this.getHintSize());
    } else {
      return [];
    }
  };

  getHintDescription = (currentIndex: number) => {
    return this.writing.hints[currentIndex].description;
  };

  getHintDescriptionMore = (currentIndex: number) => {
    if (this.hasHint(currentIndex)) {
      return this.writing.hints[currentIndex].description_more;
    } else {
      return "";
    }
  };

  getImageURL = () => {
    return this.writing.image_url;
  };

  getMainTheme = () => {
    if (this.writing.themes && this.writing.themes.length > 0) {
      return this.writing.themes[0].display_name;
    } else {
      return null;
    }
  };

  getThemes = () => {
    if (this.writing.themes && this.writing.themes.length > 0) {
      return this.writing.themes;
    } else {
      return null;
    }
  };
  getLevel = () => {
    return this.writing.level;
  };

  getLevelDisplayName = () => {
    const level = LEVEL_MENU.find(
      (item) => Number(item.value) === this.getLevel()
    );

    return level ? level.displayName : "난이도 없어요!";
  };

  getSituation = () => {
    return this.writing.situation;
  };

  getKoreanSentence = () => {
    return this.writing.kr_sentence;
  };
}

export default Writing;

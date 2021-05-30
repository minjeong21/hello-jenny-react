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
    let convertedText = text.trim().replace(/[.,]/g, "");
    convertedText = convertedText.replace(/[`’]/g, "'");

    return convertedText;
  };

  getAnswerSentencePlain = () => {
    let result = this.writing.en_sentence.trim();
    result = result.replace(/[.,!]/g, "");
    result = result.replace(/[`’]/g, "'");
    return result;
  };
  convertSentencePlain = (tryText: string) => {
    let result = tryText.trim();
    result = result.replace(/[.,!]/g, "");
    result = result.replace(/[`’]/g, "'");
    return result;
  };

  getAnswerSentence = () => {
    return this.writing.en_sentence.trim();
  };

  /** 정답 문장에서 몇 퍼센트 단어 맞췄는지 return */
  getMatchedWordPercent = (tryText: string) => {
    const correctTextWords = this.convertPlainText(
      this.getAnswerSentence()
    ).split(" ");
    const tryTextWords = this.convertPlainText(tryText).split(" ");

    for (let i = 0; i < tryTextWords.length; i++) {
      const index = correctTextWords.indexOf(tryTextWords[i]);
      if (index > -1) {
        correctTextWords.splice(index, 1);
      }
    }
    const wordCount = this.getAnswerSentence().split(" ").length;
    const matchedPercent = Math.round(
      ((wordCount - correctTextWords.length) / wordCount) * 100
    );
    return matchedPercent > 0 ? matchedPercent : 0;
  };

  getAnswerWords = () => {
    const words = this.getAnswerSentence().split(" ");
    return words;
  };

  getCompareUserSentenceWords = (tryText: string) => {
    // 마지막 특수문자 체크
    const tryTextlastChar = tryText.charAt(tryText.length - 1);
    const isLastSpecialChar = !/^[a-z0-9]+$/i.test(tryTextlastChar);

    // 축약어 처리
    const abbrs = this.getWriting().abbrs;
    let changeLog: { original: string; converted: string }[] = [];
    abbrs.map((item) => {
      if (tryText.includes(item.converted)) {
        changeLog.push({ original: item.converted, converted: item.original });
      }
      tryText = tryText.replace(item.converted, item.original);
    });

    const answerWords = this.getAnswerSentencePlain().split(" ");
    const list = this.convertSentencePlain(tryText).split(" ");
    const words = list.map((word) => {
      if (answerWords.includes(word)) {
        const log = changeLog.find((item) => item.converted === word);
        return log
          ? { word: log.original, correct: true }
          : { word: word, correct: true };
      } else if (abbrs.length > 0) {
        const target = abbrs.find((abbr) => abbr.converted === word);
        return { word: word, correct: target ? true : false };
      } else {
        return { word: word, correct: false };
      }
    });

    // 마지막 특수문자 추가
    if (isLastSpecialChar) {
      words[words.length - 1].word =
        words[words.length - 1].word + tryTextlastChar;
    }
    return words;
  };

  convertUserSentenceWithAbbr = (userSentecne: string) => {
    const abbrs = this.getWriting().abbrs;
    let converted = userSentecne;
    abbrs.map((item) => {
      converted = converted.replace(item.converted, item.original);
    });
    return converted;
  };

  isCorrect = (userSentecne: string) => {
    const converted = this.convertUserSentenceWithAbbr(userSentecne);
    if (converted.trim() === this.getAnswerSentence()) {
      return true;
    } else {
      return false;
    }
  };

  isIgnoreCaseCorrect = (userSentecne: string) => {
    const converted = this.convertUserSentenceWithAbbr(
      userSentecne.trim().toLocaleLowerCase()
    );
    return converted === this.getAnswerSentence().toLocaleLowerCase();
  };

  isIgnoreSpecialCharCorrect = (userSentecne: string) => {
    var regExp = /[?.,;:~`!'"]/gi;
    const converted = this.convertUserSentenceWithAbbr(userSentecne.trim());
    return (
      converted.replace(regExp, "") ===
      this.getAnswerSentence().replace(regExp, "")
    );
  };

  /** 영어 문장 주어 return */
  getSubjective = () => {
    const firstWord = this.writing.first_word
      ? this.writing.first_word
      : this.getAnswerSentence().split(" ")[0];
    return firstWord;
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
    if (this.hasMoreHint(currentIndex)) {
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

import ISpeaking from "interface/ISpeaking";
import { LEVEL_MENU } from "properties/Filter";

class Speaking {
  speaking: ISpeaking;

  constructor(speaking: ISpeaking) {
    this.speaking = speaking;
  }

  getSpeaking = () => {
    return this.speaking;
  };

  convertPlainText = (text: string) => {
    let convertedText = text.trim().replace(/[.,]/g, "");
    convertedText = convertedText.replace(/[`’]/g, "'");

    return convertedText;
  };

  getAnswerSentencePlain = () => {
    let result = this.speaking.en_sentence.trim();
    result = result.replace(/[.,!]/g, "");
    result = result.replace(/[`’]/g, "'");
    return result;
  };

  getAnswerSentence = () => {
    return this.speaking.en_sentence.trim();
  };

  getAudio = () => {
    return this.speaking.audio.trim();
  }

  getAnswerWords = () => {
    const words = this.getAnswerSentence().split(" ");
    return words;
  };

  /** 영어 문장 주어 return */
  getSubjective = () => {
    const firstWord = this.speaking.first_word
      ? this.speaking.first_word
      : this.getAnswerSentence().split(" ")[0];
    return firstWord;
  };

  getId = () => {
    return this.speaking.id;
  };

  getImageURL = () => {
    return this.speaking.image_url;
  };

  getMainTheme = () => {
    if (this.speaking.themes && this.speaking.themes.length > 0) {
      return this.speaking.themes[0].display_name;
    } else {
      return null;
    }
  };

  getThemes = () => {
    if (this.speaking.themes && this.speaking.themes.length > 0) {
      return this.speaking.themes;
    } else {
      return null;
    }
  };
  getLevel = () => {
    return this.speaking.level;
  };

  getLevelDisplayName = () => {
    const level = LEVEL_MENU.find(
      (item) => Number(item.value) === this.getLevel()
    );

    return level ? level.displayName : "난이도 없어요!";
  };

  getSituation = () => {
    return this.speaking.situation;
  };

  getKoreanSentence = () => {
    return this.speaking.kr_sentence;
  };
}

export default Speaking;

import { makeObservable, observable, runInAction } from "mobx";
import ITheme from "interface/ITheme";
import ISpeaking from "interface/ISpeaking";

import {
  fetchRepSpeaking,
  fetchSpeakingByNumId,
  fetchSpeakingListFiltered,
  fetchSpeakings,
} from "apis/SpeakingApi";
import PathManager from "utils/PathManager";
import Speaking from "utils/Speaking";
import SessionStorage from "utils/SessionStorage";

export class SpeakingStore {
  rootStore;
  speakings: ISpeaking[] | null;
  repSpeaking: Speaking | null;
  repThemes: ITheme[] | null;
  currentSpeaking: Speaking | null;
  currentIndex: number;
  selectedLevels: string[];
  selectedThemes: string[];
  isNotFoundSpeaking: boolean;

  constructor(root: any) {
    makeObservable(this, {
      speakings: observable,
      repSpeaking: observable,
      currentSpeaking: observable,
      repThemes: observable,
      selectedLevels: observable,
      selectedThemes: observable,
      isNotFoundSpeaking: observable,
    });
    this.isNotFoundSpeaking = false;
    this.rootStore = root;
    this.currentIndex = 0;
    this.speakings = null;
    this.repSpeaking = null;
    this.repThemes = null;
    this.currentSpeaking = null;
    this.selectedLevels = [];
    this.selectedThemes = [];
  }
  
  fetchRepSpeaking = async () => {
    const response = await fetchRepSpeaking();
    runInAction(() => {
      this.setRepSpeaking(response.rep_speaking);
      this.setRepThemes(response.themes);
    });
  };

  changeOrfetchSpeaking = (id: number) => {
    let targetSpeaking: ISpeaking | undefined;
    targetSpeaking = this.speakings
      ? this.speakings.find((item) => item.id === id)
      : undefined;
    if (targetSpeaking) {
      this.settingSpeaking(targetSpeaking);
    } else {
      this.fetchSpeaking(id);
    }
  };

  updateFilterFromSession = () => {
    if (this.selectedLevels.length === 0 || this.selectedThemes.length === 0) {
      const levels = SessionStorage.getSelectedLevels();
      const themes = SessionStorage.getSelectedThemes();
      this.setSelectedLevel(levels);
      this.setSelectedThemes(themes);
    }
  };
  fetchSpeaking = async (id: number) => {
    const response = await fetchSpeakingByNumId(id);
    console.log(response);
    runInAction(() => {
      if (response === 404) {
        this.isNotFoundSpeaking = true;
      } else {
        this.isNotFoundSpeaking = false;
        this.settingSpeaking(response.data);
      }
    });
  };

  settingSpeaking = (speaking: any) => {
    this.setCurrentSpeaking(speaking);
    if (this.currentSpeaking && this.selectedLevels.length === 0) {
      this.setSelectedLevel([`${this.currentSpeaking.getLevel()}`]);
    }
    if (
      this.currentSpeaking &&
      this.selectedThemes.length === 0 &&
      this.currentSpeaking.getThemes()
    ) {
      let themes: any = this.currentSpeaking
        .getThemes()
        ?.map((item) => item.name);
      this.setSelectedThemes(themes);
    }
  };

  fetchSpeakingsDefault = async () => {
    const response = await fetchSpeakings();
    this.setSpeakings(response);
    console.log(response)
  };

  fetchFilteredSpeakingAndUpdate = async (
    e: any,
    levels: string,
    themes: string,
    pathManager: PathManager
  ) => {
    try {
      const response = await fetchSpeakingListFiltered(levels, themes);
      this.setSpeakings(response.data);
      pathManager.goNextSpeaking(e, response.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  setRepSpeaking = (speaking: ISpeaking) => {
    this.repSpeaking = new Speaking(speaking);
  };
  setRepThemes = (themes: ITheme[]) => {
    this.repThemes = themes;
  };
  setCurrentSpeaking = (speaking: ISpeaking) => {
    this.currentSpeaking = new Speaking(speaking);
  };
  setSpeakings = (speakings: ISpeaking[]) => {
    if (speakings) {
      this.speakings = Object.assign(speakings);
    }
  };
  setCurrentIndex = (index: number) => {
    this.currentIndex = index;
  };

  getNextSpeakingId = () => {
    if (this.speakings && this.speakings.length > this.currentIndex - 1) {
      this.setCurrentIndex(this.currentIndex + 1);
    } else {
      alert("잠시 후에 다시 시도해주세요🙏🏻");
    }
    return this.speakings ? this.speakings[this.currentIndex].id : -1;
  };

  getSpeaking = () => {
    const response = fetchSpeakings();
    console.log(response)
    return response;
  };


  moveSpeakingWithTheme = async (
    e: any,
    pathManager: PathManager,
    themeName: string
  ) => {
    this.speakings = null;
    let speaking: ISpeaking;
    await this.fetchFilteredSpeakingAndUpdate(e, "", themeName, pathManager);

    runInAction(() => {
      this.setSelectedThemes([themeName]);
      if (this.speakings) {
        speaking = this.speakings[0];
        pathManager.goSpeakingWithTheme(e, speaking.id, themeName);

        this.setSelectedLevel([`${speaking.level}`]);
      } else {
        alert("다시 시도해주세요.");
      }
    });
  };

  setSelectedLevel = (values: string[]) => {
    this.selectedLevels = values;
  };
  setSelectedThemes = (values: string[]) => {
    this.selectedThemes = values;
  };
}

import {
  fetchPracticeByLevel,
  fetchPracticeByNumId,
  fetchPracticeByTheme,
  fetchPractices,
} from "../apis/PracticeApi";
import { convertPracticeATtoPractice } from "./ManagerSentence";

/**
 * theme 또는 레벨에 맞는 문제 리스트 가져오기 (100개까지)
 * */
export const fetchAndSetPracticeList = async (
  setPracticeList: (list: any) => void,
  setPractice: (value: any) => void,
  theme?: string | undefined,
  level?: string | undefined,
  numid?: string | undefined
) => {
  let response = null;
  if (theme) {
    response = await fetchPracticeByTheme(theme);
  } else if (level) {
    response = await fetchPracticeByLevel(level);
  } else {
    response = await fetchPractices();
  }
  setPracticeList(response);

  if (!numid && response && response.length > 0) {
    const atPractice = convertPracticeATtoPractice(response[0]);
    setPractice(atPractice);
  }
};

/**
 * numid가 있는 경우, 해당 문제 가져오기
 * */
export const fetchAndSetPractice = async (
  numid: string | undefined,
  setPractice: (value: any) => void,
  setFetcedPractice: (value: boolean) => void
) => {
  const response = await fetchPracticeByNumId(Number(numid));
  console.log(response);
  if (response && response.length > 0) {
    const atPractice = convertPracticeATtoPractice(response[0]);
    setPractice(atPractice);
  }
  setFetcedPractice(true);
};

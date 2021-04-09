import {
  fetchWritingByLevel,
  fetchWritingByNumId,
  fetchWritingByTheme,
  fetchWritings,
} from "../apis/WritingApi";
import { convertWritingATtoWriting } from "./ManagerSentence";

/**
 * theme 또는 레벨에 맞는 문제 리스트 가져오기 (100개까지)
 * */
export const fetchAndSetWritingList = async (
  setWritingList: (list: any) => void,
  setWriting: (value: any) => void,
  theme?: string | undefined,
  level?: string | undefined,
  numid?: string | undefined
) => {
  let response = null;
  if (theme) {
    response = await fetchWritingByTheme(theme);
  } else if (level) {
    response = await fetchWritingByLevel(level);
  } else {
    response = await fetchWritings();
  }
  setWritingList(response);

  if (!numid && response && response.length > 0) {
    const atWriting = convertWritingATtoWriting(response[0]);
    setWriting(atWriting);
  }
};

/**
 * numid가 있는 경우, 해당 문제 가져오기
 * */
export const fetchAndSetWriting = async (
  numid: string | undefined,
  setWriting: (value: any) => void,
  setFetcedWriting: (value: boolean) => void
) => {
  const response = await fetchWritingByNumId(Number(numid));
  console.log(response);
  if (response && response.length > 0) {
    const atWriting = convertWritingATtoWriting(response[0]);
    setWriting(atWriting);
  }
  setFetcedWriting(true);
};

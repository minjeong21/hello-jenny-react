import { deleteBookmark, getBookmarkList } from "apis/BookmarkApi";
import { action, makeObservable, observable, runInAction } from "mobx";
import { createBookmark } from "apis/BookmarkApi";
import IWriting from "interface/IWriting";
import { createSolvedWriting, getSolvedWritingList } from "apis/ActivityApi";

export class UserActivityStore {
  rootStore;
  bookmarks: { writing: IWriting }[] | null;
  solvedWritings: { writing: IWriting }[] | null;
  bookmarkIds: number[] | null;

  constructor(root: any) {
    makeObservable(this, {
      bookmarks: observable,
      solvedWritings: observable,
    });
    this.rootStore = root;
    this.bookmarks = null;
    this.bookmarkIds = null;
    this.solvedWritings = null;
  }

  hasBookmark = (writingId: number) => {
    if (this.bookmarkIds) {
      return this.bookmarkIds.includes(writingId);
    } else {
      return false;
    }
  };

  fetchAllBookmarks = async (jwt: string) => {
    const response = await getBookmarkList(jwt);
    if (response instanceof Error) {
      console.error("북마크 리스트 못불러옴");
    } else {
      this.bookmarks = response.list;
      this.bookmarkIds = response.ids;
    }
  };

  addBookmark = async (writingId: number, jwt: string) => {
    const response = await createBookmark(writingId, jwt);
    if (response instanceof Error) {
      console.log(response);
    } else {
      this.fetchAllBookmarks(jwt);
    }
  };
  removeBookmark = async (writingId: number, jwt: string) => {
    const response = await deleteBookmark(writingId, jwt);
    if (response instanceof Error) {
      this.fetchAllBookmarks(jwt);
      console.log(response);
    } else {
      this.fetchAllBookmarks(jwt);
    }
  };

  // 유저 푼 문제

  fetchAllSolvedWritings = async (jwt: string) => {
    const response = await getSolvedWritingList(jwt);
    if (response instanceof Error) {
      console.error("푼 문제 못불러옴");
    } else {
      this.solvedWritings = response.list;
    }
  };

  addSolvedWriting = async (writingId: number, jwt: string) => {
    const response = await createSolvedWriting(writingId, jwt);
    console.log(response);
    if (response instanceof Error) {
      console.log(response);
    } else {
      this.fetchAllSolvedWritings(jwt);
    }
  };
}

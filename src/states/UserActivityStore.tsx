import { deleteBookmark, getBookmarkList } from "apis/BookmarkApi";
import { action, makeObservable, observable, runInAction } from "mobx";
import { createBookmark } from "apis/BookmarkApi";
import IWriting from "interface/IWriting";

interface IBookmark {
  id: string;
  writingId: number;
}
export class UserActivityStore {
  rootStore;
  bookmarks: { writing: IWriting }[] | null;
  bookmarkIds: number[] | null;

  constructor(root: any) {
    makeObservable(this, {
      bookmarks: observable,
    });
    this.rootStore = root;
    this.bookmarks = null;
    this.bookmarkIds = null;
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
      alert("에러발생");
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
}

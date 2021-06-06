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
    const reponse = await createBookmark(writingId, jwt);
    console.log(reponse);
  };
  removeBookmark = async (writingId: number, jwt: string) => {
    const reponse = await deleteBookmark(writingId, jwt);
    console.log(reponse);
  };
}

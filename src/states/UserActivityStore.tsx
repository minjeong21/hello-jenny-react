import { getBookmarkList } from "apis/BookmarkApi";
import { action, makeObservable, observable, runInAction } from "mobx";
import { createBookmark } from "apis/BookmarkApi";

interface IBookmark {
  id: string;
  writingId: number;
}
export class UserActivityStore {
  rootStore;
  bookmarks: IBookmark[] | null;

  constructor(root: any) {
    makeObservable(this, {
      bookmarks: observable,
    });
    this.rootStore = root;
    this.bookmarks = null;
  }

  fetchAllBookmarks = async (userId: number) => {
    const response = await getBookmarkList(userId);
    console.log(response);
  };

  createBookmark = () => {
    const reponse = await createBookmark();
  };
}

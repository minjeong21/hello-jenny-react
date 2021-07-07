import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import {
  Home,
  Detail,
  Speaking,
  Profile,
  SignIn,
  SignUp,
  Membership,
} from "../pages";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
import { useStores } from "states/Context";
import LocalStorage from "utils/LocalStorage";
import OauthKakao from "pages/Oauth";
import WritingHome from "pages/WritingHome";

const App = () => {
  const { writingStore, userActivityStore } = useStores();
  useEffect(() => {
    const token = LocalStorage.getToken();
    // TODO: 북마크 기능 추가
    // if (token) {
    // userActivityStore.fetchAllBookmarks(token);
    // }
  }, [writingStore, userActivityStore]);
  return (
    <Switch>
      <Route exact path="/">
        <TopNavigation />
        <Home />
        <Footer />
      </Route>

      <Route exact path="/signin/">
        <TopNavigation />
        <SignIn />
        <Footer />
      </Route>
      <Route exact path="/signup/">
        <TopNavigation />
        <SignUp />
        <Footer />
      </Route>
      <Route exact path="/profile/">
        <TopNavigation />
        <Profile />
        <Footer />
      </Route>
      <Route exact path="/writing//">
        <TopNavigation />
        <WritingHome />
        <Footer />
      </Route>
      <Route exact path="/writing/:id/">
        <TopNavigation />
        <Detail />
      </Route>
      <Route path="/writing">
        <TopNavigation />
        <Detail />
        <Footer />
      </Route>
      <Route path="/speaking/:id">
        <TopNavigation />
        <Speaking />
        <Footer />
      </Route>

      <Route path="/oauth/">
        <OauthKakao />
      </Route>

      <Route path="/membership/">
        <TopNavigation />
        <Membership />
        <Footer />
      </Route>
    </Switch>
  );
};

export default App;

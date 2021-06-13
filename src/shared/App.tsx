import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { Home, Detail, Speaking, Profile, SignIn, SignUp } from "../pages";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
import { useStores } from "states/Context";
import LocalStorage from "utils/LocalStorage";
import OauthKakao from "pages/Oauth";

const App = () => {
  const { writingStore, userActivityStore } = useStores();
  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      userActivityStore.fetchAllBookmarks(token);
    }
    if (!writingStore.writings || writingStore.writings.length === 0) {
      writingStore.fetchWritingsDefault();
    }
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
    </Switch>
  );
};

export default App;

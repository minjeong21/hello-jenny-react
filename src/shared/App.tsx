import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking, Profile, SignIn, SignUp } from "../pages";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
const App = () => {
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
    </Switch>
  );
};

export default App;

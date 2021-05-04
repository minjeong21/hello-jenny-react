import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking } from "../pages";
import { fetchRecapWritings } from "apis/WritingApi";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
const App = () => {
  const [writings, setWritings] = useState<IWriting[]>();
  const [writingManager, setWritingManager] = useState<WritingManager>();

  useEffect(() => {
    fetchRecapWriting();
  }, []);

  const fetchRecapWriting = async () => {
    const response = await fetchRecapWritings();
    if (response) {
      setWritings(response.writings);
      setWritingManager(new WritingManager(response.rep_writing));
    } else {
      return [];
    }
  };

  return (
    <Switch>
      <Route exact path="/">
        <TopNavigation writings={writings ? writings : null} />
        <Home
          writings={writings ? writings : null}
          manager={writingManager ? writingManager : null}
        />
        <Footer />
      </Route>
      <Route path="/writing/:id/:theme/">
        <TopNavigation writings={writings ? writings : null} />
        <Detail />

        <Footer />
      </Route>
      <Route exact path="/writing/:id/">
        <TopNavigation writings={writings ? writings : null} />
        <Detail />

        <Footer />
      </Route>
      <Route path="/writing*(/+)">
        <TopNavigation writings={writings ? writings : null} />
        <Detail manager={writingManager} />
        <Footer />
      </Route>
      <Route path="/speaking/:id*(/+)">
        <TopNavigation writings={writings ? writings : null} />
        <Speaking
          manager={writingManager ? writingManager : null}
          writings={writings ? writings : null}
        />
        <Footer />
      </Route>
    </Switch>
  );
};

export default App;

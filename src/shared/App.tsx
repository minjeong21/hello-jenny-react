import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking } from "../pages";
import { fetchRecapWritings, fetchWritings } from "apis/WritingApi";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
const App = () => {
  const [writings, setWritings] = useState<IWriting[]>();
  const [writingManager, setWritingManager] = useState<WritingManager>();

  useEffect(() => {
    fetchRecapWriting();
    fetchWritingList();
  }, []);

  const fetchRecapWriting = async () => {
    const response = await fetchRecapWritings();
    if (response) {
      setWritingManager(new WritingManager(response.rep_writing));
    }
  };
  const fetchWritingList = async () => {
    const response = await fetchWritings();
    if (response) {
      console.log(response);
      setWritings(response.data);
    }
  };

  console.log(writings);
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
        <Detail writings={writings ? writings : null} />

        <Footer />
      </Route>
      <Route exact path="/writing/:id/">
        <TopNavigation writings={writings ? writings : null} />
        <Detail writings={writings ? writings : null} />

        <Footer />
      </Route>
      <Route path="/writing">
        <TopNavigation writings={writings ? writings : null} />
        <Detail
          manager={writingManager}
          writings={writings ? writings : null}
        />
        <Footer />
      </Route>
      <Route path="/speaking/:id">
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

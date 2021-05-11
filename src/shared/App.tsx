import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking } from "../pages";
import {
  fetchRecapWritings,
  fetchWritings,
  fetchWritingListFiltered,
} from "apis/WritingApi";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
const App = () => {
  const [writings, setWritings] = useState<IWriting[]>();
  const [index, setWritingIndex] = useState(0);

  useEffect(() => {
    fetchWritingList();
  }, []);

  const fetchWritingList = async () => {
    const response = await fetchWritings();
    if (response) {
      console.log(response);
      setWritings(response.data);
    }
  };

  const fetchWritingsFiltered = async (levels: string[], themes: string[]) => {
    const response = await fetchWritingListFiltered(levels, themes);
    if (response) {
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
          manager={writings ? new WritingManager(writings[0]) : null}
        />
        <Footer />
      </Route>
      <Route exact path="/writing/:id/">
        <TopNavigation writings={writings ? writings : null} />
        <Detail
          fetchWritingsFiltered={fetchWritingsFiltered}
          repWritingId={writings ? writings[0].id : 0}
          writings={writings ? writings : null}
        />

        <Footer />
      </Route>
      <Route path="/writing">
        <TopNavigation writings={writings ? writings : null} />
        <Detail
          fetchWritingsFiltered={fetchWritingsFiltered}
          repWritingId={writings ? writings[0].id : 0}
          writings={writings ? writings : null}
        />
        <Footer />
      </Route>
      <Route path="/speaking/:id">
        <TopNavigation writings={writings ? writings : null} />
        <Speaking
          manager={writings ? new WritingManager(writings[0]) : null}
          writings={writings ? writings : null}
        />
        <Footer />
      </Route>
    </Switch>
  );
};

export default App;

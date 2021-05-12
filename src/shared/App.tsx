import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking } from "../pages";
import { fetchWritings, fetchWritingListFiltered } from "apis/WritingApi";
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
      setWritings(response.data);
    }
  };

  const fetchWritingsFiltered = async (levels: string[], themes: string[]) => {
    const response = await fetchWritingListFiltered(levels, themes);
    if (response) {
      setWritings(response.data);
      setWritingIndex(0);
    }
  };
  const getNextWritingId = () => {
    console.log(writings);
    if (writings) {
      let nextIndex = writings.length > index + 1 ? index + 1 : 0;
      setWritingIndex(nextIndex);
      return writings[nextIndex].id;
    } else {
      return -1;
    }
  };

  return (
    <Switch>
      <Route exact path="/">
        <TopNavigation
          writings={writings ? writings : null}
          getNextWritingId={getNextWritingId}
        />
        {writings && writings.length > 0 ? (
          <Home
            getNextWritingId={getNextWritingId}
            writings={writings}
            manager={new WritingManager(writings[0])}
          />
        ) : null}

        <Footer />
      </Route>
      <Route exact path="/writing/:id/">
        <TopNavigation
          getNextWritingId={getNextWritingId}
          writings={writings ? writings : null}
        />

        {writings && writings.length > 0 ? (
          <Detail
            getNextWritingId={getNextWritingId}
            fetchWritingsFiltered={fetchWritingsFiltered}
            repWritingId={writings ? writings[0].id : 0}
            writings={writings ? writings : null}
          />
        ) : null}
        <Footer />
      </Route>
      <Route path="/writing">
        <TopNavigation
          writings={writings ? writings : null}
          getNextWritingId={getNextWritingId}
        />
        {writings && writings.length > 0 ? (
          <Detail
            getNextWritingId={getNextWritingId}
            fetchWritingsFiltered={fetchWritingsFiltered}
            repWritingId={writings ? writings[0].id : 0}
            writings={writings ? writings : null}
          />
        ) : null}
        <Footer />
      </Route>
      <Route path="/speaking/:id">
        <TopNavigation
          writings={writings ? writings : null}
          getNextWritingId={getNextWritingId}
        />
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

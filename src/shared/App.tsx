import React, { Component, useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail } from "../pages";
import { fetchRecapWritings } from "apis/WritingApi";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";
import TopNavigation from "components/organisms/TopNavigation";
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
        <>
          <TopNavigation writings={writings ? writings : null} />
          <Home
            writings={writings ? writings : null}
            manager={writingManager ? writingManager : null}
          />
        </>
      </Route>
      <Route path="/writing" component={Detail} />
    </Switch>
  );
};

export default App;

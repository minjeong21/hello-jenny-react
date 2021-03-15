import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grommet, Box, Grid, Main, Text, ResponsiveContext } from "grommet";
import { defaultTheme, cardBgColors } from "../../theme";

import { CardColor } from "../../components/molecules/CardColor";
import { fetchPractices } from "../../apis/PracticeApi";

import { IPracticeAT } from "../../interface/IPracticeAT";
import TopBar from "../../components/organisms/TopBar";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
} from "../../properties/Path";

const Home = () => {
  const [practiceList, setPracticeList] = useState<IPracticeAT[]>();
  const history = useHistory();

  useEffect(() => {
    fetchPracticeBundle();
  }, []);

  const fetchPracticeBundle = async () => {
    const response = await fetchPractices();
    setPracticeList(response);
  };

  const list = [1, 2, 3, 4, 5, 6, 63, 7, 59];

  const moveNextInLevel = (level: string) => {
    const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
    history.push(generateLevelPath(level, ranmdomNumber));
  };

  const moveNextInTheme = (theme: string) => {
    const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
    history.push(generateThemePath(theme, ranmdomNumber));
  };
  const moveNextRandom = () => {
    const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
    history.push(generateRandomPath(ranmdomNumber));
  };

  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveNextRandom={moveNextRandom}
        moveNextInLevel={moveNextInLevel}
        moveNextInTheme={moveNextInTheme}
      />
      <Main
        align="stretch"
        pad="medium"
        width={{ max: "1360px" }}
        margin="0 auto"
      >
        {practiceList && practiceList.length ? (
          <ResponsiveContext.Consumer>
            {(size) => {
              if (size === "small") {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "100%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor
                        key={index}
                        practiceAT={item}
                        index={index}
                        numid={item.fields.numid}
                      />
                    ))}
                  </Grid>
                );
              } else if (size === "medium") {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "25%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor
                        key={index}
                        practiceAT={item}
                        index={index}
                        numid={item.fields.numid}
                      />
                    ))}
                  </Grid>
                );
              } else {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "20%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor
                        key={index}
                        practiceAT={item}
                        index={index}
                        numid={item.fields.numid}
                      />
                    ))}
                  </Grid>
                );
              }
            }}
          </ResponsiveContext.Consumer>
        ) : (
          <Box>Loading...</Box>
        )}
      </Main>
    </Grommet>
  );
};

export default Home;

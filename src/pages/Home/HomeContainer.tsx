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

  const moveLevelPractice = (level: string) => {
    history.push(generateLevelPath(level));
  };

  const moveThemePractice = (theme: string) => {
    history.push(generateThemePath(theme));
  };
  const moveRandomPractice = () => {
    if (practiceList) {
      const practicesLength = practiceList ? practiceList.length : 0;
      const rNumber = Math.floor(Math.random() * 100) % practicesLength;
      history.push(generateRandomPath(practiceList[rNumber].fields.numid));
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };
  const movePractice = (numid: number) => {
    history.push(generateRandomPath(numid));
  };

  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
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
                        movePractice={movePractice}
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
                        movePractice={movePractice}
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
                        movePractice={movePractice}
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

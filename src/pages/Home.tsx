import { Grommet, Box, Grid, Main, Text, ResponsiveContext } from "grommet";
import React, { useEffect } from "react";
import { defaultTheme, cardBgColors } from "../theme";
import Navigation from "../components/Navigation";
import { CardColor } from "../components/CardColor";
import { fetchPractices } from "../apis/PracticeApi";
import { useState } from "react";
import { IPracticeAT } from "../interface/IPracticeAT";

const Home = () => {
  const [practiceList, setPracticeList] = useState<IPracticeAT[]>();

  useEffect(() => {
    fetchPracticeBundle();
  }, []);

  const fetchPracticeBundle = async () => {
    const response = await fetchPractices();
    setPracticeList(response);
    console.log(response);
  };

  return (
    <Grommet theme={defaultTheme}>
      <Navigation />
      <Main
        align="stretch"
        pad="medium"
        width={{ max: "1360px" }}
        margin="0 auto"
      >
        {practiceList && practiceList.length ? (
          <ResponsiveContext.Consumer>
            {(size) => {
              console.log(size);
              if (size === "small") {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "100%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor practice={item} index={index} />
                    ))}
                  </Grid>
                );
              } else if (size === "medium") {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "25%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor practice={item} index={index} key={index} />
                    ))}
                  </Grid>
                );
              } else {
                return (
                  <Grid rows="medium" columns={{ count: "fit", size: "20%" }}>
                    {practiceList.map((item, index) => (
                      <CardColor practice={item} index={index} key={index} />
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

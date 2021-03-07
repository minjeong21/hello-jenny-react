import { Grommet, Box, Grid, Main, Text, ResponsiveContext } from "grommet";
import React from "react";
import { defaultTheme, cardBgColors } from "../theme";
import Navigation from "../components/Navigation";
import practiceBundle from "../sample/practiceBundle.json";
import { CardColor } from "../components/CardColor";

const Home = () => {
  return (
    <Grommet theme={defaultTheme}>
      <Navigation />
      <Main align="stretch" pad="small">
        <Grid rows="medium" columns={{ count: "fit", size: "25%" }}>
          {practiceBundle.map((item, index) => (
            <CardColor practice={item} index={index} />
          ))}
        </Grid>
      </Main>
    </Grommet>
  );
};

export default Home;

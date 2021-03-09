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
      <Main
        align="stretch"
        pad="medium"
        width={{ max: "1360px" }}
        margin="0 auto"
      >
        <ResponsiveContext.Consumer>
          {(size) => {
            console.log(size);
            if (size === "small") {
              return (
                <Grid rows="medium" columns={{ count: "fit", size: "100%" }}>
                  {practiceBundle.map((item, index) => (
                    <CardColor practice={item} index={index} />
                  ))}
                </Grid>
              );
            } else if (size === "medium") {
              return (
                <Grid rows="medium" columns={{ count: "fit", size: "25%" }}>
                  {practiceBundle.map((item, index) => (
                    <CardColor practice={item} index={index} />
                  ))}
                </Grid>
              );
            } else {
              return (
                <Grid rows="medium" columns={{ count: "fit", size: "20%" }}>
                  {practiceBundle.map((item, index) => (
                    <CardColor practice={item} index={index} />
                  ))}
                </Grid>
              );
            }
          }}
        </ResponsiveContext.Consumer>
      </Main>
    </Grommet>
  );
};

export default Home;

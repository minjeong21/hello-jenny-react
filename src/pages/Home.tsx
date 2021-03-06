import {
  Grommet,
  Box,
  Grid,
  Main,
  Text,
  ResponsiveContext,
  Card,
} from "grommet";
import Navigation from "../components/Navigation";

import practiceBundle from "../sample/practiceBundle.json";
import { defaultTheme, cardBgColors } from "../theme";

const Home = () => {
  return (
    <Grommet theme={defaultTheme}>
      <Navigation />
      <Main align="stretch" pad="small">
        <Grid rows="medium" columns={{ count: "fit", size: "25%" }}>
          {practiceBundle.map((practice, index) => (
            <Card
              onClick={() =>
                (window.location.href = `/practice?index=${index}`)
              }
              justify="between"
              background={cardBgColors[index]}
              key={"baba"}
              round={"0"}
              pad="small"
              height=""
            >
              <Box height="small" direction="row" justify="between">
                <Box>
                  <Text size="small" weight="normal" color="#333333">
                    2 March 2021
                  </Text>
                </Box>
                <Text size="small" weight="normal" color="#333333">
                  여행
                </Text>
              </Box>

              <Box pad="small" align="center">
                <Box
                  background={{
                    color: "lightgray",
                    dark: true,
                    image: `url(${practice.related_images[0].link})`,
                    opacity: 0.9,
                    repeat: "no-repeat",
                    size: "cover",
                    position: "center",
                  }}
                  width="80%"
                  height="medium"
                />
              </Box>
              <Box height="small" pad="medium" align="center">
                <Text size="small" weight="bold">
                  {practice.korText}
                </Text>
              </Box>

              <Box height="50px" direction="row" justify="between">
                <Box>
                  <Text size="small" weight="bold">
                    ✬✬✬
                  </Text>
                </Box>
                <Text size="13px" weight="bold" color="#333333">
                  created by koo
                </Text>
              </Box>
            </Card>
          ))}
        </Grid>
      </Main>
    </Grommet>
  );
};

export default Home;

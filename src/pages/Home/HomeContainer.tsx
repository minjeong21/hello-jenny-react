import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grommet,
  Box,
  Grid,
  Main,
  Text,
  ResponsiveContext,
  Header,
  Button,
  Image,
} from "grommet";
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
import { IPractice } from "../../interface/IPractice";
import PracticeBox from "../../components/organisms/PracticeBox";

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
      <Main align="stretch" margin="0 auto">
        {/* Header 토끼*/}
        <HeaderSection />
        {/* 문제 리스트 */}
        {practiceList && practiceList.length ? (
          <PracticeList
            practiceList={practiceList}
            movePractice={movePractice}
          />
        ) : (
          <Box>Loading...</Box>
        )}
      </Main>
    </Grommet>
  );
};

export default Home;

const HeaderSection = ({}) => {
  return (
    <Box background="#faf8f8">
      <ResponsiveContext.Consumer>
        {(size) => {
          if (size === "small") {
            return (
              <Box
                flex
                direction="column"
                width={{ max: "1360px" }}
                margin="0 auto"
              >
                <HeaderContent />
              </Box>
            );
          } else {
            return (
              <Header pad="medium" width={{ max: "1360px" }} margin="0 auto">
                <HeaderContent />
              </Header>
            );
          }
        }}
      </ResponsiveContext.Consumer>
    </Box>
  );
};

const HeaderContent = () => {
  return (
    <div className="flex pad-large margin-center ">
      <div className="flex-1">
        <Image src="/assets/header-rabit.png" width="300px" />
      </div>
      <div className="flex-2 flex flex-column justify-center pad-medium">
        <div className="pre-line font-large font pb-xs">
          {`따끈따끈~ 새로운 문장이 도착했어요!\n같이 한번 풀어볼까요?? `}
        </div>
        <div className="font-small font-gray-3">
          오늘 문제를 모두 맞춘다면, 기분이 정말 좋을꺼에요!
        </div>
      </div>
    </div>
  );
};

const PracticeList = ({
  practiceList,
  movePractice,
}: {
  practiceList: IPracticeAT[];
  movePractice: (value: number) => void;
}) => {
  return (
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
  );
};

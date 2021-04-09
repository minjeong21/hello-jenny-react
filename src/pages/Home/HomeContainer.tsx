import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grommet } from "grommet";
import { defaultTheme } from "../../theme";
import { IPracticeAT } from "../../interface/IPracticeAT";
import TopBar from "../../components/organisms/TopBar";
import Footer from "../../components/organisms/Footer";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "../../properties/Path";
import { fetchAndSetPracticeList } from "../../utils/ManagerPractice";
import { IPractice } from "../../interface/IPractice";
import HomePresenter from "./HomePresenter";

const Home = () => {
  const [practiceList, setPracticeList] = useState<IPracticeAT[]>();
  const [practice, setPractice] = useState<IPractice>();
  const history = useHistory();

  useEffect(() => {
    fetchPracticeBundle();
  }, []);

  const fetchPracticeBundle = async () => {
    fetchAndSetPracticeList(setPracticeList, setPractice);
  };

  const moveLevelPractice = (level: string) => {
    history.push(generateLevelPath(level));
  };

  const moveThemePractice = (theme: string) => {
    history.push(generateThemePath(theme));
  };
  const moveRandomPractice = () => {
    if (practiceList) {
      const randomNumber = getNextRandomNum(practiceList);
      history.push(generateRandomPath(practiceList[randomNumber].fields.numid));
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };
  const movePractice = (numid: number) => {
    history.push(generateRandomPath(numid));
  };
  const moveRandomPath = () => {
    let randomNumber = 0;
    if (practiceList) {
      randomNumber = getNextRandomNum(practiceList);
    }

    history.push(generateRandomPath(randomNumber));
  };

  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
      />
      <HomePresenter
        practice={practice}
        practiceList={practiceList}
        moveRandomPath={moveRandomPath}
        movePractice={movePractice}
      />
      <Footer />
    </Grommet>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grommet } from "grommet";
import { defaultTheme } from "../../theme";
import { IWritingAT } from "../../interface/IWritingAT";
import TopBar from "../../components/organisms/TopBar";
import Footer from "../../components/organisms/Footer";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "../../properties/Path";
import { fetchAndSetWritingList } from "../../utils/ManagerWriting";
import { IWriting } from "../../interface/IWriting";
import HomePresenter from "./HomePresenter";

const Home = () => {
  const [writingList, setWritingList] = useState<IWritingAT[]>();
  const [writing, setWriting] = useState<IWriting>();
  const history = useHistory();

  useEffect(() => {
    fetchWritingBundle();
  }, []);

  const fetchWritingBundle = async () => {
    fetchAndSetWritingList(setWritingList, setWriting);
  };

  const moveLevelWriting = (level: string) => {
    history.push(generateLevelPath(level));
  };

  const moveThemeWriting = (theme: string) => {
    history.push(generateThemePath(theme));
  };
  const moveRandomWriting = () => {
    if (writingList) {
      const randomNumber = getNextRandomNum(writingList);
      history.push(generateRandomPath(writingList[randomNumber].fields.numid));
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };
  const moveWriting = (numid: number) => {
    history.push(generateRandomPath(numid));
  };
  const moveRandomPath = () => {
    let randomNumber = 0;
    if (writingList) {
      randomNumber = getNextRandomNum(writingList);
    }

    history.push(generateRandomPath(randomNumber));
  };

  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveRandomWriting={moveRandomWriting}
        moveLevelWriting={moveLevelWriting}
        moveThemeWriting={moveThemeWriting}
      />
      <HomePresenter
        writing={writing}
        writingList={writingList}
        moveRandomPath={moveRandomPath}
        moveWriting={moveWriting}
      />
      <Footer />
    </Grommet>
  );
};

export default Home;

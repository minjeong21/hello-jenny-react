import React from "react";
import { Card, Box, Text } from "grommet";
import { cardBgColors } from "../../theme";
import { IPracticeAT } from "../../interface/IPracticeAT";
import { IPractice } from "../../interface/IPractice";
import {
  convertPracticeATtoPractice,
  getEllipsis,
} from "../../utils/ManagerSentence";
import { convertThemesToMainTheme } from "../../properties/Theme";
import Level from "../atoms/Level";
import styled from "styled-components";
const Container = styled.div`
  flex: 1;
  cursor: pointer;
  .move-button {
    width: 100%;
    box-sizing: border-box;
    background: #f4f4f4;
    border-radius: 6px;
    letter-spacing: -0.03em;
    color: #999999;
    line-height: 17px;
    padding: 8px;
  }
`;

const PracticeImage = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  border-radius: 6px;
  opacity: 0.9;
  background-size: cover;
  background-position: center;
  width: 100%;
  box-sizing: border-box;
  height: 260px;
`;

interface IProps {
  practiceAT: IPracticeAT;
  index: number;
  numid: number;
  movePractice: (value: number) => void;
}

const CardSimpleV2 = ({ practiceAT, index, numid, movePractice }: IProps) => {
  const practice: IPractice = convertPracticeATtoPractice(practiceAT);

  return (
    <Container onClick={() => movePractice(numid)}>
      <div className="pad-m">
        <div className="pb-xs">
          {practice.image_url ? (
            <PracticeImage className="image" src={practice.image_url} />
          ) : null}
        </div>

        <div className="flex justify-between pb-xs font-small">
          <div className="font-gray-2 ">
            {convertThemesToMainTheme(practice.themes)}
          </div>
          <Level levelNumber={practice.level} />
        </div>

        <div>
          <div className="font-body font-bold pb-l ellipsis">
            {getEllipsis(practice.korean_text, 60)}
          </div>
        </div>
        <div className="move-button font-small pointer">
          <span className="font-primary">|</span> 영작하기
        </div>
      </div>
    </Container>
  );
};

export default CardSimpleV2;

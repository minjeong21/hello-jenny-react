import { Box, Grid, Main, ResponsiveContext, Header, Image } from "grommet";
import PracticeBox from "../../components/organisms/PracticeBox";
import CardSimpleV2 from "../../components/molecules/CardSimpleV2";
import { IPracticeAT } from "../../interface/IPracticeAT";
import { IPractice } from "../../interface/IPractice";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 80px;
  .practice-box {
    max-width: 860px;
    margin: 0 auto;
  }

  header {
    max-width: 860px;
    margin: 0 auto;
    line-height: 1.3;
  }

  .list-section {
    padding-top: 70px;
    margin: 0 auto;
    width: 860px;
  }
  .section-box {
  }
`;

interface IProps {
  practice?: IPractice;
  practiceList?: IPracticeAT[];
  moveRandomPath: () => void;
  movePractice: (numid: number) => void;
}
const HomePresenter = ({
  practice,
  practiceList,
  moveRandomPath,
  movePractice,
}: IProps) => {
  if (practiceList) {
    practiceList = practiceList.slice(1, 4);
  }
  return (
    <Container>
      <main>
        {/* Header 토끼*/}
        <HeaderSection />
        {/* 문제 풀기 섹션 */}
        <section className="bg-gray-6 pb-xl">
          <div className="pad-l practice-box bg-white mb-l">
            {practice ? (
              <PracticeBox
                practice={practice}
                moveNextPractice={moveRandomPath}
              />
            ) : (
              <div>스켈레톤</div>
            )}
          </div>
        </section>
      </main>
      {/* 문제 리스트 */}

      <section className="list-section">
        <div className="font-large section-box">Lastest</div>
        {practiceList && practiceList.length ? (
          <PracticeList
            practiceList={practiceList}
            movePractice={movePractice}
          />
        ) : (
          <Box>Loading...</Box>
        )}
      </section>
    </Container>
  );
};

const HeaderSection = ({}) => {
  return (
    <Box background="#faf8f8">
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <header className={`${size === "small" ? `` : ``}`}>
              <HeaderContent />
            </header>
          );
        }}
      </ResponsiveContext.Consumer>
    </Box>
  );
};

const HeaderContent = () => {
  return (
    <div className="flex pt-l margin-center ">
      <div className="flex-1">
        <Image src="/assets/header-rabit.png" width="250px" />
      </div>
      <div className="flex-2 flex flex-column justify-center pad-m">
        <div className="pre-line font-large font pb-xs">
          {`따끈따끈~ 오늘의 문장이 도착했어요!\n같이 한번 풀어볼까요?? `}
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
            <div className="flex">
              {practiceList.map((item, index) => (
                <CardSimpleV2
                  key={index}
                  practiceAT={item}
                  index={index}
                  numid={item.fields.numid}
                  movePractice={movePractice}
                />
              ))}
            </div>
          );
        } else if (size === "medium") {
          return (
            <div className="flex">
              {practiceList.map((item, index) => (
                <CardSimpleV2
                  key={index}
                  practiceAT={item}
                  index={index}
                  numid={item.fields.numid}
                  movePractice={movePractice}
                />
              ))}
            </div>
          );
        } else {
          return (
            <div className="flex">
              {practiceList.map((item, index) => (
                <CardSimpleV2
                  key={index}
                  practiceAT={item}
                  index={index}
                  numid={item.fields.numid}
                  movePractice={movePractice}
                />
              ))}
            </div>
          );
        }
      }}
    </ResponsiveContext.Consumer>
  );
};

export default HomePresenter;

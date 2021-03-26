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
    max-width: 860px;
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
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <>
              <main>
                {/* Header 토끼*/}
                <HeaderSection viewSize={size} />
                {/* 문제 풀기 섹션 */}
                <section className="bg-gray-6 pb-xl">
                  <div className="pad-l practice-box bg-white mb-l">
                    {practice ? (
                      <PracticeBox
                        viewSize={size}
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
                <div className="font-large section-box px-l">Lastest</div>

                {practiceList && practiceList.length ? (
                  <PracticeList
                    practiceList={practiceList}
                    movePractice={movePractice}
                    viewSize={size}
                  />
                ) : (
                  <Box>Loading...</Box>
                )}
              </section>
            </>
          );
        }}
      </ResponsiveContext.Consumer>
    </Container>
  );
};

const HeaderSection = ({ viewSize }: { viewSize: string }) => {
  const mainText = `따끈따끈~ 오늘의 문장이 도착했어요!\n같이 한번 풀어볼까요?? `;
  const subText = "문제를 모두 맞춘다면, 기분 좋은 하루가 될꺼에요!!";
  return (
    <Box background="#faf8f8">
      <header>
        <div
          className={` pt-l margin-center ${
            viewSize === "small" ? "flex-column" : "flex"
          }`}
        >
          {viewSize === "small" ? (
            <>
              <div className="flex-1 text-center">
                <Image src="/assets/header-rabit-bottom.png" width="200px" />
              </div>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
            </>
          ) : (
            <>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
              <div className="flex-1">
                <Image src="/assets/header-rabit3.png" width="300px" />
              </div>
            </>
          )}
          {/* Text */}
        </div>
      </header>
    </Box>
  );
};

const PracticeList = ({
  practiceList,
  movePractice,
  viewSize,
}: {
  practiceList: IPracticeAT[];
  movePractice: (value: number) => void;
  viewSize: string;
}) => {
  if (viewSize === "small") {
    return (
      <div className="flex-column">
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
  } else if (viewSize === "medium") {
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
};

export default HomePresenter;

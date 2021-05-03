import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import IWriting from "interface/IWriting";
import SpeakingBox from "components/SpeakingBox";
import TopNavigation from "components/organisms/TopNavigation";
import Footer from "components/organisms/Footer";
import WritingManager from "utils/WritingManager";
// import HeaderSection from "./HeaderSection";

// import WritingList from "./WritingList";

const Container = styled.div`
  padding-bottom: 80px;
  .writing-box {
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

const nullValue = {
  form: "string",
  kr_sentence: "string",
  en_sentence: "string",
  alter_sentences: [],
  first_word: "string",
  id: 1,
  level: 1,
  publish_date: "string",

  situation: "string",
  themes: [{ display_name: "🙋‍♀️ 친구 만들기", name: "🙋‍♀️ 친구 만들기", id: 1 }],
  image_url: "string",
  hints: [
    {
      id: 1,
      name: "string",
      description: "string",
      type: "string",
    },
  ],
};

interface IProps {
  writings: IWriting[] | null;
  manager: WritingManager | null;
}

const Speaking = ({ manager, writings }: IProps) => {
  const [speaking, setSpeaking] = useState<IWriting>(nullValue);
  const pathManager = new PathManager(useHistory());
  const history = useHistory();

  const moveNextSpeacking = () => {};
  return (
    <main className="pt-24">
      <Container>
        <>
          <main>
            {/* 문제 풀기 섹션 */}
            <section className="bg-gray-6 pb-xl pt-12">
              <div className="pad-l writing-box bg-white mb-l rounded-lg">
                {manager ? (
                  <SpeakingBox
                    writing={manager.getWriting()}
                    moveNextWriting={moveNextSpeacking}
                  />
                ) : (
                  <div>스켈레톤</div>
                )}
              </div>
            </section>
          </main>
        </>
      </Container>
    </main>
  );
};

export default Speaking;

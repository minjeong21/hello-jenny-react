export interface IPracticeBundle {
  related_images?: {
    link: string;
    desc?: string;
  }[];
  situation?: string; // 상황이 있으면.
  korText: string; //한글 문장.
  korTextDesc?: string; // 한글문장 부연 설명.
  enTexts: string[]; // 영어 정답. 첫번째가 대표 문장.
  helpGrammars?: {
    title: string; // 문법 제목
    description: string; // 문법 설명
  }[];
  helpVideos?: {
    title: string; //영상 자료 제목
    link: string; // 영장 자료 링크
  }[];
}

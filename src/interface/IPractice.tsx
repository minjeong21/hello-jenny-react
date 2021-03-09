export interface IPractice {
  date: string; // 날짜
  type: string[]; // 자료 타입
  korean_text: string; //한글 문장.
  korean_text_desc?: string; // 한글문장 부연 설명.
  english_texts: string[]; // 영어 정답. 첫번째가 대표 문장.
  situation?: string; // 상황이 있으면.
  related_images?: {
    link: string;
    desc?: string;
  }[];
  related_descriptions?: {
    title?: string; // 문법 제목
    description?: string; // 문법 설명
  }[];
  related_videos?: {
    title?: string; //영상 자료 제목
    link?: string; // 영장 자료 링크
  }[];
}

export interface IWriting {
  id: number;
  level: number;
  publish_date: string;

  kr_text: string;
  main_en_text: string;
  alternative_en_texts: string[];
  situation?: string;
  themes: string[];
  image_url: string;
  hint1: {
    id: number;
    title: string;
    hint: string;
  };
  hint2: {
    id: number;
    title: string;
    hint: string;
  };
  hint3: {
    id: number;
    title: string;
    hint: string;
  };
  created: string;
}

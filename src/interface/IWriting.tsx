export default interface IWriting {
  id: number;
  level: number;
  publish_date: string;

  kr_text: string;
  main_en_text: string;
  alternative_en_texts: string[];
  situation?: string;
  themes: string[];
  image_url: string;
  hints: {
    id: number;
    title: string;
    hint: string;
  }[];
  created: string;
}

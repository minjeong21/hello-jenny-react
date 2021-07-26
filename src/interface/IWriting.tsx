export default interface IWriting {
  form: string;
  kr_sentence: string;
  en_sentence: string;
  alter_sentences: string[];
  short_description: string;
  first_word: string;
  id: number;
  level: number;
  publish_date: string;
  abbrs: { original: string; converted: string }[];
  situation?: string;
  themes: { display_name: string; name: string; id: number }[];
  image_url: string;
  hints: {
    id: number;
    name: string;
    description: string;
    description_more: string;
    type: string;
  }[];
}

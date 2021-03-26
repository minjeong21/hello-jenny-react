export interface IPracticeAT {
  id: string;
  fields: {
    numid: number;
    situation?: string;
    source_type: string;
    publish_date: string;
    korean_text: string;
    image_url?: string;
    english_texts: string;
    related_desc?: string[];
    related_videos?: string[];
    tags?: string[];
    themes?: string[];
    hint1: string;
    hint2: string;
    hint3: string;
    level?: string;
  };
  createdTime: string;
}

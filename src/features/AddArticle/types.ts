export interface IFormAddArticleT {
  title: string;
  description: string;
  body: string;
}

export interface IArticleRequestT extends IFormAddArticleT {
  tagList: string[];
}

export interface IFormEditArticleT extends IFormAddArticleT {
  slug: string;
}

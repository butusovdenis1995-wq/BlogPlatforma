interface Author {
  following: boolean;
  image: string;
  username: string;
}

export interface ArticleT {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface Articles {
  articles: ArticleT[];
  articlesCount: number;
}

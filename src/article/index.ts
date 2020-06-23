import {
  Article as Article_Component,
  Props as Article_Props,
} from "./article.component";
import { Article as Article_Type } from "./article.type";
import { createIsArticleAccepted as Article_createIsArticleAccepted } from "./is-article-accepted.util";
import { parseArticles as Article_parseArticles } from "./parse-articles.util";

export namespace Article {
  export const Component = Article_Component;
  export type Props = Article_Props;
  export type Type = Article_Type;
  export const createIsArticleAccepted = Article_createIsArticleAccepted;
  export const parseArticles = Article_parseArticles;
}

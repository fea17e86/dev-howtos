import { Article } from "./article.type";

export const createIsArticleAccepted = ({
  search,
  selectedTags,
}: {
  search?: string;
  selectedTags: Set<string>;
}) => {
  const matchesTags = createMatchesTags(selectedTags);
  const matchesSearch = createMatchesSearch(search);

  return (article: Article) => {
    return matchesTags(article) && matchesSearch(article);
  };
};

const createMatchesTags = (selectedTags: Set<string>) => ({
  tags,
}: Article) => {
  if (selectedTags.size === 0) {
    return true;
  }

  let isAccepted = false;
  let i: number = 0;
  while (
    i < tags.length &&
    (isAccepted = selectedTags.has(tags[i])) === false
  ) {
    i++;
  }

  return isAccepted;
};

const createMatchesSearch = (search?: string) => ({
  content,
  text,
}: Article) => {
  if (!search) {
    return true;
  }

  let isAccepted = false;
  const toSearch = [
    text.toLocaleLowerCase(),
    content?.toLocaleLowerCase(),
  ].filter((value) => !!value) as string[];

  let i: number = 0;
  while (
    i < toSearch.length &&
    (isAccepted = toSearch[i].indexOf(search) > -1) === false
  ) {
    if (isAccepted) {
      console.log("  >", i, toSearch[i]);
    }
    i++;
  }

  return isAccepted;
};

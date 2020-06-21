export function parseArticles(text: string) {
  const extractArticle = /(?:### \[(.+)\])?\((.+)\)\[(.+)\](?:\r\n\r\n(.+))?/g;
  const articles = [];
  let values;
  while ((values = extractArticle.exec(text)) !== null) {
    const article = {
      text: values[1],
      url: values[2],
      tags: values[3].split(","),
      description: values[4],
    };
    articles.push(article);
  }
  return articles;
}

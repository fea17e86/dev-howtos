export function parseArticles(text: string) {
  const lines = text.split(/\r?\n/g);

  type Sections = { start: number; end: number; lines: string[] }[];

  const createReducer = (indicator: string) => (
    sections: Sections | undefined,
    line: string,
    i: number,
    lines: string[]
  ) => {
    if (line.startsWith(indicator)) {
      const nextSections = [...(sections ?? [])];
      if (nextSections.length === 0) {
        nextSections.push({ start: -1, end: -1, lines: [] });
      }
      const section = nextSections[nextSections.length - 1];
      if (section.start === -1) {
        section.start = i;
      } else if (section.end === -1) {
        section.end = i - 1;
        section.lines = lines.slice(section.start, section.end + 1);
        nextSections.push({ start: i, end: -1, lines: [] });
      } else {
        nextSections.push({ start: i, end: -1, lines: [] });
      }

      return nextSections;
    }

    if (i === lines.length - 1 && sections) {
      const nextSections = [...sections];
      const section = nextSections[nextSections.length - 1];
      if (section && section.end === -1) {
        section.end = i;
        section.lines = lines.slice(section.start, section.end + 1);
      }
      return nextSections;
    }

    return sections;
  };

  const sections = {
    sections: undefined as Sections | undefined,
    articles: undefined as Sections | undefined,
  };

  sections.sections = lines.reduce(
    createReducer("## "),
    undefined as Sections | undefined
  );

  sections.articles = sections.sections
    ?.map(({ start, end, lines }, i) => {
      const sections = lines.reduce(
        createReducer("### "),
        undefined as Sections | undefined
      );
      return sections;
    })
    ?.flat()
    ?.filter((section) => section !== undefined) as Sections;

  return sections.articles.map(({ lines }) => parseArticle(lines));
}

function parseArticle(articleLines: string[]) {
  const extractArticle = /(?:### \[(.+)\])?\((.+)\)\[(.+)\]/g;
  const values = extractArticle.exec(articleLines[0]) ?? [
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  return {
    text: values[1] ?? "",
    url: values[2] ?? "",
    tags: values[3]?.split(",") ?? [],
    content: articleLines.slice(2).join("\n"),
  };
}

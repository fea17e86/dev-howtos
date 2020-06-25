import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Article } from "article";
import { Tag } from "components";
import { AppRoute } from "router";
import { useDelayedCallback } from "utils";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export namespace App {
  export function Container({ children }: ContainerProps) {
    const { push } = useHistory();

    const query = useQuery();

    const { search, selectedTags } = useMemo(() => {
      return {
        search: query.get("search")?.toLocaleLowerCase(),
        selectedTags: new Set<string>(
          query
            .get("selectedTags")
            ?.split(",")
            .filter((tag) => tag.trim() !== "") ?? []
        ),
      };
    }, [query]);

    const [articles, setArticles] = useState<Article.Type[]>([]);

    const tags = useMemo(() => {
      return articles.reduce(
        (tagSet, { tags }) => new Set<string>([...Array.from(tagSet), ...tags]),
        new Set<string>()
      );
    }, [articles]);

    useEffect(() => {
      (async function fetchReadmeMd() {
        const readmeMdUrl =
          process.env.REACT_APP_README_URL ??
          "https://raw.githubusercontent.com/fea17e86/dev-howtos/master/README.md";

        const response = await fetch(readmeMdUrl);
        const redmeaMd = await response.text();

        setArticles(Article.parseArticles(redmeaMd));
      })();
    }, []);

    const setSearch = useCallback(
      (nextSearch?: string) => {
        push(AppRoute.create(selectedTags, nextSearch));
      },
      [push, selectedTags]
    );

    function selectTag(tag: string) {
      const nextSelectedTags = new Set<string>([
        ...Array.from(selectedTags),
        tag,
      ]);
      push(AppRoute.create(nextSelectedTags, search));
    }

    function toggleTag(tag: string) {
      let nextSelectedTags = selectedTags;
      if (selectedTags.has(tag)) {
        nextSelectedTags = new Set<string>([
          ...Array.from(selectedTags).filter(
            (selectedTag) => selectedTag !== tag
          ),
        ]);
      } else {
        nextSelectedTags = new Set<string>([...Array.from(selectedTags), tag]);
      }
      push(AppRoute.create(nextSelectedTags, search));
    }

    return children({
      articles,
      search,
      selectedTags,
      selectTag,
      setSearch,
      tags,
      toggleTag,
    });
  }

  export interface ContainerProps {
    children: (props: ComponentProps) => JSX.Element;
  }

  export function Component({
    articles,
    search,
    selectedTags,
    selectTag,
    setSearch,
    tags,
    toggleTag,
  }: ComponentProps) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "900px",
          margin: "auto",
        }}
      >
        <Header
          search={search}
          selectedTags={selectedTags}
          tags={tags}
          onTagClick={toggleTag}
          onSearchChange={setSearch}
        />
        <Main
          articles={articles}
          search={search}
          selectedTags={selectedTags}
          selectTag={selectTag}
        />
      </div>
    );
  }

  export interface ComponentProps {
    articles: Article.Type[];
    search?: string;
    selectedTags: Set<string>;
    selectTag: (tag: string) => void;
    setSearch: (nextSearch?: string) => void;
    tags: Set<string>;
    toggleTag: (tag: string) => void;
  }

  export function Header({
    selectedTags,
    tags,
    onTagClick,
    ...props
  }: HeaderProps) {
    const [search, setSearch] = useState<string>(props.search ?? "");
    const onSearchChange = useDelayedCallback<string | undefined>(
      props.onSearchChange
    );

    const sortedTags = useMemo(() => {
      return Array.from(tags).sort((a: string, b: string) => {
        const valueA = selectedTags.has(a) ? 1 : 0;
        const valueB = selectedTags.has(b) ? 1 : 0;
        if (valueA !== valueB) {
          return valueB - valueA;
        }

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    }, [tags, selectedTags]);

    return (
      <section style={{ marginBottom: "2em", marginTop: "5em" }}>
        <p style={{ marginBottom: "2em" }}>
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={({ target: { value } }) => {
              setSearch(value);
              onSearchChange(value);
            }}
            style={{
              width: "100%",
              border: "0 none",
              borderRadius: ".5em",
              padding: "calc(.75em - 2px) 1em .75em 1em",
              fontSize: "18pt",
              boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06),
                0 22.3px 17.9px rgba(0, 0, 0, 0.072)`,
            }}
          />
        </p>
        <p>
          {sortedTags.map((tag, i) => (
            <Tag.Component
              key={`${i}_${tag}`}
              value={tag}
              onClick={onTagClick}
              style={
                selectedTags.has(tag)
                  ? { background: "blue", color: "white" }
                  : { opacity: 0.6 }
              }
            />
          ))}
        </p>
      </section>
    );
  }

  export interface HeaderProps {
    onSearchChange: (nextSearch?: string) => void;
    onTagClick: (tag: any) => void;
    search?: string;
    selectedTags: Set<string>;
    tags: Set<string>;
  }

  export function Main({
    articles,
    search,
    selectedTags,
    selectTag,
  }: MainProps) {
    const isArticleAccepted = useCallback(
      Article.createIsArticleAccepted({
        search,
        selectedTags,
      }),
      [search, selectedTags]
    );

    const filteredArticles = useMemo(() => articles.filter(isArticleAccepted), [
      articles,
      isArticleAccepted,
    ]);

    return (
      <main>
        {filteredArticles.map(
          ({ url, text, tags, description }: Article.Type, i) => (
            <Article.Component
              key={`${i}_${url}`}
              contentUrl={url}
              header={text || url}
              tags={tags}
              description={description}
              onTagClick={selectTag}
            />
          )
        )}
      </main>
    );
  }

  export interface MainProps {
    articles: Article.Type[];
    search?: string;
    selectedTags: Set<string>;
    selectTag: (tag: string) => void;
  }
}

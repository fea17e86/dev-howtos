import React, { useEffect, useMemo, useState } from "react";

import { Article } from "article";
import { Tag } from "components";

export namespace App {
  export function Component() {
    const [articles, setArticles] = useState<Article.Type[]>([]);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(
      new Set<string>()
    );

    useEffect(() => {
      (async function fetchReadmeMd() {
        const response = await fetch("/dev-howtos/README.md");
        const redmeaMd = await response.text();
        setArticles(Article.parseArticles(redmeaMd));
      })();
    }, []);

    const tags = useMemo(() => {
      return articles.reduce(
        (tagSet, { tags }) => new Set<string>([...Array.from(tagSet), ...tags]),
        new Set<string>()
      );
    }, [articles]);

    const filteredArticles = useMemo(
      () =>
        articles.filter(({ tags }) => {
          if (selectedTags.size === 0) {
            return true;
          }

          let contains: boolean = false;
          let i: number = 0;
          while (
            (contains = selectedTags.has(tags[i])) === false &&
            i < tags.length
          ) {
            i++;
          }

          return contains;
        }),
      [articles, selectedTags]
    );

    function selectTag(tag: string) {
      setSelectedTags(
        (selectedTags) => new Set<string>([...Array.from(selectedTags), tag])
      );
    }

    function toggleTag(tag: string) {
      setSelectedTags((selectedTags) => {
        if (selectedTags.has(tag)) {
          return new Set<string>([
            ...Array.from(selectedTags).filter(
              (selectedTag) => selectedTag !== tag
            ),
          ]);
        } else {
          return new Set<string>([...Array.from(selectedTags), tag]);
        }
      });
    }

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
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={toggleTag}
        />
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
      </div>
    );
  }

  export function Header({ tags, selectedTags, onTagClick }: HeaderProps) {
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
      </section>
    );
  }

  export interface HeaderProps {
    onTagClick: (tag: any) => void;
    selectedTags: Set<string>;
    tags: Set<string>;
  }
}

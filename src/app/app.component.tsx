import React, { useEffect, useMemo, useState } from "react";

import { Article, Tag } from "components";

interface Link {
  url: string;
  text: string;
  tags: string[];
}

export namespace App {
  export function Component() {
    const [links, setLinks] = useState<Link[]>([]);
    const [tags, setTags] = useState<Set<string>>(new Set<string>());
    const [selectedTags, setSelectedTags] = useState<Set<string>>(
      new Set<string>()
    );

    const filteredLinks = useMemo(
      () =>
        links.filter(({ tags }) => {
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
      [links, selectedTags]
    );

    useEffect(() => {
      (async function fetchReadmeMd() {
        const response = await fetch("/dev-howtos/README.md");
        const redmeaMd = await response.text();
        const extractLink = /(?:\[(.+)\])?\((.+)\)\[(.+)\]/g;
        const links = [];
        const nextTags = new Set<string>(new Set<string>());
        let values;
        while ((values = extractLink.exec(redmeaMd)) !== null) {
          const link = {
            text: values[1],
            url: values[2],
            tags: values[3].split(","),
          };
          links.push(link);
          link.tags.forEach((tag) => {
            nextTags.add(tag);
          });
        }
        setLinks(links);
        setTags(nextTags);
        console.log(links, nextTags);
      })();
    }, []);

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
          {filteredLinks.map(({ url, text, tags }: Link, i) => (
            <Article.Component
              key={`${i}_${url}`}
              contentUrl={url}
              header={text || url}
              tags={tags}
              onTagClick={selectTag}
            />
          ))}
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

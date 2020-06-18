import React from "react";

import { Tag } from "components";

export namespace Article {
  export function Component({
    contentUrl,
    header,
    tags,
    onTagClick,
    style = {},
    ...props
  }: Props) {
    return (
      <article {...props} style={{ ...Style, ...style }}>
        <header style={HeaderStyle}>
          <a href={contentUrl} target="_blank" rel="noopener noreferrer">
            {header}
          </a>
        </header>
        <div>
          {tags.sort().map((tag, i) => (
            <Tag.Component
              key={`${i}_${tag}`}
              value={tag}
              onClick={onTagClick}
            />
          ))}
        </div>
      </article>
    );
  }

  export interface Props
    extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > {
    contentUrl: string;
    header: string;
    tags: string[];
    onTagClick: (tag: any) => void;
  }

  export const Style = { marginBottom: "1.5em" };

  export const HeaderStyle = { marginBottom: ".5em" };
}

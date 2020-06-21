import React from "react";

import { Tag } from "components";

export function Article({
  contentUrl,
  header,
  tags,
  description,
  onTagClick,
  style = {},
  ...props
}: Props) {
  return (
    <article {...props} style={{ ...Style, ...style }}>
      <header>
        <a href={contentUrl} target="_blank" rel="noopener noreferrer">
          {header}
        </a>
      </header>
      <div style={NotFirstStyles}>
        {tags.sort().map((tag, i) => (
          <Tag.Component key={`${i}_${tag}`} value={tag} onClick={onTagClick} />
        ))}
      </div>
      {description && (
        <div style={NotFirstStyles}>
          <em>{description}</em>
        </div>
      )}
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
  description?: string;
  onTagClick: (tag: any) => void;
}

const Style = { marginBottom: "1.5em" };

const NotFirstStyles = { marginTop: ".5em" };

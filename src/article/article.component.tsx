import React from "react";
import ReactMarkdown from "react-markdown";

import { Tag } from "components";

export function Article({
  children: content,
  contentUrl,
  header,
  tags,
  onTagClick,
  style = {},
  ...props
}: Props) {
  return (
    <article {...props} style={{ ...Style, ...style }}>
      <header>
        <h3>
          <a href={contentUrl} target="_blank" rel="noopener noreferrer">
            {header}
          </a>
        </h3>
      </header>
      {content && <ReactMarkdown>{content}</ReactMarkdown>}
      <div style={NotFirstStyles}>
        {tags.sort().map((tag, i) => (
          <Tag.Component key={`${i}_${tag}`} value={tag} onClick={onTagClick} />
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
  children?: string;
  contentUrl: string;
  header: string;
  tags: string[];
  onTagClick: (tag: any) => void;
}

const Style = { marginBottom: "1.5em" };

const NotFirstStyles = { marginTop: ".5em" };

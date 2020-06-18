import React, { useEffect, useState } from "react";

interface Link {
  url: string;
  text: string;
  tags: string[];
}

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    (async function fetchReadmeMd() {
      const response = await fetch("/dev-howtos/README.md");
      const redmeaMd = await response.text();
      const extractLink = /(?:\[(.+)\])?\((.+)\)\[(.+)\]/g;
      const links = [];
      let values;
      while ((values = extractLink.exec(redmeaMd)) !== null) {
        links.push({
          text: values[1],
          url: values[2],
          tags: values[3].split(","),
        });
      }
      setLinks(links);
      console.log(links);
    })();
  }, []);

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
      <section style={{ marginBottom: "2em" }}>header</section>
      <main>
        {links.map(({ url, text, tags }: Link, i) => (
          <div key={`${i}_${url}`} style={{ marginBottom: "1.5em" }}>
            <div style={{ marginBottom: ".5em" }}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {text || url}
              </a>
            </div>
            <div>
              {tags.map((tag, i) => (
                <span
                  key={`${i}_${tag}`}
                  style={{
                    display: "inline-block",
                    background: "#ddd",
                    borderRadius: ".5em",
                    padding: "calc(.5em - 2px) .5em .5em .5em",
                    marginRight: ".5em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

import React from "react";

export namespace Tag {
  export function Component({ onClick, style, value, ...props }: Props) {
    function handleClick(...args: any[]) {
      if (onClick) {
        onClick(value, ...args);
      }
    }

    return (
      <span
        {...props}
        onClick={handleClick}
        style={{
          ...Style,
          ...(typeof onClick === "function" ? InteractiveStyle : {}),
          ...style,
        }}
      >
        {value}
      </span>
    );
  }

  export interface Props
    extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    > {
    value: any;
    onClick?: (...params: any[]) => void;
  }

  export const Style = {
    display: "inline-block",
    background: "#ddd",
    borderRadius: ".5em",
    padding: "calc(.5em - 2px) .5em .5em .5em",
    margin: "0 .5em .5em 0",
  };

  export const InteractiveStyle = {
    cursor: "pointer",
  };
}

"use client";

import * as React from "react";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Ratio can be a number (e.g. 1 for 1 / 1, 16/9 as 16/9) or a string
   * (e.g. "16/9" or "1 / 1"). Defaults to 1 (square).
   */
  ratio?: number | string;
};

function AspectRatio({ ratio = 1, style, children, ...props }: AspectRatioProps) {
  const aspectStyle = {
    aspectRatio: typeof ratio === "number" ? String(ratio) : ratio,
    ...style,
  } as React.CSSProperties;

  return (
    <div data-slot="aspect-ratio" style={aspectStyle} {...props}>
      {children}
    </div>
  );
}

export { AspectRatio };

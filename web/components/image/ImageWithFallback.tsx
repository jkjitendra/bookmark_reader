"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props: ImageProps) {
  const [didError, setDidError] = useState(false);
  const { src, alt, className, style, ...rest } = props;

  if (didError) {
    return (
      <Image
        src={ERROR_IMG_SRC}
        alt="Error loading image"
        width={200}
        height={200}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      onError={() => setDidError(true)}
      className={className}
      style={style}
      width={rest.width ?? 200}
      height={rest.height ?? 200}
      {...rest}
    />
  );
}

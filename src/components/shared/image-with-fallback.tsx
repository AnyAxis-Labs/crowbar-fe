import { type ImgHTMLAttributes, useState } from "react";
import { generateIdenteapot } from "@teapotlabs/identeapots";

import { formatImageUrl } from "@/lib/utils";

const defaultFallback = await generateIdenteapot("default-fallback", "salt");

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function ImageWithFallback({
  fallback = defaultFallback,
  src,
  alt,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const onError = () => setImgSrc(fallback);

  return (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img
      alt={alt || "image-with-fallback"}
      crossOrigin="anonymous"
      src={imgSrc ? (imgSrc.startsWith("data:") ? imgSrc : formatImageUrl(imgSrc)) : fallback}
      onError={onError}
      {...props}
    />
  );
}

import { getPlaceholderImage } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
type Props = {
  src: string | StaticImport;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
};

export default async function ImageContainerBlur({
  src,
  alt = "",
  className,
  objectFit = "cover",
}: Props) {
  const placeholder =
    typeof src === "string"
      ? (await getPlaceholderImage(src)).placeholder
      : undefined;

  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        blurDataURL={placeholder}
        placeholder="blur"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%", objectFit: objectFit }}
        sizes="(max-width: 1250px) 100vw, 1250px"
      />
    </div>
  );
}

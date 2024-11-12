"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Skeleton } from "../skeleton";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  skeletonHeight?: string;
  objectFit?: "cover" | "contain";
  preview?: boolean;
  blur?: boolean;
};

const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // Optional: Do something here if you want
};

export default function ImageContainerBlurClient({
  src,
  alt = "",
  className,
  objectFit = "cover",
  preview = true,
  skeletonHeight,
}: Props) {
  const imageProps = {
    src,
    alt,
    width: 0,
    height: 0,
    style: { width: "100%", height: "100%", objectFit },
    sizes: "(max-width: 1250px) 100vw, 1250px",
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Skeleton className={cn("w-full", skeletonHeight)} />;
  }

  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <PhotoProvider>
          <div onClick={handleClick} className="h-full w-full">
            <PhotoView src={src}>
              <Image {...imageProps} />
            </PhotoView>
          </div>
        </PhotoProvider>
      ) : (
        <Image {...imageProps} />
      )}
    </div>
  );
}

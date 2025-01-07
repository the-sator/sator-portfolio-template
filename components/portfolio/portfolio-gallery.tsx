"use client";

import React from "react";
import Masonry from "react-masonry-css";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import { breakpointColumnsObj } from "@/types/base.type";
type Props = {
  images: string[];
};
export default function PortfolioGallery({ images }: Props) {
  return (
    <>
      <h1 className="mt-10 text-3xl font-bold">Gallery</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-6 flex gap-2" // Ensure there's a gap between columns
      >
        {images.map((image, index) => (
          <div key={index} className="relative my-2">
            <ImageContainerBlurClient
              src={image} // Safe to access as it's set on upload completion
              className="rounded-sm"
            />
          </div>
        ))}
      </Masonry>
    </>
  );
}

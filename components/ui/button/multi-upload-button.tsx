"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../button";
import { Input } from "../input";
import Masonry from "react-masonry-css";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { IoIosClose } from "react-icons/io";
import { uploadImage } from "@/data/upload";
import Spinner from "../spinner";
import { breakpointColumnsObj, ImagePreview } from "@/types/base.type";
import { UploadState } from "@/enum/base.enum";
type UploadButtonProps = {
  children: React.ReactNode;
  className?: string;
  images: File[] | null;
  setImages: Dispatch<SetStateAction<File[] | null>>;
  imagePreviews?: ImagePreview[];
  setImagePreviews: Dispatch<SetStateAction<ImagePreview[]>>;
};

export default function MultiUploadButton({
  children,
  className = "absolute bottom-0 right-0 hover:bg-neutral-700/50 rounded-full",
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
}: UploadButtonProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [newImages, setNewImages] = useState<Set<File>>(new Set());

  const handleUploadClick = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setImages((prev) => (prev ? [...prev, ...filesArray] : filesArray));
      setNewImages((prev) => new Set([...prev, ...filesArray]));
    }
  };

  useEffect(() => {
    if (!images) return;
    const handleUploadGallery = async (images: File[]) => {
      // Add new images to previews
      const previews: ImagePreview[] = newImages
        ? Array.from(newImages).map(() => ({
            id: crypto.randomUUID(),
            url: null,
            status: UploadState.PENDING,
          }))
        : [];

      setImagePreviews((prev) => [...prev, ...previews]);

      const startIndex = imagePreviews ? imagePreviews.length : 0;

      // Process each image
      const uploadPromises = images.map(async (image, localIndex) => {
        const globalIndex = startIndex + localIndex;

        try {
          const { url } = await uploadImage(image);

          setImagePreviews((prev) =>
            prev.map((preview, i) =>
              i === globalIndex
                ? { ...preview, url, status: UploadState.UPLOADED }
                : preview,
            ),
          );

          return url;
        } catch (error) {
          console.log("error:", error);
          setImagePreviews((prev) =>
            prev.map((preview, i) =>
              i === globalIndex
                ? { ...preview, status: UploadState.FAILED }
                : preview,
            ),
          );
        }
      });

      await Promise.all(uploadPromises);
      setNewImages(new Set());
    };

    handleUploadGallery(images);
  }, [images]);
  const handleDeletePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };
  return (
    <>
      {imagePreviews && imagePreviews.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-6 flex gap-2" // Ensure there's a gap between columns
        >
          {imagePreviews.map((image, index) => (
            <div key={index} className="relative my-2">
              {image.status === UploadState.PENDING ? (
                <div className="relative left-0 top-0 z-10 flex h-52 w-full items-center justify-center bg-accent/90">
                  <Spinner size={24} />
                </div>
              ) : image.status === UploadState.UPLOADED ? (
                <ImageContainerBlurClient
                  src={image.url!} // Safe to access as it's set on upload completion
                  className="rounded-sm"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-sm bg-red-500 text-white">
                  Failed
                </div>
              )}
              <Button
                variant="icon"
                type="button"
                size="icon"
                onClick={() => handleDeletePreview(image.id)}
                className="absolute -right-1 -top-1 z-20 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
              >
                <IoIosClose />
              </Button>
            </div>
          ))}
        </Masonry>
      )}
      <Button
        onPointerDown={handleUploadClick}
        type="button"
        variant={"icon"}
        size={"icon"}
        className={className}
        asChild
      >
        {children}
      </Button>
      <Input
        ref={uploadRef}
        multiple
        className="hidden"
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/bmp,image/tiff"
        onChange={handleFileChange}
      />
    </>
  );
}

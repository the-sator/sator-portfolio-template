import React, { Dispatch, SetStateAction } from "react";
import ImageContainerBlurClient from "./image/image-container-blur-client";
import UploadButton from "./button/upload-button";
import { Button } from "./button";
import { FaPen, FaPlus } from "react-icons/fa6";
import Spinner from "./spinner";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
type Props = {
  isUploadPending: boolean;
  coverPreviewUrl: string | null;
  setCoverPreviewUrl: Dispatch<SetStateAction<string | null>>;
  setCoverImage: Dispatch<SetStateAction<File | null>>;
  errors:
    | {
        _errors: string[];
      }
    | undefined;
};

export default function CoverImageUpload({
  isUploadPending,
  coverPreviewUrl,
  setCoverPreviewUrl,
  setCoverImage,
  errors,
}: Props) {
  return (
    <>
      {coverPreviewUrl && (
        <div className="relative mb-2 bg-neutral-800">
          <ImageContainerBlurClient
            src={coverPreviewUrl}
            className="object-fit aspect-video h-32 w-full opacity-50"
            skeletonHeight="h-32"
            preview={true}
          />
          {isUploadPending && (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-accent/90">
              <Spinner size={24} />
            </div>
          )}
          <UploadButton
            className="group absolute bottom-0 h-fit w-fit px-2 py-1 hover:bg-label"
            setImage={setCoverImage}
          >
            <div className="flex items-center gap-2 text-xs font-normal text-neutral-100 group-hover:text-neutral-300">
              <FaPen size={12} />
              <p>Edit</p>
            </div>
          </UploadButton>
          <Button
            variant={"icon"}
            className="absolute right-0 top-0 text-background hover:text-accent/50 dark:text-foreground"
            onClick={() => setCoverPreviewUrl(null)}
          >
            <IoClose size={16} />
          </Button>
        </div>
      )}
      {!coverPreviewUrl && (
        <UploadButton
          className="group relative block h-fit w-full"
          setImage={setCoverImage}
        >
          <div
            className={cn(
              "flex min-h-32 w-full items-center justify-center rounded-sm border border-dashed hover:border-label/50",
              errors?._errors && "border-red-400 hover:border-red-500",
            )}
          >
            <FaPlus />
          </div>

          {isUploadPending && (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-accent/90">
              <Spinner size={24} />
            </div>
          )}
        </UploadButton>
      )}
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </>
  );
}

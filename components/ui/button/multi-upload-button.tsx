"use client";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "../button";
import { Input } from "../input";
type UploadButtonProps = {
  children: React.ReactNode;
  className?: string;
  setImage?: Dispatch<SetStateAction<File[] | null>>;
};
export default function MultiUploadButton({
  children,
  className = "absolute bottom-0 right-0 hover:bg-neutral-700/50 rounded-full",
  setImage,
}: UploadButtonProps) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setImage && setImage(filesArray);
    }
  };
  return (
    <>
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
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
}

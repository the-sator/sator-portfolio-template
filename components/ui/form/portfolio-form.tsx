"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TiptapEditor, { TiptapEditorRef } from "../../tiptap/TipTapEditor";
import FormatMenuMobile from "../../tiptap/format-menu-mobile";
import LinkModal from "../modal/link-modal";
import MultiUploadButton from "../button/multi-upload-button";
import { Button } from "../button";
import { FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import useViewport from "@/hooks/use-viewport";
import { toBase64 } from "@/lib/image";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { IoIosClose } from "react-icons/io";
import Masonry from "react-masonry-css";
import { FaSave } from "react-icons/fa";
import { CategoryMultiSelect } from "../select/category-multiselect";

export const breakpointColumnsObj = {
  default: 4,
  1980: 3,
  1400: 2,
  500: 1,
};

type ImagePreview = {
  base64: string;
  name: string;
  id: string;
};

const tags = [
  {
    value: "ui",
    label: "UI",
  },
  {
    value: "design",
    label: "Design",
  },
];

export default function PortfolioForm() {
  const [inputActive, setInputActive] = useState(false);
  const editorRef = useRef<TiptapEditorRef>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const { height, keyboardHeight } = useViewport();
  const handleUpdate = () => {
    if (inputActive && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  useEffect(() => {
    if (!images) return;
    const handleUploadCover = async (images: File[]) => {
      images.forEach(async (image) => {
        const base64 = await toBase64(image);
        setImagePreviews((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: image.name,
            base64: base64,
          },
        ]);
      });
    };

    handleUploadCover(images);
  }, [images]);
  const handleDeletePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };
  return (
    <form action="" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Label>Title</Label>
        <Input />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Category</Label>
        <CategoryMultiSelect
          options={tags}
          placeholder="Click to select tags"
          maxCount={3}
          onValueChange={(value) => {
            // setValue("tags", value);
            // debounceSave();
            console.log(value);
          }}
          defaultValue={["ui"]}

          // onTagUpdate={handleGetTags}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <Label>Description</Label>

        <div
          className={cn(
            "fixed left-0 min-h-[300px] w-screen transition-all",
            !inputActive && "hidden",
          )}
          style={{
            zIndex: 999,
            bottom: `${keyboardHeight}px`,
            height: `${height * 0.1}px`,
          }}
          ref={inputRef}
        >
          {editorRef.current && (
            <FormatMenuMobile
              editor={editorRef.current?.editor}
              setOpen={setOpen}
            />
          )}
        </div>
        <TiptapEditor
          ref={editorRef}
          className="max-h-[300px] min-h-[100px] overflow-y-auto"
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          onUpdate={handleUpdate}
        />
        {editorRef.current && editorRef.current.editor && (
          <LinkModal
            editor={editorRef.current.editor}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Gallery</Label>
        {imagePreviews && imagePreviews.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-6 flex gap-2" // Ensure there's a gap between columns
          >
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative my-2">
                <ImageContainerBlurClient
                  src={image.base64}
                  className="rounded-sm"
                />
                <Button
                  variant="icon"
                  type="button"
                  size="icon"
                  onClick={() => handleDeletePreview(image.id)}
                  className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
                >
                  <IoIosClose />
                </Button>
              </div>
            ))}
          </Masonry>
        )}

        {/* {imagePreviews?.map((image, index) => (
          <div key={index} className="relative">
            <ImageContainerBlurClient
              src={image.base64}
              className="h-16 w-16 rounded-sm"
            />
            <Button
              variant="icon"
              size="icon"
              onClick={() => handleDeletePreview(image.id)}
              className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
            >
              <IoIosClose />
            </Button>
          </div>
        ))} */}
        <MultiUploadButton setImage={setImages}>
          <Button
            variant={"icon"}
            className="relative h-16 w-16 rounded-sm border border-dashed hover:border-neutral-700/50 hover:bg-transparent"
          >
            <FaPlus />
          </Button>
        </MultiUploadButton>
      </div>
      <Button
        variant={"icon"}
        className="fixed bottom-4 right-5 flex items-center justify-center rounded-full bg-blue-800/50 p-0 px-4 hover:bg-blue-800/70 xl:right-10"
        // onClick={(e) => {
        //   e.preventDefault();
        // }}
      >
        <FaSave className="text-blue-400" />
        <p className="text-blue-400">Save</p>
      </Button>
    </form>
  );
}

"use client";
import React, { useRef, useState } from "react";
import { Label } from "../label";
import { CategoryMultiSelect } from "../select/category-multiselect";
import { Input } from "../input";
import { Button } from "../button";
import { FaSave } from "react-icons/fa";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import useViewport from "@/hooks/use-viewport";
import { cn } from "@/lib/utils";
import FormatMenuMobile from "@/components/tiptap/format-menu-mobile";
import LinkModal from "../modal/link-modal";
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
export default function BlogForm() {
  const [inputActive, setInputActive] = useState(false);
  const editorRef = useRef<TiptapEditorRef>(null);
  const { height, keyboardHeight } = useViewport();
  const inputRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleUpdate = () => {
    if (inputActive && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  return (
    <form action="" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Label>Title</Label>
        <Input placeholder="My First Blog" variant="outline" />
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

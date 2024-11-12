"use client";

import { EditorContent } from "@tiptap/react";

import { Editor } from "@tiptap/core";

import { RefObject } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  editor: Editor | null;
  inputRef: RefObject<HTMLDivElement>;
};
const Tiptap = ({ editor }: Props) => {
  if (!editor) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <>
      <EditorContent
        // ref={inputRef}
        editor={editor}
        spellCheck="false"
      />
    </>
  );
};

export default Tiptap;

"use client";

import { EditorContent } from "@tiptap/react";

import { Editor } from "@tiptap/core";

import { RefObject } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  editor: Editor | null;
  inputRef: RefObject<HTMLDivElement>;
};
const Tiptap = ({ editor, inputRef }: Props) => {
  const onSubmit = async (content: any) => {
    // const { data, error } = await sendNote(content);
    // if (error) {
    //   console.log(error);
    // }
    // console.log("Success");
    // console.log(data);
  };
  if (!editor) {
    return (
      <div className="w-full justify-center flex h-[300px]  items-center">
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

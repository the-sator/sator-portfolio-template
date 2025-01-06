import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "@/public/style/blocknote.css";
import dynamic from "next/dynamic";
export const DynamicEditor = dynamic(() => import("./editor"), { ssr: false });

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  DragHandleButton,
  SideMenu,
  SideMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { useTheme } from "next-themes";
import { Block, BlockNoteEditor } from "@blocknote/core";
import { nanoid } from "nanoid";

export interface EditorRef {
  editor: BlockNoteEditor | null; // Ensure this matches the actual type
}

interface EditorProps {
  onChange?: () => void;
  content?: Block[] | null;
}

const Editor = forwardRef<EditorRef, EditorProps>((prop, ref) => {
  const { resolvedTheme } = useTheme();

  const initialContent = prop.content?.length
    ? prop.content
    : [
        {
          id: nanoid(10),
          type: "paragraph",
          props: {
            backgroundColor: "default",
            textColor: "default",
            textAlignment: "left",
            level: 2,
          },
          content: [],
          children: [],
        } as Block,
      ];
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useCreateBlockNote({
    uploadFile: async (file) => {
      console.log(file);
      return "Uploaded";
    },
    initialContent,
  });

  // Expose the editor instance to the parent
  useImperativeHandle(ref, () => ({
    editor,
  }));

  return (
    <BlockNoteView
      ref={editorRef}
      editor={editor}
      data-color-scheme={resolvedTheme}
      data-sator-theme
      sideMenu={false}
      className="min-h-[100px]"
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
    </BlockNoteView>
  );
});

Editor.displayName = "Editor";

export default Editor;

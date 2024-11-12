import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { JSONContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight, all } from "lowlight";
import { json } from "stream/consumers";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { Note } from "@/types/note.type";
type Props = {
  note: Note;
};

export default function RenderHTML({ note }: Props) {
  const output = useMemo(() => {
    return generateHTML(
      {
        type: "doc",
        content: note.content as JSONContent[],
      },
      [
        StarterKit.configure({ codeBlock: false }),
        BulletList.configure({
          keepMarks: true,
        }),
        Heading.configure({ levels: [1, 2] }).extend({
          levels: [1, 2],
          renderHTML({ node, HTMLAttributes }) {
            const level = this.options.levels.includes(node.attrs.level)
              ? node.attrs.level
              : this.options.levels[0];
            const classes: { [key: number]: string } = {
              1: "text-3xl",
              2: "text-2xl",
            };
            return [
              `h${level}`,
              mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: `${classes[level]}`,
              }),
              0,
            ];
          },
        }),

        CodeBlockLowlight.configure({
          lowlight: createLowlight(all),
          defaultLanguage: "ts",
          languageClassPrefix: "ts",
        }),
        Link.configure({
          openOnClick: true,
          linkOnPaste: true,
          autolink: true,
          defaultProtocol: "https",
        }),
      ]
    );
  }, [json]);

  return (
    <section
      className="tiptap text-sm"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}

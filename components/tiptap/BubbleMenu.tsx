import { Editor, BubbleMenu } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Code,
  Heading2Icon,
  List,
  ListOrdered,
  Heading as HeadingIcon,
  Italic,
  Quote,
  Strikethrough,
} from "lucide-react";
import { BiCodeBlock } from "react-icons/bi";
import React from "react";
import { cn } from "@/lib/utils";
type BubbleMenuProps = {
  editor: Editor | null;
};
export default function TipTapBubbleMenu({ editor }: BubbleMenuProps) {
  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <ToggleGroup
            type="multiple"
            className="flex justify-start gap-1 dark:bg-slate-700"
          >
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                "rounded-none p-1 dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("bold") && "is-active",
              )}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("italic") && "is-active",
              )}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("strike") && "is-active",
              )}
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="code"
              aria-label="Toggle code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("code") && "is-active",
              )}
            >
              <Code className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="codeBlock"
              aria-label="Toggle codeblock"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("codeBlock") && "is-active",
              )}
            >
              <BiCodeBlock className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value=""
              aria-label="Toggle blockquote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("blockquote") && "is-active",
              )}
            >
              <Quote className="h-4 w-4" />
            </ToggleGroupItem>
            <div className="mx-1 h-6 w-[1px] bg-white/50"></div>
            <ToggleGroupItem
              value="h1"
              aria-label="Toggle h1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("heading", { level: 1 }) && "is-active",
              )}
            >
              <HeadingIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Toggle h2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("heading", { level: 2 }) && "is-active",
              )}
            >
              <Heading2Icon className="h-4 w-4" />
            </ToggleGroupItem>
            <div className="mx-1 h-6 w-[1px] bg-white/50"></div>

            <ToggleGroupItem
              value="bulletList"
              aria-label="BulletList"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("bulletList") && "is-active",
              )}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="orderedList"
              aria-label="OrderedList"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                "rounded-none dark:text-white dark:hover:bg-slate-800/70",
                editor.isActive("orderedList") && "is-active",
              )}
            >
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
    </>
  );
}

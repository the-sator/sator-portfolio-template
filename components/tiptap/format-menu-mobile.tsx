import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RiCodeBlock } from "react-icons/ri";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListOl,
  FaUpload,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { TbBlockquote } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";
import UploadButton from "../ui/button/upload-button";
type Props = {
  editor: Editor | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type CommandKeys =
  | "toggleBold"
  | "toggleItalic"
  | "toggleCode"
  | "toggleCodeBlock"
  | "toggleHeading"
  | "toggleBlockquote"
  | "toggleBulletList"
  | "toggleOrderedList";

type FormatOption = {
  value: string;
  icon: React.ComponentType<{ size: number }>;
  command: CommandKeys;
  args?: Record<string, unknown>;
};

const formatOptions: FormatOption[] = [
  { value: "bold", icon: FaBold, command: "toggleBold" },
  { value: "italic", icon: FaItalic, command: "toggleItalic" },
  { value: "code", icon: FaCode, command: "toggleCode" },
  { value: "codeBlock", icon: RiCodeBlock, command: "toggleCodeBlock" },
  {
    value: "heading1",
    icon: LuHeading1,
    command: "toggleHeading",
    args: { level: 1 },
  },
  {
    value: "heading2",
    icon: LuHeading2,
    command: "toggleHeading",
    args: { level: 2 },
  },
  { value: "blockquote", icon: TbBlockquote, command: "toggleBlockquote" },
  {
    value: "bulletList",
    icon: MdFormatListBulleted,
    command: "toggleBulletList",
  },
  { value: "orderedList", icon: FaListOl, command: "toggleOrderedList" },
];
export default function FormatMenuMobile({ editor, setOpen }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>(
    {},
  );

  // useEffect(() => {
  //   if (!image) return;

  //   const handleUploadImage = async () => {
  //     if (!image) return;

  //     const dataUrl = await blobToBase64(image);

  //     const transaction = editor!.state.tr;
  //     const pos = transaction.selection.anchor;

  //     editor!
  //       .chain()
  //       .setImage({
  //         src: dataUrl,
  //         alt: image.name,
  //       })
  //       .run();

  //     const compressedImage = await compressImage(image, {
  //       maxSizeMB: 0.5,
  //     });
  //     const { publicUrl, error } = await uploadImage(compressedImage);
  //     if (error) {
  //       editor!
  //         .chain()
  //         .deleteRange({ from: pos, to: pos + 1 })
  //         .run();

  //       toast({
  //         title: "Error Uploading Image",
  //         description: error.message,
  //       });
  //       return;
  //     }

  //     editor!
  //       .chain()
  //       .focus()
  //       .deleteRange({ from: pos, to: pos + 1 })
  //       .setImage({
  //         src: publicUrl!,
  //         alt: image.name,
  //       })
  //       .run();
  //   };

  //   handleUploadImage();
  // }, [image, editor, toast]);

  const updateActiveFormats = useCallback(() => {
    if (editor) {
      const newActiveFormats = formatOptions.reduce(
        (acc, option) => {
          if (option.value.startsWith("heading")) {
            acc[option.value] = editor.isActive("heading", {
              level: option.args?.level,
            });
          } else if (option.args) {
            acc[option.value] = editor.isActive(option.value, option.args);
          } else {
            acc[option.value] = editor.isActive(option.value);
          }
          return acc;
        },
        {} as Record<string, boolean>,
      );

      setActiveFormats(newActiveFormats);
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.on("transaction", updateActiveFormats);
      return () => {
        editor.off("transaction", updateActiveFormats);
      };
    }
  }, [editor, updateActiveFormats]);

  const handleFormatToggle = useCallback(
    (option: FormatOption) => {
      if (editor) {
        const command = option.command as CommandKeys;
        if (option.args) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (editor.chain().focus() as any)[command](option.args).run();
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (editor.chain().focus() as any)[command]().run();
        }

        // Let the editor finish applying the command, then update formats.
      }
    },
    [editor],
  );
  // useEffect(() => {
  //   console.log("activeFormats:", activeFormats);
  // }, [activeFormats]);

  if (!editor) {
    return (
      <div className="flex w-full justify-center">
        <AiOutlineLoading3Quarters className="animate-spin" size={14} />
      </div>
    );
  }

  return (
    <div className="absolute bottom-1 left-1/2 flex w-full -translate-x-1/2 gap-2 overflow-x-auto rounded-sm bg-popover px-4 pb-3 pt-2 sm:w-fit">
      <ToggleGroup variant="outline" type="multiple">
        {formatOptions.map((option) => {
          return (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={`Toggle ${option.value}`}
              onMouseDown={(e) => e.preventDefault()}
              className={cn(
                "data-[state=on]:bg-tranparent",
                activeFormats[option.value] ? "is-active" : "",
              )}
              onClick={() => handleFormatToggle(option)}
            >
              <option.icon size={16} />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      <Button
        variant="outline"
        className="h-9 w-9 p-2"
        onPointerDown={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <FaLink size={14} />
      </Button>
      <UploadButton
        className="flex flex-shrink-0 items-center justify-center border transition-all hover:bg-accent"
        setImage={setImage}
      >
        <FaUpload />
      </UploadButton>
      {/* <LinkModal editor={editor} setInputActive={setInputActive} /> */}
    </div>
  );
}

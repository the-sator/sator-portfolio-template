import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Editor } from "@tiptap/react";
import { FaLink } from "react-icons/fa";
import { InputWithLabel } from "../input-label";
import { Button } from "../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";

type Props = {
  editor: Editor;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export default function LinkModal({ editor, setOpen, open }: Props) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const addLink = () => {
    if (url === "") {
      return;
    }
    if (editor.state.selection.empty) {
      const reconstructURL = !url.includes("http") ? "https://" + url : url;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: reconstructURL })
        .command(({ tr }) => {
          tr.insertText(text);
          return true;
        })
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    // Reset the form
    setUrl("");
    setText("");
    setOpen(false);
    editor.commands.unsetMark("link");
    setShouldShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".context-menu")) {
        setShouldShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            placeholder="Vault"
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <InputWithLabel
            placeholder="https://vault-staging.vercel.app/"
            label="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            variant="default"
            size="sm"
            className="mt-6"
            onClick={addLink}
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

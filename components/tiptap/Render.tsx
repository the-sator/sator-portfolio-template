import { BlockNode } from "@/types/text.type";
import { renderNote } from "@/components/tiptap/renderNote";
import React from "react";
import { notFound } from "next/navigation";
// import { Json } from "@/database.types";
// import NotAvailable from "../ui/not-availble";
type Props = {
  content: JSON | null;
};
export default async function Render({ content }: Props) {
  if (!content) {
    notFound();
  }

  if (Array.isArray(content)) {
    return (
      <div className="tiptap text-sm">
        {content.map((block, index) => {
          return (
            <React.Fragment key={index}>
              {renderNote(block as BlockNode)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return <h1>Invalid Content Format {content?.toString()}</h1>;
}

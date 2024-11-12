import { NodeViewWrapper, NodeViewProps, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { dropImagePlugin, UploadFn } from "@/components/tiptap/dropImagePlugin";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import { useEffect, useState } from "react";

// Define a React component to handle image rendering
const CustomImage = ({ node, updateAttributes }: NodeViewProps) => {
  const { src, alt } = node.attrs;

  return (
    <NodeViewWrapper>
      <ImageContainerBlurClient
        src={src}
        alt={alt || "User Uploaded Image"}
        blur
        className="my-4"
      />
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

// Extend the Tiptap Image extension to use the custom component
export const CustomImageExtension = (
  compressedSize: number,
  uploadFn?: UploadFn,
) => {
  return Node.create({
    name: "image",
    group: "inline",
    draggable: true,
    inline: true,
    allowBase64: false,
    addAttributes: () => ({
      src: {},
      alt: { default: null },
      title: { default: null },
    }),
    parseHTML: () => [
      {
        tag: "img[src]",
        getAttrs: (dom) => {
          if (typeof dom === "string") return {};
          const element = dom as HTMLImageElement;

          return {
            src: element.getAttribute("src"),
            title: element.getAttribute("title"),
            alt: element.getAttribute("alt"),
          };
        },
      },
    ],
    parseDOM: [
      {
        tag: "img[src]",
        getAttrs: (dom: HTMLElement) => ({
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt"),
        }),
      },
    ],
    toDOM: (node: any) => ["img", node.attrs],
    renderHTML: ({ HTMLAttributes }) => ["img", HTMLAttributes],
    // @ts-ignore
    addCommands() {
      return {
        setImage:
          (attrs) =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const position = selection.$head
              ? selection.$head.pos
              : selection.$to.pos;

            const node = this.type.create(attrs);
            const transaction = state.tr.insert(position, node);
            return dispatch?.(transaction);
          },
      };
    },
    addNodeView() {
      return ReactNodeViewRenderer(CustomImage);
    },
    addProseMirrorPlugins() {
      //TODO: Create Upload Function
      return [dropImagePlugin(compressedSize)];
    },
  });
};

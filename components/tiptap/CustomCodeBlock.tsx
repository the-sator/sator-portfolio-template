import React, { ChangeEventHandler, useState } from "react";
import {
  NodeViewWrapper,
  NodeViewContent,
  NodeViewProps,
  Node,
  mergeAttributes,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { LANGUAGE } from "@/constant/language";
import CopyButton from "../ui/button/copy-button";
import { Combobox } from "../ui/combobox";
// import './CodeBlockComponent.scss'

const CustomCodeBlock = (props: NodeViewProps) => {
  const { updateAttributes, extension, node } = props;
  const [selectedLanguage, setSelectedLanguage] = useState(
    node.attrs.language || "js",
  );

  const [title, setTitle] = useState(node.attrs.title || "index.js"); //   const availableLanguages = listLanguages();

  const onChange = (value: string) => {
    setSelectedLanguage(value);
    updateAttributes({ language: value });
  };
  return (
    <NodeViewWrapper className="code-block">
      <div>
        <div className="flex w-full justify-between rounded-tl-sm rounded-tr-sm bg-primary px-2">
          <div className="flex gap-2">
            <Combobox
              options={LANGUAGE}
              className="h-6 w-fit min-w-[100px] border-0 bg-transparent px-2 text-[10px] hover:bg-neutral-700/50"
              label="Select a language"
              onChange={onChange}
              defaultValue={selectedLanguage}
            />

            <Input
              className="h-6 w-[100px] bg-transparent !text-[10px] hover:bg-accent-foreground/10"
              value={title}
              onChangeCapture={(e) => {
                setTitle(e.currentTarget.value);
                updateAttributes({ title: e.currentTarget.value });
              }}
            />
          </div>
          <CopyButton
            text={node.textContent}
            className="h-6 w-fit rounded-md bg-transparent p-1 text-neutral-400 hover:bg-neutral-700/50"
          />
        </div>
        <pre className={`language-${selectedLanguage}`}>
          <NodeViewContent as="code" />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

// export const CodeBlockExtension = Node.create({
//   name: "codeBlock",

//   group: "block",

//   content: "text*",

//   marks: "",

//   code: true,

//   defining: true,

//   addAttributes() {
//     return {
//       language: {
//         default: "js",
//         parseHTML: (element) => element.getAttribute("data-language"),
//         renderHTML: (attributes) => {
//           if (!attributes.language) {
//             return {};
//           }
//           return {
//             "data-language": attributes.language,
//           };
//         },
//       },
//       title: {
//         default: "index",
//         parseHTML: (element) => element.getAttribute("data-title"),
//         renderHTML: (attributes) => {
//           if (!attributes.title) {
//             return {};
//           }
//           return {
//             "data-title": attributes.title,
//           };
//         },
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "pre",
//       },
//     ];
//   },

//   // renderHTML({ HTMLAttributes }) {
//   //   return ["pre", mergeAttributes(HTMLAttributes), ["code", 0]];
//   // },

//   addNodeView() {
//     return ReactNodeViewRenderer(CustomCodeBlock);
//   },
// });

export const CodeBlockExtension = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      language: {
        default: "js",
        parseHTML: (element) => element.getAttribute("data-language"),
        renderHTML: (attributes) => {
          if (!attributes.language) {
            return {};
          }
          return {
            "data-language": attributes.language,
          };
        },
      },
      title: {
        default: "index",
        parseHTML: (element) => element.getAttribute("data-title"),
        renderHTML: (attributes) => {
          if (!attributes.title) {
            return {};
          }
          return {
            "data-title": attributes.title,
          };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomCodeBlock);
  },
});

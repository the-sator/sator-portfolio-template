import ImageContainerBlur from "@/components/ui/image/image-container-blur";
import {
  BlockNode,
  CONTENT_TYPE,
  TEXT_MARK_TYPE,
  TextNode,
} from "@/types/text.type";
import hljs from "highlight.js";
import React, { JSX } from "react";
import CopyButton from "@/components/ui/button/copy-button";
import { LANGUAGE } from "@/constant/language";

export function renderNote(node: BlockNode): JSX.Element {
  switch (node.type) {
    case CONTENT_TYPE.IMAGE:
      return (
        <div className="mb-4">
          <ImageContainerBlur src={node.attrs.src} alt={node.attrs.alt} />
        </div>
      );
    case CONTENT_TYPE.PARAGRAPH:
      if (node.content) {
        return <div>{renderContent(node.content)}</div>;
      } else return <br className="h-[20px]" />;

    case CONTENT_TYPE.TEXT:
      return <>{renderText(node)}</>;

    case CONTENT_TYPE.CODE_BLOCK:
      const language = node.attrs?.language || "ts";
      const title = node.attrs?.title || "index";
      const text = node.content.map((data) => {
        return data.text;
      });
      const highlightedCode = hljs.highlight(node.content[0].text, {
        language: language,
      }).value;
      return (
        <div>
          <div className="flex w-full justify-between rounded-tl-sm rounded-tr-sm bg-neutral-800 px-2">
            <div className="flex items-center gap-10">
              <p className="text-[10px] text-neutral-500">
                {LANGUAGE.find((lang) => lang.value === language)?.label}
              </p>
              <p className="text-[10px] text-neutral-500">{title}</p>
            </div>
            <CopyButton
              text={text.toString()}
              className="h-6 w-fit rounded-md bg-transparent p-1 text-neutral-400 hover:bg-neutral-700/50"
            />
          </div>
          <pre className={`language-${language} mt-0`}>
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </div>
      );

    case CONTENT_TYPE.BULLET_LIST:
      return (
        <ul>
          {node.content.map((listItemNode, index) => (
            <li key={index}>{renderNote(listItemNode)}</li>
          ))}
        </ul>
      );

    case CONTENT_TYPE.ORDERED_LIST:
      return (
        <ol>
          {node.content.map((listItemNode, index) => (
            <li key={index}>{renderNote(listItemNode)}</li>
          ))}
        </ol>
      );

    case CONTENT_TYPE.LIST_ITEM:
      return (
        <>
          {node.content.map((contentNode, index) => (
            <React.Fragment key={index}>
              {renderNote(contentNode)}
            </React.Fragment>
          ))}
        </>
      );

    case CONTENT_TYPE.BLOCKQUOTE:
      return (
        <>
          <blockquote>
            {node.content.map((contentNode, index) => (
              <React.Fragment key={index}>
                {renderNote(contentNode)}
              </React.Fragment>
            ))}
          </blockquote>
        </>
      );
    case CONTENT_TYPE.HEADING:
      const HeadingTag = `h${node.attrs?.level}` as keyof JSX.IntrinsicElements;
      return <HeadingTag>{renderContent(node.content)}</HeadingTag>;

    case CONTENT_TYPE.HARD_BREAK:
      return <br />;

    default:
      return <>{node}</>;
  }
}

const renderText = (node: TextNode): React.ReactElement => {
  if (!node.text) {
    return <></>;
  }

  let renderedText: React.ReactElement = <span>{node.text}</span>;

  if (node.marks && node.marks.length > 0) {
    renderedText = node.marks.reduce((acc, mark) => {
      switch (mark.type) {
        case TEXT_MARK_TYPE.BOLD:
          return <strong>{acc}</strong>;
        case TEXT_MARK_TYPE.ITALIC:
          return <em>{acc}</em>;
        case TEXT_MARK_TYPE.CODE:
          return <code className="w-fit px-2">{acc}</code>;
        case TEXT_MARK_TYPE.LINK:
          return (
            <a href={mark.attrs?.href} target={mark.attrs?.target}>
              {acc}
            </a>
          );
        default:
          return acc;
      }
    }, renderedText);
  }

  return <span>{renderedText}</span>;
};

const renderContent = (content?: BlockNode[]): React.ReactNode => {
  if (!content) return null;
  return content.map((node, index) => (
    <React.Fragment key={index}>{renderNote(node)}</React.Fragment>
  ));
};

export function renderNoteDescription(node: BlockNode) {
  switch (node.type) {
    case CONTENT_TYPE.PARAGRAPH:
    case CONTENT_TYPE.CODE_BLOCK: {
      return (
        <>
          {node.content.map((textNode, index) => (
            <p
              key={index}
              className="line-clamp-2 w-full text-xs text-neutral-500"
            >
              {textNode.text}
            </p>
          ))}
        </>
      );
    }
    case CONTENT_TYPE.IMAGE: {
      return (
        <p className="line-clamp-4 w-full text-xs text-neutral-500">Image</p>
      );
    }
    case CONTENT_TYPE.HEADING: {
      return (
        <p className="w-full text-xs text-neutral-500">
          {node.content.map((textNode, index) => (
            <span key={index}>{textNode.text}</span>
          ))}
        </p>
      );
    }
    case CONTENT_TYPE.BULLET_LIST:
    case CONTENT_TYPE.ORDERED_LIST: {
      return (
        <ul className="list-disc">
          {node.content.map((listItemNode, index) => (
            <li key={index}>
              {listItemNode.content.map((paragraphNode, pIndex) => (
                <span key={pIndex} className="text-xs text-neutral-500">
                  {paragraphNode.content
                    .map((textNode) => textNode.text)
                    .join(" ")}
                </span>
              ))}
            </li>
          ))}
        </ul>
      );
    }
    case CONTENT_TYPE.BLOCKQUOTE: {
      return (
        <blockquote className="text-xs text-neutral-500">
          {node.content.map((paragraphNode, index) => (
            <p key={index}>
              {paragraphNode.content.map((textNode) => textNode.text).join(" ")}
            </p>
          ))}
        </blockquote>
      );
    }
    case CONTENT_TYPE.HARD_BREAK: {
      return <br />;
    }
    default:
      return null;
  }
}

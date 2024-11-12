export enum CONTENT_TYPE {
  PARAGRAPH = "paragraph",
  TEXT = "text",
  CODE_BLOCK = "codeBlock",
  HEADING = "heading",
  IMAGE = "image",
  BULLET_LIST = "bulletList",
  ORDERED_LIST = "orderedList",
  BLOCKQUOTE = "blockquote",
  HARD_BREAK = "hardBreak",
  LIST_ITEM = "listItem",
}

export enum TEXT_MARK_TYPE {
  CODE = "code",
  CODE_BLOCK = "code_block",
  BOLD = "bold",
  ITALIC = "italic",
  LINK = "link",
  TEXT = "text ",
}

export type BlockNode =
  | CodeBlockNode
  | ParagraphNode
  | ImageNode
  | HeadingNode
  | BulletListNode
  | OrderedListNode
  | ListItemNode
  | BlockQuoteNode
  | HardBreakNode
  | TextNode;

type CodeBlockNode = {
  type: CONTENT_TYPE.CODE_BLOCK;
  attrs: {
    language?: string;
    title?: string;
  };
  content: TextNode[];
};

type HeadingNode = {
  type: CONTENT_TYPE.HEADING;
  attrs: { level: number };
  content: TextNode[];
};

type HardBreakNode = {
  type: CONTENT_TYPE.HARD_BREAK;
};
type BulletListNode = {
  type: CONTENT_TYPE.BULLET_LIST;
  content: ListItemNode[];
};

type OrderedListNode = {
  type: CONTENT_TYPE.ORDERED_LIST;
  attrs: { start: number };
  content: ListItemNode[];
};

type ListItemNode = {
  type: CONTENT_TYPE.LIST_ITEM;
  content: ParagraphNode[];
};
type BlockQuoteNode = {
  type: CONTENT_TYPE.BLOCKQUOTE;
  content: ParagraphNode[];
};

type ParagraphNode = {
  type: CONTENT_TYPE.PARAGRAPH;
  content: TextNode[];
};

type ImageNode = {
  type: CONTENT_TYPE.IMAGE;
  attrs: ImageAttribute;
};

export type TextNode = {
  type: CONTENT_TYPE.TEXT;
  text: string;
  marks?: TextMark[];
};

export type TextMark = {
  type: TEXT_MARK_TYPE;
  attrs?: LinkAttribute;
};

type LinkAttribute = {
  href: string;
  target: string;
};

type ImageAttribute = {
  alt: string;
  src: string;
  title: string | null;
};

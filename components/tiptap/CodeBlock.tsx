"use client";
import hljs from "highlight.js";
import { useEffect } from "react";
import "highlight.js/styles/default.css";

type Props = {
  code: string;
};
export default function CodeBlock({ code }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, [code]);
  // const out = await codeToHtml(code, {
  //   lang: "ts",
  //   theme: "tokyo-night",
  // });

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}

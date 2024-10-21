"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});
import "#fe/css/uiw-react-markdown-editor.css";

interface IProps {
  content: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<IProps> = ({ content, onChange }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", theme ?? "light");
  }, [theme]);

  return (
    <MarkdownEditor
      height="calc(100vh - 281px)"
      value={content}
      onChange={onChange}
      enableScroll
      visible
    />
  );
};

export default Editor;

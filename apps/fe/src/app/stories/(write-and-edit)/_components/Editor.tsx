"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useFormContext } from "react-hook-form";
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
  const { watch } = useFormContext();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", theme ?? "light");
  }, [theme]);

  return (
    <div className="relative">
      <MarkdownEditor
        height="calc(100vh - 281px)"
        className="whitespace-normal"
        value={content}
        onChange={onChange}
        enableScroll
        visible
      />

      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {watch("content").length} / 300
      </span>
    </div>
  );
};

export default Editor;

"use client";

import { FadeText } from "@sd/ui/magics";

const Section03: React.FC = () => {
  return (
    <FadeText
      className="block whitespace-pre-line break-keep text-center text-sm font-bold text-zinc-600 sm:text-lg"
      direction="down"
      framerProps={{
        show: { transition: { delay: 0.6 } },
      }}
      text={"다른 사람의 이야기를 보거나 당신의 이야기를 간단하게 작성해봐요"}
    />
  );
};

export default Section03;

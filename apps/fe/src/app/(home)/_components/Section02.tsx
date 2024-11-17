"use client";

import { FadeText } from "@sd/ui/magics";

const Section02: React.FC = () => {
  return (
    <FadeText
      className="block whitespace-pre-line break-keep text-center text-xl font-bold sm:text-2xl lg:text-3xl"
      direction="down"
      framerProps={{
        show: { transition: { delay: 0.4 } },
      }}
      text={
        "당신이 알고 있는 사소한 이야기라도 좋아요\n이야기를 다른 사람들과 공유해봐요"
      }
    />
  );
};

export default Section02;

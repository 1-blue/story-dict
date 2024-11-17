"use client";

import { PulsatingButton } from "@sd/ui/magics";
import Link from "next/link";

const Section01: React.FC = () => {
  return (
    <Link href="/post" className="flex justify-center">
      <PulsatingButton className="bg-primary text-white dark:bg-primary dark:text-white">
        이야기하기
      </PulsatingButton>
    </Link>
  );
};

export default Section01;

"use client";

import Link from "next/link";
import { PulsatingButton } from "@sd/ui/magics";

import { routes } from "#fe/constants";

const Section01: React.FC = () => {
  return (
    <Link href={routes.story.url} className="flex justify-center">
      <PulsatingButton className="bg-primary text-white dark:bg-primary dark:text-white">
        이야기하기
      </PulsatingButton>
    </Link>
  );
};

export default Section01;

"use client";

import Section01 from "#fe/app/(NoSidebar)/(home)/_components/Section01";
import Section02 from "#fe/app/(NoSidebar)/(home)/_components/Section02";
import Section03 from "#fe/app/(NoSidebar)/(home)/_components/Section03";
import Section04 from "#fe/app/(NoSidebar)/(home)/_components/Section04";

const HomePage: React.FC = () => {
  return (
    <article className="mt-8 flex flex-col gap-8">
      <Section01 />

      <div className="flex flex-col gap-3">
        <Section02 />
        <Section03 />
      </div>
      <Section04 />
    </article>
  );
};

export default HomePage;

"use client";

import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { Label, SidebarGroup, SidebarGroupContent, SidebarInput } from "@sd/ui";

const SidebarSearchGroup: React.FC = () => {
  const router = useRouter();

  const onSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const formData = new FormData(e.target);
    const keyword = formData.get("keyword")?.toString().trim();

    if (!keyword) return;

    router.push(`/post/search/${keyword}`);
  };

  return (
    <form onSubmit={onSearch}>
      <SidebarGroup className="py-1">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            type="search"
            id="keyword"
            name="keyword"
            placeholder="ex) 윤슬"
            className="pl-8"
          />
          <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};

export default SidebarSearchGroup;

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Button,
  CommandSeparator,
} from "@sd/ui";

import { apis } from "#fe/apis";
import { routes } from "#fe/constants";
import useMe from "#fe/hooks/queries/users/useMe";
import { getRoutesByAccessLevel } from "#fe/libs/getRoutesByAccessLevel";

const SearchDialogButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="relative mx-2 my-1 flex items-center justify-between rounded-md border px-2 py-1.5"
        onClick={() => setOpen(true)}
        variant="ghost"
      >
        <div className="flex items-center gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <span className="text-xs">검색..</span>
        </div>
        <span className="kbd text-xs">⌘ K</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen} />
    </>
  );
};

interface IProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dialog: React.FC<IProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  // ⌘ + K 감지
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [onOpenChange]);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  useDebounce(() => setDebouncedKeyword(keyword), 500, [keyword]);
  const onChangeKeyword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value.trim());
  };
  const onSelectPost = (title: string) => {
    onOpenChange(false);
    router.push(routes.story.detail.url(title));
  };
  const { data: stories } = useQuery({
    enabled: !!debouncedKeyword,
    queryKey: apis.stories.getManyKeyword.key({
      params: { keyword: debouncedKeyword },
    }),
    queryFn: () =>
      apis.stories.getManyKeyword.fn({
        params: { keyword: debouncedKeyword },
      }),
    select: (data) => data.payload,
  });

  const { isLoggedIn, isLoggedOut, logOutMutateAsync } = useMe();
  const filteredRoutes = useMemo(
    () => getRoutesByAccessLevel({ isLoggedIn, isLoggedOut }),
    [isLoggedIn, isLoggedOut],
  );

  const onSelectPage = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };
  const onSelectLogOut = () => {
    onOpenChange(false);
    logOutMutateAsync({});
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="정보 검색">
      <CommandInput placeholder="ex) 윤슬" onChangeCapture={onChangeKeyword} />
      <CommandList>
        <CommandGroup heading="게시글 검색">
          {stories?.map((post) => (
            <CommandItem
              key={post.title}
              onSelect={() => onSelectPost(post.title)}
              className="flex items-center gap-2"
            >
              <LightBulbIcon className="size-4" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{post.title}</span>
                <span className="text-xs text-muted-foreground">
                  {post.summary}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="페이지">
          {filteredRoutes.main.map((route) => (
            <CommandItem
              key={route.url}
              onSelect={() => onSelectPage(route.url)}
              className="flex items-center gap-2"
            >
              <route.OIcon className="size-4" />
              <span>{route.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="인증">
          {filteredRoutes.auth.map((route) => (
            <CommandItem
              key={route.url}
              onSelect={() => onSelectPage(route.url)}
              className="flex items-center gap-2"
            >
              <route.OIcon className="size-4" />
              <span>{route.label}</span>
            </CommandItem>
          ))}
          {filteredRoutes.auth.length === 0 && (
            <CommandItem
              onSelect={onSelectLogOut}
              className="flex items-center gap-2"
            >
              <span>로그아웃</span>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
      <CommandEmpty>검색된 내용이 없습니다...🥲</CommandEmpty>
    </CommandDialog>
  );
};

export default SearchDialogButton;

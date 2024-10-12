"use client";

import Link from "next/link";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
} from "@xstory/ui";

import { AccessLevel, RouteGroup } from "#fe/types";
import { ROUTES } from "#fe/constants";
import useMe from "#fe/hooks/useMe";
import { ThemeToggle } from "@xstory/ui/theme";

/** 인증 경로 */
const AUTH_ROUTES = ROUTES.filter((route) => route.group === RouteGroup.AUTH);
/** 로그아웃시에만 접근 가능한 경로 */
const UNAUTHENTICATED_AUTH_ROUTES = AUTH_ROUTES.filter((route) =>
  [AccessLevel.PUBLIC, AccessLevel.UNAUTHENTICATED].includes(route.accessLevel),
);
/** 로그인시에만 접근 가능한 경로 */
const AUTHENTICATED_AUTH_ROUTES = AUTH_ROUTES.filter((route) =>
  [AccessLevel.PUBLIC, AccessLevel.AUTHENTICATED].includes(route.accessLevel),
);

/** 컨텐츠 경로 */
const CONTENT_ROUTES = ROUTES.filter(
  (route) => route.group === RouteGroup.CONTENT,
);
/** 로그아웃시에만 접근 가능한 경로 */
const UNAUTHENTICATED_CONTENT_ROUTES = CONTENT_ROUTES.filter((route) =>
  [AccessLevel.PUBLIC, AccessLevel.UNAUTHENTICATED].includes(route.accessLevel),
);
/** 로그인시에만 접근 가능한 경로 */
const AUTHENTICATED_CONTENT_ROUTES = CONTENT_ROUTES.filter((route) =>
  [AccessLevel.PUBLIC, AccessLevel.AUTHENTICATED].includes(route.accessLevel),
);

const Header = () => {
  const { me, logOutMutation } = useMe();

  const onLogOut = async () => {
    try {
      await logOutMutation.mutateAsync();
    } catch (error) {
      console.error("🚫 Error 로그아웃 >> ", error);
    }
  };

  const authRoutes = me
    ? AUTHENTICATED_AUTH_ROUTES
    : UNAUTHENTICATED_AUTH_ROUTES;

  const contentRoutes = me
    ? AUTHENTICATED_CONTENT_ROUTES
    : UNAUTHENTICATED_CONTENT_ROUTES;

  return (
    <header className="flex w-60 flex-col divide-y-2 border-l">
      <section className="p-4">
        <Input placeholder="ex) ..." />
      </section>
      {me && (
        <section className="relative flex items-center gap-2 p-4">
          <Avatar>
            <AvatarImage src={me.image?.url} />
            <AvatarFallback>{me.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-xs text-muted-foreground">[ {me.role} ]</span>
            <span className="truncate">{me.nickname}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <DotsVerticalIcon className="h-5 w-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="*:cursor-pointer">
                <DropdownMenuItem>
                  프로필
                  <DropdownMenuShortcut>⇧⌘2</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="*:cursor-pointer">
                <DropdownMenuItem onClick={onLogOut}>
                  로그아웃
                  <DropdownMenuShortcut>⇧⌘0</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      )}
      <ul className="p-1">
        {contentRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors hover:bg-foreground/10"
          >
            <route.Icon className="h-5 w-5" />
            <span className="text-sm">{route.label}</span>
          </Link>
        ))}
      </ul>
      <ul className="p-1">
        {authRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors hover:bg-foreground/10"
          >
            <route.Icon className="h-5 w-5" />
            <span className="text-sm">{route.label}</span>
          </Link>
        ))}
      </ul>
      <ul className="flex flex-1 items-end p-1">
        <ThemeToggle className="m-2 ml-auto" />
      </ul>
    </header>
  );
};

export default Header;

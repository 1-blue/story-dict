"use client";

import { CommandLineIcon as OCommandLineIcon } from "@heroicons/react/24/outline";
import {
  CommandLineIcon as SCommandLineIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Avatar,
  AvatarFallback,
  AvatarImage,
  SidebarGroupContent,
  Button,
  toast,
  SidebarInput,
  Label,
} from "@sd/ui";
import useMe from "#fe/hooks/useMe";
import Link from "next/link";
import { handleError } from "#fe/libs/handleError";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@sd/ui/libs";
import { breadcrumbToKoreanMap } from "#fe/libs/mappings";
import { ROUTES } from "#fe/constants/routes";

const MySidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    setBreadcrumbs(pathname.split("/").slice(1).map(decodeURIComponent));
  }, [pathname]);

  const { me, logOutMutate, isLoggedIn, isLoggedOut } = useMe();

  const onLogOut = async () => {
    try {
      await logOutMutate({});
      toast.success("로그아웃 되었습니다..🥲", {
        description: "다음에 또 이용해주세요!",
      });
    } catch (error) {
      handleError({ error, title: "로그아웃 실패" });
    }
  };
  const onSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const formData = new FormData(e.target);
    const keyword = formData.get("keyword")?.toString().trim();

    if (!keyword) return;

    router.push(`/post/search/${keyword}`);
  };

  const filteredPostRoutes = useMemo(() => {
    return ROUTES.post
      .map((route) => ({
        ...route,
        subRoutes: route.subRoutes?.filter(
          (subRoute) =>
            subRoute.accessLevel === "public" ||
            (isLoggedIn && subRoute.accessLevel === "authenticated") ||
            (isLoggedOut && subRoute.accessLevel === "unauthenticated"),
        ),
      }))
      .filter(
        (route) =>
          route.accessLevel === "public" ||
          (isLoggedIn && route.accessLevel === "authenticated") ||
          (isLoggedOut && route.accessLevel === "unauthenticated") ||
          (route.subRoutes && route.subRoutes.length > 0),
      );
  }, [isLoggedIn, isLoggedOut]);
  const filteredAuthRoutes = useMemo(() => {
    return ROUTES.auth.filter(
      (route) =>
        (isLoggedIn && route.accessLevel === "authenticated") ||
        (isLoggedOut && route.accessLevel === "unauthenticated"),
    );
  }, [isLoggedIn, isLoggedOut]);

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="py-4 pl-2">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link
                  href="/"
                  className="transition-colors hover:bg-muted-foreground/20"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                    {pathname === "/" ? (
                      <SCommandLineIcon className="h-8 w-8" />
                    ) : (
                      <OCommandLineIcon className="h-8 w-8" />
                    )}
                  </div>
                  <div className="grid flex-1 gap-0.5 text-left text-sm leading-tight">
                    <span className="truncate text-base font-semibold">
                      이야기 일지
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      당신의 이야기를 공유해요
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
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
          <SidebarGroup>
            <SidebarGroupLabel>게시글</SidebarGroupLabel>
            <SidebarMenu>
              {filteredPostRoutes.map((route) => (
                <Collapsible key={route.label} asChild defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild tooltip={route.label}>
                        <div
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-muted-foreground/20",
                            pathname.includes(route.path) && "!text-primary",
                          )}
                        >
                          {pathname.includes(route.path) ? (
                            <route.SIcon />
                          ) : (
                            <route.OIcon />
                          )}
                          <span>{route.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {route.subRoutes?.length && (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {route.subRoutes?.map((subRoute) => (
                              <SidebarMenuSubItem key={subRoute.label}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={subRoute.path}
                                    className={cn(
                                      "transition-colors hover:bg-muted-foreground/20",
                                      pathname.includes(subRoute.path) &&
                                        "bg-primary/10 *:!text-primary",
                                    )}
                                  >
                                    {pathname.includes(subRoute.path) ? (
                                      <subRoute.SIcon />
                                    ) : (
                                      <subRoute.OIcon />
                                    )}
                                    <span>{subRoute.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {filteredAuthRoutes.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>인증</SidebarGroupLabel>
              <SidebarMenu>
                {filteredAuthRoutes.map((route) => (
                  <Collapsible key={route.label} asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={route.label}>
                        <Link
                          href={route.path}
                          className={cn(
                            "transition-colors hover:bg-muted-foreground/20",
                            pathname.includes(route.path) && "!text-primary",
                          )}
                        >
                          {pathname.includes(route.path) ? (
                            <route.SIcon />
                          ) : (
                            <route.OIcon />
                          )}
                          <span>{route.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {ROUTES.information
                  .filter((route) => !route.hidden)
                  .map((route) => (
                    <SidebarMenuItem key={route.label}>
                      <SidebarMenuButton asChild size="sm">
                        <Link
                          target="_blank"
                          href={route.path}
                          className={cn(
                            "transition-colors hover:bg-muted-foreground/20",
                            pathname.includes(route.path) && "!text-primary",
                          )}
                        >
                          {pathname.includes(route.path) ? (
                            <route.SIcon />
                          ) : (
                            <route.OIcon />
                          )}
                          <span>{route.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {me && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={me.image?.url} alt={me.nickname} />
                        <AvatarFallback className="rounded-lg">
                          {me.nickname.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {me.nickname}
                        </span>
                        <span className="truncate text-xs">{me.email}</span>
                      </div>
                      <ChevronUpDownIcon className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-10 w-10 rounded-lg">
                          <AvatarImage src={me.image?.url} alt={me.nickname} />
                          <AvatarFallback className="rounded-lg">
                            {me.nickname.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {me.nickname}
                          </span>
                          <span className="truncate text-xs">{me.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onLogOut}
                        className="flex-1 cursor-pointer items-center justify-start gap-1 px-1.5"
                      >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                        <span>로그아웃</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}
      </Sidebar>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <header className="sticky top-4 z-10 flex shrink-0 items-center gap-2 rounded-md border bg-sidebar-background p-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-1 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb}>
                    <BreadcrumbItem className="flex gap-2">
                      {index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink asChild>
                          <Link
                            href={`/${breadcrumbs.slice(0, index + 1).join("/")}`}
                          >
                            {breadcrumbToKoreanMap[breadcrumb] || breadcrumb}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>
                          {breadcrumbToKoreanMap[breadcrumb] || breadcrumb}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <SidebarInset className="rounded-lg p-4">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MySidebar;

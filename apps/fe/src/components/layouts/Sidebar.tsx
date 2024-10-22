"use client";

import {
  CommandLineIcon as OCommandLineIcon,
  LockOpenIcon as OLockOpenIcon,
  KeyIcon as OKeyIcon,
  NewspaperIcon as ONewspaperIcon,
  HomeIcon as OHomeIcon,
} from "@heroicons/react/24/outline";
import {
  CommandLineIcon as SCommandLineIcon,
  LockOpenIcon as SLockOpenIcon,
  KeyIcon as SKeyIcon,
  NewspaperIcon as SNewspaperIcon,
  HomeIcon as SHomeIcon,
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
} from "@xstory/ui";
import useMe from "#fe/hooks/useMe";
import Link from "next/link";
import { handleError } from "#fe/libs/handleError";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { cn } from "@xstory/ui/libs";
import { breadcrumbToKoreanMap } from "#fe/libs/mappings";

const nav = {
  main: [
    {
      title: "게시글",
      url: "/post",
      oIcon: OHomeIcon,
      sIcon: SHomeIcon,
      isActive: true,
      items: [
        {
          title: "글쓰기",
          url: "/post/write",
        },
        {
          title: "랜덤",
          url: "/post/random",
        },
        {
          title: "카테고리",
          url: "/post/category",
        },
      ],
    },
  ],
  auth: [
    {
      title: "로그인",
      url: "/login",
      oIcon: OLockOpenIcon,
      sIcon: SLockOpenIcon,
    },
    {
      title: "회원가입",
      url: "/signup",
      oIcon: OKeyIcon,
      sIcon: SKeyIcon,
    },
  ],
  information: [
    {
      title: "오픈 카톡방",
      url: "/FIXME:카톡방만들기",
      oIcon: OHomeIcon,
      sIcon: SHomeIcon,
    },
    {
      title: "피드백",
      url: "/FIXME:구글설문조사+구글시트",
      oIcon: OHomeIcon,
      sIcon: SHomeIcon,
    },
  ],
};

const MySidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    setBreadcrumbs(pathname.split("/").slice(1).map(decodeURIComponent));
  }, [pathname]);

  const { me, logOutMutation } = useMe();

  const onLogOut = async () => {
    try {
      await logOutMutation.mutateAsync();
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
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-lg font-semibold">
                      xstory
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
              {nav.main.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <div
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-muted-foreground/20",
                            pathname.includes(item.url) && "!text-primary",
                          )}
                        >
                          {pathname.includes(item.url) ? (
                            <item.sIcon />
                          ) : (
                            <item.oIcon />
                          )}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length && (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={subItem.url}
                                    className={cn(
                                      "transition-colors hover:bg-muted-foreground/20",
                                      pathname.includes(subItem.url) &&
                                        "bg-primary/10 !text-primary",
                                    )}
                                  >
                                    <span>{subItem.title}</span>
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
          <SidebarGroup>
            <SidebarGroupLabel>인증</SidebarGroupLabel>
            <SidebarMenu>
              {nav.auth.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        href={item.url}
                        className={cn(
                          "transition-colors hover:bg-muted-foreground/20",
                          pathname.includes(item.url) && "!text-primary",
                        )}
                      >
                        {pathname.includes(item.url) ? (
                          <item.sIcon />
                        ) : (
                          <item.oIcon />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.information.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <Link
                        href={item.url}
                        className={cn(
                          "transition-colors hover:bg-muted-foreground/20",
                          pathname.includes(item.url) && "!text-primary",
                        )}
                      >
                        {pathname.includes(item.url) ? (
                          <item.sIcon />
                        ) : (
                          <item.oIcon />
                        )}
                        <span>{item.title}</span>
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

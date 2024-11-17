"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandLineIcon as SCommandLineIcon } from "@heroicons/react/24/solid";
import { CommandLineIcon as OCommandLineIcon } from "@heroicons/react/24/outline";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@sd/ui";

import { routes } from "#fe/constants";

const SidebarTop: React.FC = () => {
  const pathname = usePathname();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link
              href={routes.home.url}
              className="transition-colors hover:bg-muted-foreground/20"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                {pathname === "/" ? (
                  <SCommandLineIcon className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <OCommandLineIcon className="h-8 w-8 text-muted-foreground" />
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
  );
};

export default SidebarTop;

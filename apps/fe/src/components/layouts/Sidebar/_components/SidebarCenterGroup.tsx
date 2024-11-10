"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@sd/ui";
import { cn } from "@sd/ui/libs";

import type { IRoute } from "#fe/types";

interface IProps {
  label: string;
  routes: IRoute[];
  defaultOpen?: boolean;
}

const SidebarCenterGroup: React.FC<IProps> = ({
  label,
  routes,
  defaultOpen,
}) => {
  const pathname = usePathname();

  if (routes.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {routes.map((route) => {
          const hasSubRoutes = route.subRoutes?.length;

          return (
            <Collapsible key={route.label} asChild defaultOpen={defaultOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild tooltip={route.label}>
                    {hasSubRoutes ? (
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
                    ) : (
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
                    )}
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
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarCenterGroup;

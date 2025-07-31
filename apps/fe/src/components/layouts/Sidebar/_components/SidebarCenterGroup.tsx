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

  // 정확한 경로 매칭 함수
  const isExactMatch = (url: string) => pathname === url;

  // 특수 패턴 매칭 확인 (activeWhenMatching 속성 활용)
  const isSpecialPatternMatch = (route: IRoute) => {
    if (!route.activeWhenMatching?.length) return false;

    return route.activeWhenMatching.some((pattern) => pattern.test(pathname));
  };

  // 라우트가 active 상태인지 확인 (정확한 매칭 또는 특수 패턴 매칭)
  const isRouteActive = (route: IRoute) => {
    return isExactMatch(route.url) || isSpecialPatternMatch(route);
  };

  // 서브라우트가 있는 경우의 부모 active 상태 확인
  const isParentActive = (route: IRoute) => {
    if (!route.subRoutes?.length) {
      return isRouteActive(route);
    }

    // 서브라우트 중 하나라도 active면 부모도 active
    return route.subRoutes.some((subRoute) => isExactMatch(subRoute.url));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {routes.map((route) => {
          const hasSubRoutes = route.subRoutes?.length;
          const parentIsActive = isParentActive(route);

          return (
            <Collapsible key={route.label} asChild defaultOpen={defaultOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild tooltip={route.label}>
                    {hasSubRoutes ? (
                      <div
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-muted-foreground/20",
                          parentIsActive && "!text-primary",
                        )}
                      >
                        {parentIsActive ? <route.SIcon /> : <route.OIcon />}
                        <span>{route.label}</span>
                      </div>
                    ) : (
                      <Link
                        href={route.url}
                        className={cn(
                          "transition-colors hover:bg-muted-foreground/20",
                          isRouteActive(route) && "!text-primary",
                        )}
                      >
                        {isRouteActive(route) ? (
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
                        {route.subRoutes.map((subRoute) => (
                          <SidebarMenuSubItem key={subRoute.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subRoute.url}
                                className={cn(
                                  "transition-colors hover:bg-muted-foreground/20",
                                  isExactMatch(subRoute.url) &&
                                    "bg-primary/10 *:!text-primary",
                                )}
                              >
                                {isExactMatch(subRoute.url) ? (
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

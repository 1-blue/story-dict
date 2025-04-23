"use client";

import React, { useMemo } from "react";

import { Sidebar, SidebarContent } from "@sd/ui";

import useMe from "#fe/hooks/queries/users/useMe";
import { NAV_ROUTES } from "#fe/constants";
import SidebarCenterGroup from "#fe/components/layouts/Sidebar/_components/SidebarCenterGroup";
import SidebarInfoGroup from "#fe/components/layouts/Sidebar/_components/SidebarInfoGroup";
import SidebarBottom from "#fe/components/layouts/Sidebar/_components/SidebarBottom";
import SidebarTop from "#fe/components/layouts/Sidebar/_components/SidebarTop";
import SearchDialogButton from "#fe/components/SearchDialogButton";

const MySidebar: React.FC = () => {
  const { isLoggedIn, isLoggedOut } = useMe();

  const filteredPostRoutes = useMemo(() => {
    return NAV_ROUTES.main
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
    return NAV_ROUTES.auth.filter(
      (route) =>
        (isLoggedIn && route.accessLevel === "authenticated") ||
        (isLoggedOut && route.accessLevel === "unauthenticated"),
    );
  }, [isLoggedIn, isLoggedOut]);

  return (
    <Sidebar variant="inset" className="py-4 pl-2">
      <SidebarTop />

      <SidebarContent>
        <SearchDialogButton />
        <SidebarCenterGroup label="이야기" routes={filteredPostRoutes} />
        <SidebarCenterGroup label="인증" routes={filteredAuthRoutes} />
        <SidebarInfoGroup routes={NAV_ROUTES.information} />
      </SidebarContent>

      <SidebarBottom />
    </Sidebar>
  );
};

export default MySidebar;

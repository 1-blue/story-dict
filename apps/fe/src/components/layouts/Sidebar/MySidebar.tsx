"use client";

import React, { useMemo } from "react";

import { Sidebar, SidebarContent } from "@sd/ui";

import useMe from "#fe/hooks/useMe";
import { ROUTES } from "#fe/constants/routes";
import SidebarCenterGroup from "#fe/components/layouts/Sidebar/_components/SidebarCenterGroup";
import SidebarInfoGroup from "#fe/components/layouts/Sidebar/_components/SidebarInfoGroup";
import SidebarBottom from "#fe/components/layouts/Sidebar/_components/SidebarBottom";
import SidebarSearchGroup from "#fe/components/layouts/Sidebar/_components/SidebarSearchGroup";
import SidebarTop from "#fe/components/layouts/Sidebar/_components/SidebarTop";

const MySidebar: React.FC = () => {
  const { isLoggedIn, isLoggedOut } = useMe();

  const filteredPostRoutes = useMemo(() => {
    return ROUTES.main
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
    <Sidebar variant="inset" className="py-4 pl-2">
      <SidebarTop />

      <SidebarContent>
        <SidebarSearchGroup />
        <SidebarCenterGroup
          label="게시글"
          routes={filteredPostRoutes}
          defaultOpen
        />
        <SidebarCenterGroup label="인증" routes={filteredAuthRoutes} />
        <SidebarInfoGroup routes={ROUTES.information} />
      </SidebarContent>

      <SidebarBottom />
    </Sidebar>
  );
};

export default MySidebar;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "@sd/ui";

import { breadcrumbToKoreanMap } from "#fe/libs/mappings";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    setBreadcrumbs(pathname.split("/").slice(1).map(decodeURIComponent));
  }, [pathname]);

  return (
    <header className="sticky top-4 z-10 flex shrink-0 items-center gap-2 rounded-md border bg-sidebar-background p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs[0] === "" && (
              <BreadcrumbLink asChild>
                <Link href="/">메인</Link>
              </BreadcrumbLink>
            )}
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
  );
};

export default Header;
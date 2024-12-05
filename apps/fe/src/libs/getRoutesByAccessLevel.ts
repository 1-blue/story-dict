import { NAV_ROUTES } from "#fe/constants";

interface UserStatus {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
}
export const getRoutesByAccessLevel = (userStatus: UserStatus) => {
  const { isLoggedIn, isLoggedOut } = userStatus;

  return {
    main: NAV_ROUTES.main
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
      ),
    auth: NAV_ROUTES.auth.filter(
      (route) =>
        route.accessLevel === "public" ||
        (isLoggedIn && route.accessLevel === "authenticated") ||
        (isLoggedOut && route.accessLevel === "unauthenticated"),
    ),
    information: NAV_ROUTES.information.filter(
      (route) =>
        route.accessLevel === "public" ||
        (isLoggedIn && route.accessLevel === "authenticated") ||
        (isLoggedOut && route.accessLevel === "unauthenticated"),
    ),
  };
};

export const fetchInstance = (url: string, options: RequestInit) =>
  fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

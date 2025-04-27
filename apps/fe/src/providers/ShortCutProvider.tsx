"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { toast } from "@sd/ui";
import useMe from "#fe/hooks/queries/users/useMe";
import { handleError } from "#fe/libs/handleError";
import { routes } from "#fe/constants";

const ShortCutProvider: React.FC = () => {
  const router = useRouter();
  const { me, logOutMutation } = useMe();

  useHotkeys("shift+mod+0", async () => {
    if (!me) return;

    try {
      await logOutMutation.mutateAsync({});

      toast.success("로그아웃 되었습니다.", {
        description: "다음에 또 만나요!",
      });
    } catch (error) {
      handleError({ error });
    }
  });
  useHotkeys("shift+mod+1", () => router.push(routes.home.url));
  useHotkeys("shift+mod+2", () => router.push(""));

  return null;
};
export default ShortCutProvider;

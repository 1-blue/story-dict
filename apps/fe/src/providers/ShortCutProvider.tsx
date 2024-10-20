"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import useMe from "#fe/hooks/useMe";
import { toast } from "@xstory/ui";
import { handleError } from "#fe/libs/handleError";

const ShortCutProvider: React.FC = () => {
  const router = useRouter();
  const { me, logOutMutation } = useMe();

  useHotkeys("shift+mod+0", async () => {
    if (!me) return;

    try {
      await logOutMutation.mutateAsync();

      toast.success("로그아웃 되었습니다.", {
        description: "다음에 또 만나요!",
      });
    } catch (error) {
      handleError({ error, title: "로그아웃 실패" });
    }
  });
  useHotkeys("shift+mod+1", () => router.push("/"));
  useHotkeys("shift+mod+2", () => router.push(""));

  return null;
};
export default ShortCutProvider;

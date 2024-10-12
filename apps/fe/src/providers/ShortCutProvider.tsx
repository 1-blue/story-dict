"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@xstory/ui/hooks";

import { PATHS } from "#fe/constants";
import useMe from "#fe/hooks/useMe";

const ShortCutProvider: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { me, logOutMutation } = useMe();

  useHotkeys("shift+mod+0", async () => {
    if (!me) return;

    try {
      await logOutMutation.mutateAsync();

      toast({
        type: "ADD_TOAST",
        title: "로그아웃 되었습니다.",
        description: "다음에 또 만나요!",
      });
    } catch (error) {
      console.error("🚫 Error 로그아웃 >> ", error);

      toast({
        variant: "destructive",
        type: "ADD_TOAST",
        title: "로그아웃에 실패했습니다.",
        description: "새로고침 후 다시 시도해주세요!",
      });
    }
  });
  useHotkeys("shift+mod+1", () => router.push(PATHS.HOME));
  useHotkeys("shift+mod+2", () => router.push(PATHS.ME.PROFILE));

  return null;
};
export default ShortCutProvider;

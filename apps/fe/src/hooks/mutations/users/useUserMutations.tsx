import { useRouter } from "next/navigation";

import { routes } from "#fe/constants";
import { $tempAPI } from "#fe/openapis";

const useUserMutations = () => {
  const router = useRouter();

  const registerMutation = $tempAPI.useMutation("post", "/apis/v1/users", {
    onSuccess() {
      router.replace(routes.story.url);
    },
  });

  return { registerMutation };
};

export default useUserMutations;

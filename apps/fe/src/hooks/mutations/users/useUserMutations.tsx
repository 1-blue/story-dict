import { useRouter } from "next/navigation";

import { routes } from "#fe/constants";
import { openapi } from "#fe/apis";

const useUserMutations = () => {
  const router = useRouter();

  const registerMutation = openapi.useMutation("post", "/apis/v1/users", {
    onSuccess() {
      router.replace(routes.story.url);
    },
  });

  return { registerMutation };
};

export default useUserMutations;

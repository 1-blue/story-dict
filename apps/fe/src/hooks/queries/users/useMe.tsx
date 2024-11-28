import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  apis,
  IPostLogInAPIRequest,
  IPostLogInAPIResponse,
  IPostLogOutAPIRequest,
  IPostLogOutAPIResponse,
} from "#fe/apis";
import { toast } from "@sd/ui";

const useMe = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: apis.users.getMe.key(),
    queryFn: apis.users.getMe.fn,
    select: (data) => data.payload,
  });

  const mutation = useMutation({
    mutationFn: apis.users.getMe.fn,
  });
  const { mutateAsync: logInMutateAsync } = useMutation<
    IPostLogInAPIResponse,
    Error,
    IPostLogInAPIRequest
  >({
    mutationFn: ({ body }) => apis.auth.login.fn({ body }),
    onSuccess(user) {
      queryClient.setQueryData(apis.users.getMe.key(), user);

      toast.success("로그인 성공", {
        description: "로그인 되었습니다.",
      });
    },
  });
  const { mutateAsync: logOutMutateAsync } = useMutation<
    IPostLogOutAPIResponse,
    Error,
    IPostLogOutAPIRequest
  >({
    mutationFn: apis.auth.logout.fn,
    onSuccess() {
      queryClient.setQueryData(apis.users.getMe.key(), null);

      toast.success("로그아웃 성공", {
        description: "로그아웃 되었습니다.",
      });
    },
  });

  return {
    me: data,
    meIsLoading: isLoading,
    meMutation: mutation,
    logInMutateAsync,
    logOutMutateAsync,
    isLoggedIn: !!data,
    isLoggedOut: !data,
  };
};

export default useMe;

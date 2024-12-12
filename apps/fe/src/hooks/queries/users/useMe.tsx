import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  apis,
  IGetMeAPIResponse,
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
      queryClient.setQueryData<null, string[], IGetMeAPIResponse>(
        apis.users.getMe.key(),
        { payload: user.payload },
      );

      toast.success("로그인 성공 👋", {
        description: "저희 서비스를 이용해주셔서 감사합니다.",
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
      queryClient.setQueryData(apis.users.getMe.key(), {});

      toast.success("로그아웃 되었습니다..🥲", {
        description: "다음에 또 이용해주세요!",
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

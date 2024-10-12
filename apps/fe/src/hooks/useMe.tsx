import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMeAPI,
  postLogInAPI,
  PostLogInAPIRequest,
  PostLogInAPIResponse,
  postLogOutAPI,
} from "#fe/apis";

const useMe = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMeAPI(),
  });

  const mutation = useMutation({
    mutationFn: getMeAPI,
  });
  const logInMutation = useMutation<
    PostLogInAPIResponse,
    Error,
    PostLogInAPIRequest
  >({
    mutationFn: postLogInAPI,
    onSuccess(user) {
      // 로그인된 유저 정보 등록
      queryClient.setQueryData(["users", "me"], user);
    },
  });
  const logOutMutation = useMutation({
    mutationFn: postLogOutAPI,
    onSuccess() {
      // 로그인된 유저 정보 초기화
      queryClient.setQueryData(["users", "me"], null);
    },
  });

  return {
    me: data,
    meIsLoading: isLoading,
    meMutation: mutation,
    logInMutation,
    logOutMutation,
  };
};

export default useMe;

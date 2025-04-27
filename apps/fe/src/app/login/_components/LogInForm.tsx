"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import { Button, Form, RFHInput } from "@sd/ui";
import { schemas } from "@sd/utils";
import useMe from "#fe/hooks/queries/users/useMe";
import { handleError } from "#fe/libs/handleError";
import { useRouter } from "next/navigation";
import { routes } from "#fe/constants";

const DEV_DEFAULT_VALUES =
  process.env.NODE_ENV === "development"
    ? {
        email: "developer@sd.com",
        password: "123456789aA!",
      }
    : {
        email: "",
        password: "",
      };

const formSchema = z.object({
  email: schemas.email,
  password: schemas.password,
});

const LogInForm: React.FC = () => {
  const router = useRouter();
  const { me, logInMutation } = useMe();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEV_DEFAULT_VALUES,
  });

  const onSubmit = form.handleSubmit(
    async (body: z.infer<typeof formSchema>) => {
      if (me) return;

      try {
        await logInMutation.mutateAsync({ body });

        router.replace(routes.story.url);
      } catch (error) {
        handleError({ error });
      }
    },
  );
  const kakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/apis/v1/auth/login/kakao`;
  };

  const googleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/apis/v1/auth/login/google`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-12 flex w-1/2 min-w-80 max-w-lg flex-col gap-3"
      >
        <RFHInput
          name="email"
          label="이메일"
          placeholder="ex) akaps@gmail.com"
        />
        <RFHInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="ex) 123456"
        />
        <br />
        <Button type="submit">로그인</Button>
        <Button
          type="button"
          variant="outline"
          className="flex gap-2"
          onClick={kakaoLogin}
        >
          <LockOpen1Icon className="h-4 w-4" />
          <span>카카오 로그인</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex gap-2"
          onClick={googleLogin}
        >
          <LockOpen1Icon className="h-4 w-4" />
          <span>구글 로그인</span>
        </Button>
      </form>
    </Form>
  );
};

export default LogInForm;

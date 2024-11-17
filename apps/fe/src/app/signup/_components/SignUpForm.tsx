"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, RFHInput, toast } from "@sd/ui";
import { schemas } from "@sd/utils";

import { handleError } from "#fe/libs/handleError";
import useMe from "#fe/hooks/useMe";
import useUserMutations from "#fe/hooks/useUserMutations";
import { routes } from "#fe/constants";

const DEV_DEFAULT_VALUES =
  process.env.NODE_ENV === "development"
    ? {
        email: "developer11@sd.com",
        password: "123456789aA!",
        nickname: "로컬개발자",
        phone: "010-1234-5678",
      }
    : {
        email: "",
        password: "",
        nickname: "",
        phone: "",
      };

const formSchema = z.object({
  email: schemas.email,
  password: schemas.password,
  nickname: schemas.nickname,
  phone: schemas.phone,
});

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { logInMutate } = useMe();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEV_DEFAULT_VALUES,
  });

  const { createUserMutate } = useUserMutations();
  const onSubmit = form.handleSubmit(
    async (body: z.infer<typeof formSchema>) => {
      try {
        await createUserMutate({ body });
        await logInMutate({
          body: {
            email: body.email,
            password: body.password,
          },
        });

        router.replace(routes.post.url);

        toast.success("회원가입 성공", {
          description: `가입을 축하드립니다.\n로그인 후 메인 페이지로 이동됩니다!`,
        });
      } catch (error) {
        handleError({ error, title: "회원가입 실패" });
      }
    },
  );

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-12 flex w-1/2 min-w-80 max-w-lg flex-col gap-3"
      >
        <RFHInput
          name="email"
          label="아이디"
          placeholder="ex) akaps@gmail.com"
        />
        <RFHInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="ex) 123456"
        />
        <RFHInput name="nickname" label="닉네임" placeholder="ex) Akaps" />
        <RFHInput
          name="phone"
          label="휴대폰 번호"
          placeholder="ex) 010-1234-5678"
        />
        <br />
        <Button type="submit">회원가입</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;

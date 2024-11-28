import { toast } from "@sd/ui";

interface IHandleSuccessArgs {
  data: unknown;
}

/** 공용 성공 처리 함수 */
export const handleSuccess = ({ data }: IHandleSuccessArgs) => {
  console.log("🚀 >> data", data);
  if (!data) return;
  if (typeof data !== "object") return;
  if (!("toast" in data)) return;
  if (typeof data.toast !== "object") return;
  if (data.toast === null) return;
  if (!("title" in data.toast)) return;
  if (typeof data.toast.title !== "string") return;
  if (!("description" in data.toast)) return;
  if (typeof data.toast.description !== "string") return;

  toast.success(data.toast.title, {
    description: data.toast.description,
  });
};

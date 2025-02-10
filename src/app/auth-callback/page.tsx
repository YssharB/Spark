import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const page = async () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
    onSuccess: (success) => {
      if (success) {
      router.push(origin ? "/");
    }
  });
};

export default page;

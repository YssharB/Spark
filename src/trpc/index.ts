import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!(await user).id || !(await user).email)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    //check if user is in database
    const dbUser = await db.user.findFirst({
      where: {
        id: (await user).id,
      },
    });
    if (!dbUser) {
      //create user in database
      await db.user.create({
        data: {
          id: (await user).id,
          email: (await user).email!,
        },
      });
    }
    return { success: true };
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

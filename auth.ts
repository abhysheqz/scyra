import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signUpSchema, signInSchema } from "@/lib/validation";
import { comparePassword, hashPassword } from "@/lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        type: { label: "Type", type: "text" },
      },
      authorize: async (credentials) => {
        if (credentials?.type === "sign-up") {
          const { name, email, password } = await signUpSchema.parseAsync(
            credentials
          );

          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            throw new Error("EmailInUse");
          }

          const hashedPassword = await hashPassword({ password });

          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else if (credentials?.type === "sign-in") {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            throw new Error("UserNotFound");
          }

          if (!user.password) {
            throw new Error("OAuthAccountNotLinked");
          }

          // Verify password
          const isValid = comparePassword({
            password,
            hashedPassword: user.password,
          });

          if (!isValid) {
            throw new Error("InvalidPassword");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "database" },
  debug: true,
  callbacks: {
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

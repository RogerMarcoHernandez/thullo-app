import prisma from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
  callbacks: {
    async session({ session, user }) {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      });
    },
  },
} satisfies NextAuthOptions;

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
    }
  }
}

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/src/libs/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) {
          throw new Error("Missing email or password");
        }
        const userFound = await prisma.user.findUnique({ where: { email } });
        if (!userFound) throw new Error("Invalid credentials");
        const validPassword = await bcrypt.compare(
          password,
          userFound.password
        );
        if (!validPassword) throw new Error("Invalid credentials");
        return {
          email: userFound.email,
          name: userFound.username,
          id: userFound.id,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) session.user.id = token.sub as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

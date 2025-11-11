import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/src/libs/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
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
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };

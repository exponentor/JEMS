import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { verifyPassword } from "@/lib/auth/password";
import { getUserByEmail, upsertGithubStudent } from "@/lib/db/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    // Reads AUTH_GITHUB_ID / AUTH_GITHUB_SECRET from the environment.
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user?.passwordHash) return null;
        if (!verifyPassword(password, user.passwordHash)) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Persist GitHub sign-ups into our `users` collection as students.
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        if (!user.email) return false; // need an email to key the account
        const dbUser = await upsertGithubStudent({
          email: user.email,
          name: user.name,
          image: user.image,
        });
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as "student" | "company";
      }
      return session;
    },
  },
});

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 60 * 60 * 24 * 365 * 100,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 365 * 100,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // Step 1: Login untuk mendapatkan token
        const loginRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const loginData = await loginRes.json();

        if (!loginRes.ok || !loginData?.data?.token) return null;

        const token = loginData.data.token;

        // Step 2: Ambil data user dari /me
        const meRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        const meData = await meRes.json();
        const user = meData?.data?.user;

        if (!meRes.ok || !user) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          token: token,
          role: user.role,
          status: user.status,
          address: user.address,
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.email = user.email as string;
        token.name = user.name as string;
        token.token = user.token as string;
        token.role = user.role as "admin" | "member";
        token.status = user.status as string;
        if (user.address) token.address = user.address as string;
        if (user.phone) token.phone = user.phone as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.user.role = token.role;
        session.user.status = token.status;
        if (token.address) session.user.address = token.address;
        if (token.phone) session.user.phone = token.phone;
      }
      return session;
    },
  },
};

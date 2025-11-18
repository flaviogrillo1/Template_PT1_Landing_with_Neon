import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const { rows } = await pool.query(
          "SELECT id, email, password_hash, name FROM users WHERE email=$1 LIMIT 1",
          [credentials.email]
        );
        const user = rows[0];
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password_hash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name ?? null };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});

export const { handlers, auth } = handler;
export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";

if (!process.env.AUTH_GITHUB_ID) {
  throw new Error('Invalid/Missing environment variable: "AUTH_GITHUB_ID"');
}

if (!process.env.AUTH_GITHUB_SECRET) {
  throw new Error('Invalid/Missing environment variable: "AUTH_GITHUB_SECRET"');
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "abc123@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("Playground");
        const user: WithId<Document> | null = await db
          .collection("users")
          .findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Wrong Email.");
        }
        const pwcheck = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );
        if (!pwcheck) {
          throw new Error("Wrong Password.");
        }
        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.email = user.email;
        if (user.username) {
          token.user.username = user.username;
          token.user.points = user.points;
        } else {
          const index = user.email.indexOf("@");
          if (index !== -1) {
            token.user.username = user.email.slice(0, index);
          } else {
            token.user.username = "Unknown";
          }
          token.user.points = 5000;
          const client: MongoClient = await clientPromise;
          const db: Db = client.db("Playground");
          const gitHubUser: WithId<Document> | null = await db
            .collection("users")
            .findOne({ email: token.user.email });
          if (!gitHubUser) {
            await db.collection("users").insertOne({
              email: token.user.email,
              username: token.user.username,
              points: token.user.points,
            });
          }
        }
      }
      return token;
    },

    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },

    redirect: async ({ baseUrl }) => {
      return baseUrl;
    },
  },

  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

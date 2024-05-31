import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db("Playground");
        const user: WithId<Document> | null = await db
          .collection("user")
          .findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Wrong Email.");
        }
        return user;
      },
    }),
    GitHub,
  ],
});

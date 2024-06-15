import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  const client: MongoClient = await clientPromise;
  const db: Db = client.db("Playground");
  const user: WithId<Document> | null = await db
    .collection("users")
    .findOne({ email: session?.user?.email });

  return (
    <div className="pd-20">
      <h1>Welcome to Playground!</h1>
      {!session ? (
        <p>No user logged in...</p>
      ) : (
        <>
          <p>You are logged in!</p>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.username}</p>
          <p>Points: {user?.points}</p>
        </>
      )}
    </div>
  );
}

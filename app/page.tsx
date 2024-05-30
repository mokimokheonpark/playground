import type { Session } from "next-auth";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth";

export default async function Home() {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db("Playground");
  const test: WithId<Document> | null = await db
    .collection("tests")
    .findOne({ title: "test1" });
  const session: Session | null = await auth();

  return (
    <div className="pd-20">
      <h1>Welcome to Playground!</h1>
      <p>{test?.title}</p>
      <p>{test?.content}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
    </div>
  );
}

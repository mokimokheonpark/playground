import { Db, Document, MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function Home() {
  const client: MongoClient = await clientPromise;
  const db: Db = client.db("Playground");
  const test: WithId<Document> | null = await db
    .collection("tests")
    .findOne({ title: "test1" });

  return (
    <div className="pd-20">
      <h1>Welcome to Playground!</h1>
      <p>{test?.title}</p>
      <p>{test?.content}</p>
    </div>
  );
}

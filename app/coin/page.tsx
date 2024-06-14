import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import Coin from "../components/Coin";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function CoinPage() {
  const session: Session | null = await getServerSession(authOptions);
  const client: MongoClient = await clientPromise;
  const db: Db = client.db("Playground");
  const user: WithId<Document> | null = await db
    .collection("users")
    .findOne({ email: session?.user?.email });

  return (
    <div className="pd-20">
      <h3>Coin Flipping</h3>
      <Coin userEmail={user?.email} userPoints={user?.points} />
    </div>
  );
}

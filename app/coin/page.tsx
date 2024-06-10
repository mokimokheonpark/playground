import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import Coin from "../components/Coin";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function CoinPage() {
  const session: Session | null = await getServerSession(authOptions);
  let sessionUser: { email: string; username: string; points: number } | null =
    null;
  let user: WithId<Document> | null = null;
  if (session) {
    sessionUser = session.user as {
      email: string;
      username: string;
      points: number;
    };
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("Playground");
    user = await db.collection("users").findOne({ email: sessionUser.email });
  }

  return (
    <div className="pd-20">
      <h3>Coin Flipping</h3>
      <Coin sessionUser={sessionUser} />
    </div>
  );
}

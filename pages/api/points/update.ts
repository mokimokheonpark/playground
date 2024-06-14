import type { NextApiRequest, NextApiResponse } from "next";
import type { Db, MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("Playground");
      await db
        .collection("users")
        .updateOne(
          { email: req.body.userEmail },
          { $set: { points: req.body.updatedUserPoints } }
        );
      return res.status(200).json({ success: "Points have been updated." });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

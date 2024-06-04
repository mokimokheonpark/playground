import type { NextApiRequest, NextApiResponse } from "next";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.email === "") {
      return res.status(400).json({ error: "Email is required." });
    }
    if (req.body.password === "") {
      return res.status(400).json({ error: "Password is required." });
    }
    if (req.body.passwordCheck === "") {
      return res.status(400).json({ error: "Password-Check is required." });
    }
    if (req.body.password !== req.body.passwordCheck) {
      return res
        .status(400)
        .json({ error: "Password and Password-Check are not matched." });
    }
    if (req.body.username === "") {
      return res.status(400).json({ error: "Username is required." });
    }
    delete req.body.passwordCheck;
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("Playground");
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      await db.collection("users").insertOne(req.body);
      return res.redirect(307, "/");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

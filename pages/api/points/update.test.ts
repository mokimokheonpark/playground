import type { NextApiRequest } from "next";
import type { Db, Document, MongoClient, WithId } from "mongodb";
import handler from "./update";
import clientPromise from "@/lib/mongodb";

describe("points/update API route", () => {
  let req: NextApiRequest;
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  req = {
    method: "POST",
    body: {
      userEmail: "test@test.com",
      updatedUserPoints: 7000,
    },
  } as NextApiRequest;

  test("points have been successfully updated", async () => {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("Playground");
    const testUser: WithId<Document> | null = await db
      .collection("users")
      .findOne({ email: req.body.userEmail });
    const testUserInitialPoints: number = testUser?.points;
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: "Points have been updated.",
    });
    await db
      .collection("users")
      .updateOne(
        { email: req.body.userEmail },
        { $set: { points: testUserInitialPoints } }
      );
  });
});

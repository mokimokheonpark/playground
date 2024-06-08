import type { NextApiRequest } from "next";
import type { Db, MongoClient } from "mongodb";
import handler from "./signup";
import clientPromise from "@/lib/mongodb";

describe("signup API", () => {
  let req: NextApiRequest;
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(),
    redirect: jest.fn(),
  };

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        email: "abc123@example.com",
        password: "abcd1234",
        passwordCheck: "abcd1234",
        username: "testuser",
      },
    } as NextApiRequest;
  });

  test("email is required", async () => {
    req.body.email = "";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email is required." });
  });

  test("the email provided is not in a valid format", async () => {
    req.body.email = "invalid-format";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "The email provided is not in a valid format.",
    });
  });

  test("password is required", async () => {
    req.body.password = "";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is required." });
  });

  test("password-check is required", async () => {
    req.body.passwordCheck = "";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password-Check is required.",
    });
  });

  test("password and password-check are not matched", async () => {
    req.body.passwordCheck = "different-password";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password and Password-Check are not matched.",
    });
  });

  test("username is required", async () => {
    req.body.username = "";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Username is required." });
  });

  test("the email already exists", async () => {
    req.body.email = "already@exists.com";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "The email already exists.",
    });
  });

  test("successfully signed up", async () => {
    await handler(req, res);
    expect(res.redirect).toHaveBeenCalledWith(307, "/");
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("Playground");
    await db.collection("users").deleteOne({ email: req.body.email });
  });
});

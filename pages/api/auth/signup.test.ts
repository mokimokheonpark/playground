import type { NextApiRequest } from "next";
import handler from "./signup";

describe("signup API", () => {
  const req = {
    method: "POST",
    body: {
      email: "abc123@example.com",
      password: "abcd1234",
      passwordCheck: "abcd1234",
      username: "testuser",
    },
  } as NextApiRequest;
  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as any;

  test("email is required", async () => {
    req.body.email = "";
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email is required." });
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
});

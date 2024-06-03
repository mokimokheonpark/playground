import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.email === "") {
      res.status(400).json({ error: "Email is required." });
    }
    if (req.body.password === "") {
      res.status(400).json({ error: "Password is required." });
    }
    if (req.body.passwordCheck === "") {
      res.status(400).json({ error: "Password-Check is required." });
    }
    if (req.body.password !== req.body.passwordCheck) {
      res
        .status(400)
        .json({ error: "Password and Password-Check are not matched." });
    }
    if (req.body.username === "") {
      res.status(400).json({ error: "Username is required." });
    }
    delete req.body.passwordCheck;
  }
}

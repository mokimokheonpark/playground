"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        signIn();
      }}
    >
      Sign-In
    </span>
  );
}

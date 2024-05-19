"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      Sign-Out
    </span>
  );
}

import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  let sessionUser: { email: string; username: string } | null = null;
  if (session) {
    sessionUser = session.user as {
      email: string;
      username: string;
    };
  }

  return (
    <div className="pd-20">
      <h1>Welcome to Playground!</h1>
      {!sessionUser ? (
        <p>No user logged in...</p>
      ) : (
        <>
          <p>You are logged in!</p>
          <p>Email: {sessionUser.email}</p>
          <p>Username: {sessionUser.username}</p>
        </>
      )}
    </div>
  );
}

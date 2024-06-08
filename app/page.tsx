import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);
  let sessionUser;
  if (session) {
    sessionUser = session.user as {
      email: string;
      username: string;
    };
  }

  return (
    <div className="pd-20">
      <h1>Welcome to Playground!</h1>
      <p>{sessionUser?.email}</p>
      <p>{sessionUser?.username}</p>
    </div>
  );
}

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

if (!process.env.GH_OAUTH_CLIENT_ID) {
  throw new Error('Invalid/Missing environment variable: "GH_OAUTH_CLIENT_ID"');
}

if (!process.env.GH_OAUTH_CLIENT_SECRET) {
  throw new Error(
    'Invalid/Missing environment variable: "GH_OAUTH_CLIENT_SECRET"'
  );
}

if (!process.env.AUTH_SECRET) {
  throw new Error('Invalid/Missing environment variable: "AUTH_SECRET"');
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GH_OAUTH_CLIENT_ID,
      clientSecret: process.env.GH_OAUTH_CLIENT_SECRET,
    }),
  ],

  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

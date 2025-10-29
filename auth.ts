import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { api } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") return false;
      if (!account || !user) return false;

      const { success } = await api.auth.signInWithOauth({
        provider: account?.provider,
        providerAccountId: account?.providerAccountId,
        user: {
          name: user?.name || "",
          email: user?.email || "",
          image: user?.image || "",
          username:
            account.provider === "github"
              ? (profile?.login as string)
              : (user?.name?.toLocaleLowerCase() as string),
        },
      });
      return success;
    },

    //-------------------

    async jwt({ token, account }) {
      if (account) {
        const { success, data: accountData } =
          await api.accounts.getByProviderAccountId(account?.providerAccountId);

        if (!success || !accountData) return token;

        const userId = accountData?.userId;
        if (userId) token.sub = userId;
      }

      return token;
    },
    //-------------------

    async session({ session, token }) {
      session.user.id = token?.sub as string;
      return session;
    },
  },
});

// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import { api } from "./lib/api";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account?.type === "credentials") return false;
//       if (!account || !user) return false;

//       const { success } = await api.auth.signInWithOauth({
//         provider: account.provider,
//         providerAccountId: account.providerAccountId,
//         user: {
//           name: user?.name || "",
//           email: user?.email || "",
//           image: user?.image || "", // 🩹 small fix: use image, not email
//           username:
//             account.provider === "github"
//               ? (profile?.login as string)
//               : (user?.name?.toLowerCase() as string),
//         },
//       });

//       return success;
//     },

//     async jwt({ token, account }) {
//       if (account) {
//         const { success, data: accountData } =
//           await api.accounts.getByProviderAccountId(account?.providerAccountId);
//         if (success && accountData?.userId) token.sub = accountData.userId;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token?.sub as string;
//       return session;
//     },
//   },
// });

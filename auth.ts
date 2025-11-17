import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "./lib/api";
import validateBody from "./lib/vaildateBody";
import SigninWithCredentialsSchema from "./lib/schemas/SigninWithCredentialsSchema";
import bcrypt from "bcryptjs";

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
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials:", credentials);

        const validatedData = validateBody(
          SigninWithCredentialsSchema,
          credentials
        );

        console.log("validatedData:", validatedData);

        //@ts-expect-error

        const { email, password } = validatedData;

        const accountRes = await api.accounts.getByProviderAccountId(email);
        console.log("accountRes:", accountRes);

        if (!accountRes.success || !accountRes.data) return null;

        const existingAccount = accountRes.data;
        console.log("existingAccount:", existingAccount);

        const userRes = await api.users.getById(
          existingAccount.data.userId.toString()
        );
        console.log("userRes:", userRes);

        if (!userRes.success || !userRes.data) return null;

        const existingUser = userRes.data;
        console.log("existingUser:", existingUser);

        const ok = await bcrypt.compare(
          password,
          existingAccount.data.password
        );
        if (!ok) return null;
        console.log("password valid:", ok);

        return {
          id: existingUser.data._id,
          name: existingUser.data.name,
          email: existingUser.data.email,
          image: existingUser.data.image,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.type === "credentials") return true;
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
        const response = await api.accounts.getByProviderAccountId(
          account?.providerAccountId
        );

        if (
          ("success" in response && !response.success) ||
          ("data" in response && !response.data)
        ) {
          console.log(response.success);
          return token;
        } else if ("data" in response) {
          const userId = response?.data?.userId;
          console.log("BarnyarTharaka", response);
          if (userId) token.sub = userId;
        }
      }

      return token;
    },

    // async jwt({ token, user, account }) {
    //   if (user) {
    //     token.sub = user.id; // user object from authorize()
    //   }
    //   return token;
    // },

    //-------------------

    async session({ session, token }) {
      session.user.id = token.sub as string;
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

//   async authorize(credentials) {
//     let validatedData = validateBody(
//       SigninWithCredentialsSchema,
//       credentials
//     );
//     //@ts-expect-error
//     const { email, password } = validatedData;
//     const { data: existingAccount } =
//       await api.accounts.getByProviderAccountId(email);
//     if (!existingAccount) return null;

//     const { data: existingUser } = await api.users.getById(
//       existingAccount.userId.toString()
//     );
//     if (!existingUser) return null;

//     const isvalidPassword = await bcrypt.compare(
//       password,
//       existingAccount.password
//     );
//     if (!isvalidPassword) return null;
//     if (isvalidPassword) {
//       return {
//         id: existingUser._id,
//         name: existingUser.name,
//         email: existingUser.email,
//         image: existingUser.image,
//       };
//     }
//     return null;
//   },
// }),
// Credentials({
//   async authorize(credentials) {
//     const validatedData = validateBody(
//       SigninWithCredentialsSchema,
//       credentials
//     );

//     //@ts-expect-error

//     const { email, password } = validatedData;

//     const accountRes = await api.accounts.getByProviderAccountId(email);

//     if (!accountRes.success || !accountRes.data) return null;
//     const existingAccount = accountRes.data;

//     const userRes = await api.users.getById(
//       existingAccount.userId.toString()
//     );
//     if (!userRes.success || !userRes.data) return null;
//     const existingUser = userRes.data;

//     const ok = await bcrypt.compare(password, existingAccount.password);
//     if (!ok) return null;

//     return {
//       id: existingUser._id,
//       name: existingUser.name,
//       email: existingUser.email,
//       image: existingUser.image,
//     };
//   },
// }),

import fetchHandler from "./fetchHandler";

const API_URL = "http://localhost:3000/api";

export const api = {
  //-----------------user session--------------------

  users: {
    //to use api.users.getAll()
    getAll: () => fetchHandler(API_URL + "/users", { method: "GET" }),

    //to use api.users.create()
    create: (data: {
      name: string;
      username: string;
      email: string;
      image?: string;
    }) =>
      fetchHandler(API_URL + "/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    //to use api.users.getById(id)
    getById: (id: string) =>
      fetchHandler(API_URL + "/users/" + id, { method: "GET" }),

    //to use getByEmail(email)
    getByEmail: (email: string) =>
      fetchHandler(API_URL + "/users/email", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    //to use api.users.update(id,data)
    update: (
      id: string,
      data: { name?: string; username?: string; email?: string; image?: string }
    ) =>
      fetchHandler(API_URL + "/users/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    //to use api.users.delete(id)
    delete: (id: string) =>
      fetchHandler(API_URL + "/users/" + id, {
        method: "DELETE",
      }),
  },

  //--------------Accounts session--------------------

  accounts: {
    //to use api.accounts.getAll()
    getAll: () => fetchHandler(API_URL + "/accounts"),

    //to use api.accounts.create()
    create: (data: {
      userId: string;
      name: string;
      image?: string;
      password: string;
      provider: string;
      providerAccountId: string;
    }) =>
      fetchHandler(API_URL + "/accounts", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    //to use api.accounts.getById(id)
    getById: (id: string) => fetchHandler(API_URL + "/accounts/" + id),

    //to use getByProviderAccountId(id)
    getByProviderAccountId: (providerAccountId: string) =>
      fetchHandler(API_URL + "/accounts/providerId", {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),

    //to use api.accounts.update(id,data)
    update: (
      id: string,
      data: {
        userId?: string;
        name?: string;
        image?: string;
        password?: string;
        provider?: string;
        providerAccountId?: string;
      }
    ) =>
      fetchHandler(API_URL + "/accounts/" + id, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    //to use api.accounts.delete(id)
    delete: (id: string) =>
      fetchHandler(API_URL + "/accounts/" + id, {
        method: "DELETE",
      }),
  },

  //---------------Oauth session----------------------

  auth: {
    //to use api.auth.signInwithOauth(provider,providerAccountId,userInfo)
    signInWithOauth: ({
      provider,
      providerAccountId,
      user,
    }: {
      provider: string;
      providerAccountId: string;
      user: {
        name: string;

        email: string;
        image: string;
        username: string;
      };
    }) =>
      fetchHandler(API_URL + "/auth/signin-with-oauth", {
        method: "POST",
        body: JSON.stringify({
          provider,
          providerAccountId,
          user,
        }),
      }),
  },
};

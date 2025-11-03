"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

import ROUTES from "@/routes";
import Input from "../../components/input";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  let [formData, setFormData] = useState<FormData>({ email: "", password: "" });

  let [error, setError] = useState<string | null>(null);

  let router = useRouter();

  let login = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid Email or Password");
    } else {
      setError(null);
      router.push(ROUTES.HOME);
    }
  };
  return (
    <form
      action=""
      className="w-3/4 flex flex-col  justify-center space-y-5"
      onSubmit={login}
    >
      <h1 className="text-xl font-bold">Sign in to Dev Talk Forum</h1>
      <div className="w-full">
        <Input
          type="email"
          placeholder="E-mail Address"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="w-full">
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        {error && <p className="text-xs text-red-500 my-2">{error}</p>}
      </div>
      <Button variant="normal" type="submit">
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;

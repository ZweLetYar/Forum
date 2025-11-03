"use client";

import React, { useState } from "react";
import Input from "../../components/input";
import Button from "@/app/components/Button";
import { SignUpWithCredentials } from "@/lib/actions/SignUpWithCredentials.action";

import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

//type definition for formData
interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

//type definition for ValidationErrors
interface ValidationErrors {
  name?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
}

function RegisterForm() {
  let [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  let router = useRouter();

  let [errors, setErrors] = useState<ValidationErrors | null>(null);

  let register = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setErrors(null);
    let result = await SignUpWithCredentials(formData);

    if (result.success) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      router.push(ROUTES.HOME);
    } else {
      console.log(result);
      if ("details" in result && result.details) {
        setErrors((prev) => ({ ...prev, ...result.details }));
      }
      if (
        "message" in result &&
        result.message &&
        result.message === "Email already exists!"
      ) {
        setErrors((prev) => ({ ...prev, email: [result.message] }));
      }
      if (
        "message" in result &&
        result.message &&
        result.message === "Username already exists!"
      ) {
        setErrors((prev) => ({ ...prev, username: [result.message] }));
      }
    }
  };

  return (
    <form
      action=""
      className="w-3/4 flex flex-col  justify-center space-y-5"
      onSubmit={register}
    >
      <h1 className="text-xl font-bold">Register to Dev Talk Forum</h1>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {errors?.name && (
          <p className="text-xs text-red-500 my-2">{errors.name[0]}</p>
        )}
      </div>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        {errors?.username && (
          <p className="text-xs text-red-500 my-2">{errors.username[0]}</p>
        )}
      </div>
      <div className="w-full">
        <Input
          type="email"
          placeholder="E-mail Address"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        {errors?.email && (
          <p className="text-xs text-red-500 my-2">{errors.email[0]}</p>
        )}
      </div>
      <div className="w-full">
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        {errors?.password && (
          <p className="text-xs text-red-500 my-2">{errors.password[0]}</p>
        )}
      </div>
      <Button variant="normal" type="submit">
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;

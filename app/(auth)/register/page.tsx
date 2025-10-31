import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";

function page() {
  return (
    <div className="flex  h-screen bg-[#222831] text-white">
      <div className="flex flex-col items-center justify-center text-lg space-y-10 w-1/2 bg-[#393E46] h-full ">
        <div className="flex space-x-5 items-center">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
          <h1 className="text-6xl font-bold text-white">
            Dev <span className="text-sky-400">Talk</span> Forum
          </h1>
        </div>

        <p className="w-5/6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="w-5/6">
          <Button variant="outline">Log In</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center w-1/2 h-full text-lg">
        <RegisterForm />
        <AuthForm />
      </div>
    </div>
  );
}

export default page;

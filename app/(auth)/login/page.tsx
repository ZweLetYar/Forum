import React from "react";
import Input from "../../components/input";
import Image from "next/image";

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
        <button className="text-center w-5/6 py-3 border-2 border-sky-600 rounded-lg cursor-pointer">
          Create a new account?
        </button>
      </div>

      <div className="flex  items-center justify-center w-1/2 h-full text-lg">
        <form
          action=""
          className="w-3/4 flex flex-col  justify-center space-y-5"
        >
          <h1 className="text-xl font-bold">Sign in to Dev Talk Forum</h1>
          <div className="w-full">
            <Input type="email" label="E-mail Address" />
          </div>
          <div className="w-full">
            <Input type="password" label="Password" />
          </div>
          <button className="text-center w-full py-3 bg-sky-600 rounded-lg  cursor-pointer mt-4">
            Login
          </button>
          <div className="flex justify-between gap-2 mt-4">
            <button className="flex items-center justify-center space-x-3 w-1/2 py-3 border border-sky-600 rounded-lg  cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.4 0 6.4 1.2 8.8 3.5l6.6-6.6C34.7 2.5 29.6 0 24 0 14.6 0 6.6 5.8 2.7 14.3l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.5c0-1.7-.1-3.3-.4-4.9H24v9.3h12.4c-.5 2.8-2 5.1-4.2 6.7v5.4h6.8c4-3.7 6.1-9.2 6.1-16.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.1c-1.2-3.5-1.2-7.3 0-10.8v-5.4H3.7c-3 6-3 13.1 0 19.1l6.8-5.4z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c5.6 0 10.7-1.9 14.2-5.2l-6.8-5.4c-2 1.3-4.6 2-7.4 2-6.3 0-11.7-4-13.6-9.6l-6.8 5.4C6.6 42.2 14.6 48 24 48z"
                />
              </svg>
              <p>Log in with google</p>
            </button>
            <button className="flex items-center justify-center space-x-3 text-center w-1/2 py-3 border border-sky-600 rounded-lg  cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C17.7 6.42 18.7 6.74 18.7 6.74c.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <p>Log in with Git Hub</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;

import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <main className="flex-center h-screen w-full ">
      <SignIn forceRedirectUrl={redirectUrl} />
    </main>
  );
};

export default SignInPage;

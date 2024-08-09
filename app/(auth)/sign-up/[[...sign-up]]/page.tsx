import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <main className="flex-center h-screen w-full ">
      <SignUp forceRedirectUrl={redirectUrl} />
    </main>
  );
};

export default SignUpPage;

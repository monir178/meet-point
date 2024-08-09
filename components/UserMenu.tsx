"use client";

import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const UserMenu = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showUserButton, setShowUserButton] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setShowUserButton(true);
    } else {
      setShowUserButton(false);
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="flex items-center gap-2">
      {isLoaded && isSignedIn && (
        <>
          {showUserButton && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu;

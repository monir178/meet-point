import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="Meet Point Logo"
          width={40}
          height={40}
          className="max-sm:size-10 max-sm:h-8"
        />

        <p className="text-[26px] font-extrabold max-sm:hidden gradient-text">
          Meet Point
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* Clerk - user management */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;

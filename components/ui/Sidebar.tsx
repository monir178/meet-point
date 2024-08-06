"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { delay, motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <motion.section
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ duration: 1, ease: "easeInOut", stiffness: 100 }}
      className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className=" flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4  justify-start hover:animate-pulse hover:bg-indigo-900  transition-all rounded-full",
                {
                  "font-bold p-4  transition-all rounded-full hover:animate-none hover:bg-indigo-500 shadow-lg bg-indigo-500 shadow-indigo-500/50 text-white":
                    isActive,
                }
              )}>
              <Image src={link.icon} alt={link.label} width={24} height={24} />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Sidebar;

"use client";

import Clock from "./Clock";
import { motion } from "framer-motion";

const HomeBanner = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 100 }}
      transition={{ duration: 1, ease: "easeInOut", stiffness: 100 }}>
      <div className="h-[350px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 2:40 PM
          </h2>
          <Clock />
        </div>
      </div>
    </motion.div>
  );
};

export default HomeBanner;

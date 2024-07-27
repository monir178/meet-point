"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [now, setNow] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null;
  }

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
      <p className="text-lg font-medium lg:text-2xl">{date}</p>
    </div>
  );
};

export default Clock;

// @ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import Clock from "./Clock";

const HomeBanner = () => {
  const { upcomingCalls, isLoading } = useGetCalls();

  const nextMeetingDateTime =
    upcomingCalls.length > 0
      ? new Date(upcomingCalls[0].state.startsAt).toLocaleString([], {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No upcoming meetings";

  return (
    <div className="h-[350px] w-full rounded-[20px] bg-hero bg-cover">
      <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
        <h2 className="glassmorphism max-w-[270px] rounded text-start py-2 px-2 text-base font-normal mt-2 lg:mt-0 ms-2 lg:ms-0">
          Upcoming Meeting: {isLoading ? "Loading..." : nextMeetingDateTime}
        </h2>
        <div className="mb-2 lg:mb-0 ms-2 lg:ms-0">
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Link2, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./ui/Loader";
import { useToast } from "./ui/use-toast";

type TCallLayout = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<TCallLayout>("speaker-left");

  const { toast } = useToast();

  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleCopyLink = () => {
    const meetingLink = window.location.href;
    navigator.clipboard.writeText(meetingLink).then(() => {
      toast({ title: "Meeting Link copied" });
    });
  };

  return (
    <section className="relative h-screen overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#4c535b]">
              <LayoutList size={24} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="bg-[#19232d] border-[#19232d] text-white">
            {["Grid", "Speaker-left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => {
                    setLayout(item.toLowerCase() as TCallLayout);
                  }}
                  className="cursor-pointer">
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
            <DropdownMenuSeparator className="border-dark-1" />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />

        {/* Copy Link Button */}
        <button onClick={handleCopyLink}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#4c535b]">
            <Link2 size={20} className="text-white" />
          </div>
        </button>

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;

"use client";
import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeeetingModal from "./MeeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-500"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-500"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-purple-500"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-500"
      />

      {/* Schedule Meeting Modal */}

      {!callDetails ? (
        <MeeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] ">
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className="border-none bg-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] ">
              Select date and time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full border-none bg-gray-900 focus:outline-none rounded-md p-2"
            />
          </div>
        </MeeetingModal>
      ) : (
        <MeeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* New Meeting Modal */}
      <MeeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      {/* Join meeting modal */}
      <MeeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Put the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}>
        <Input
          placeholder="Meeting Link"
          className="border-none bg-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeeetingModal>
    </section>
  );
};

export default MeetingTypeList;

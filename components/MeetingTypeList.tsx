"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meeting, setMeeting] = useState<
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
    if (!user || !client) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("sucess");
    } catch (error: unknown) {
      console.log(error);
      toast("error to create meeting");
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting("isInstantMeeting")}
        className="bg-orange"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule"
        description="Plan your meeting"
        handleClick={() => setMeeting("isScheduleMeeting")}
        className="bg-purple"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recording"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-blue-600"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeeting("isJoiningMeeting")}
        className="bg-yelow"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meeting == "isScheduleMeeting"}
          onClose={() => {
            setMeeting(undefined);
          }}
          title="Create meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor=""
              className="text-base text-normal leading-[22px]text-white"
            >
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible::ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label
              htmlFor=""
              className="text-base text-normal leading-[22px] text-white"
            >
              Select DateTime
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date: Date | null) =>
                setValues({ ...values, dateTime: date! })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy, h:mm aa"}
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meeting == "isScheduleMeeting"}
          onClose={() => {
            setMeeting(undefined);
          }}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast("Link Copied");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meeting == "isInstantMeeting"}
        onClose={() => {
          setMeeting(undefined);
        }}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
         <MeetingModal
        isOpen={meeting == "isJoiningMeeting"}
        onClose={() => {
          setMeeting(undefined);
        }}
        title="Type The Link Here"
        className="text-center"
        buttonText="Joining Meeting"
        handleClick={() => {
          router.push(values.link)
        }}
      >
        <Input placeholder="meeting link" 
        className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => {
          setValues({...values, link: e.target.value})
        }}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;

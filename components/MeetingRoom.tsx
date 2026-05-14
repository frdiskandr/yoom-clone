"use client";
import React, { useState } from "react";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

type CallLayoutProps = {
  layout: CallLayoutType;
};

const CallLayout = ({ layout }: CallLayoutProps) => {
  switch (layout) {
    case "grid":
      return <PaginatedGridLayout />;

    case "speaker-left":
      return <SpeakerLayout participantsBarPosition={"left"} />;

    default:
      return <SpeakerLayout participantsBarPosition={"right"} />;
  }
};

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipant, setshowParticipant] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div
          className="flex size-full items-center"
          style={{ maxWidth: "1000px" }}
        >
          <CallLayout layout={layout} />
        </div>
        <div
          className={cn(
            "hidden h-[calc(100vh-86px)] ml-2",
            showParticipant && "block",
          )}
        >
          <CallParticipantsList onClose={() => setshowParticipant(false)} />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 z-20 flex w-full -translate-x-1/2 items-center justify-center gap-5 px-4 flex-wrap">
        <CallControls
          onLeave={() => {
            router.push("/");
          }}
        />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
            >
              <LayoutList size={47} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "speaker-left", "speaker-right"].map((item, index) => (
              <div
                className="cursor-pointer hover:bg-blue-950"
                key={index}
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
              >
                {item}
              </div>
            ))}

            <DropdownMenuSeparator className="border-dark-1" />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          onClick={() => {
            setshowParticipant((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;

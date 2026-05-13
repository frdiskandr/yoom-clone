"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

const Meeting = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoaded } = useUser();

  const [SetupComplite, setSetupComplite] = useState<boolean>(false);

  const { Call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={Call}>
        <StreamTheme>
          {!SetupComplite ? (
            <MeetingSetup setIsSetupComplete={setSetupComplite} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;

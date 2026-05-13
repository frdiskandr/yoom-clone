"use client";

import { tokenProvider } from "@/actions/Stream.action";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useMemo } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
if (!apiKey) {
  throw new Error("stream api key missing");
}

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  const videoClient = useMemo(() => {
    if (!isLoaded || !user) return undefined;
    if (!apiKey) {
      throw new Error("stream api key missing");
    }

    return new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
  }, [user, isLoaded]);

  if (!videoClient) {
    return <Loader />;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

"use client";

import { tokenProvider } from "@/actions/Stream.action";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useMemo } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const userId = "demo-user-96u4NtHI";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGVtby11c2VyLTk2dTROdEhJIiwic3ViIjoidXNlci9kZW1vLXVzZXItOTZ1NE50SEkiLCJhcGlLZXkiOiIycTl1YmVtM3YyNmIiLCJpYXQiOjE3Nzg2NDM0OTAsImV4cCI6MTc3ODY0NzA5MH0.BfJlOehFhAw8d__nHKeQZnhCRod72se-Xmty8dstvgI";

const user: User = { id: userId };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", "demo-call-ujeRboq0");
call.join({ create: true });

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

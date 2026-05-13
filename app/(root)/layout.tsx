import { StreamVideoProvider } from "@/providers/StreamsClientProviders";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "yuum",
  description: "Video meeting",
  icons: {
    icon: '/icon/logo.svg'
  }
};


const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Rootlayout;

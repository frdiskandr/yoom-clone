"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk"
import { toast } from "sonner"

const MeetingTypeList = () => {

  const router = useRouter()

  const [meeting, setMeeting] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

  const {user} = useUser()
  const client = useStreamVideoClient()

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })

  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if(!user || !client ) return;

    try {
      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if(!call) throw new Error("failed to create call")

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "instant meeting"

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call)
      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }
      toast("sucess")
    } catch (error: unknown) {
      console.log(error)
      toast("error to create meeting")
    }
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard 
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting('isInstantMeeting')}
        className="bg-orange"
      />
          <HomeCard 
        img="/icons/schedule.svg"
        title="Schedule"
        description="Plan your meeting"
        handleClick={() => setMeeting('isScheduleMeeting')}
        className="bg-purple"
      />
          <HomeCard 
        img="/icons/recordings.svg"
        title="View Recording"
        description="Check out your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-blue-600"
      />
          <HomeCard 
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeeting('isJoiningMeeting')}
        className="bg-yelow"
      />

      <MeetingModal
      isOpen={meeting == 'isInstantMeeting'}
      onClose={() => { setMeeting(undefined)}}
      title="Start an instant meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting}
      />

    </section>
  );
};

export default MeetingTypeList;

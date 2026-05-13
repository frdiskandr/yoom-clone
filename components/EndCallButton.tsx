"use client"
import React from 'react'
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {

  const call = useCall()
  const router = useRouter()


  const {useLocalParticipant} = useCallStateHooks()
  const localPartisipant = useLocalParticipant()

  const isMeetingOwner = localPartisipant && call?.state.createdBy && 
  localPartisipant.userId === call.state.createdBy.id;

  if(!isMeetingOwner) return null

  return (
    <Button onClick={async () => {
      await call.endCall()
      router.push('/')
    }} className="bg-red-500">
      End Meeting for Everyone
    </Button>
  )
}

export default EndCallButton
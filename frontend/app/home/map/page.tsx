import { MapPins } from '@/components/MapPins'
import { EventType } from '@/types/event'
import React from 'react'

const Page = async () => {
  const fetching = await fetch(`http://localhost:3001/api/events/`)
  const response = await fetching.json()
  const { events }: { events: EventType[] } = response

  return (
    <section className="overflow-hidden rounded-lg">
      <MapPins events={events} />
    </section>
  )
}

export default Page

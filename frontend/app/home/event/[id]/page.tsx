import { EventType } from '@/types/event'
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}

const Page: React.FC<PageProps> = async ({ params: { id } }) => {
  const fetching = await fetch(`http://localhost:3001/api/events/${id}`)
  const response = await fetching.json()
  const { event }: { event: EventType } = response

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <p>{event.ubicacion}</p>
      <img
        src={event.images}
        alt={event.title}
        className="w-full rounded-lg object-cover h-[400px]"
      />
    </section>
  )
}

export default Page

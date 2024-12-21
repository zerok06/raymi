import { EventType } from '@/types/event'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  const fetching = await fetch('http://localhost:3001/api/events')
  const response = await fetching.json()
  const { events }: { events: EventType[] } = response

  return (
    <>
      <nav className="h-10">Filters</nav>
      <h1>Home</h1>
      <section className="flex flex-wrap gap-6">
        {events.map(item => (
          <Link
            href={`/home/event/${item.id}`}
            key={item.id}
            className="w-[300px]"
          >
            <div className="border-2 border-white/10 p-4 rounded-lg  min-h-[380px]">
              <nav className="h-6 text-sm">nav</nav>
              <h3 className="text-lg font-semibold text-white/80 text-balance">
                {item.title}
              </h3>
              <div className="flex flex-wrap py-1 gap-1">
                {[1, 2, 3, 4].map(item => (
                  <a
                    href="#"
                    className="px-2 py-1 rounded-sm border  text-xs text-white/50"
                  >
                    #exacto
                  </a>
                ))}
              </div>
              <div>
                <p className="text-sm text-white/50">Dec 3, 2023</p>
              </div>
              <img
                className="my-2 w-full rounded-md aspect-video"
                src={item.images}
              />
              <div className="flex justify-between">
                <div>likes</div>
                <div>share</div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}

export default Page

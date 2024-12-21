import { FormNewComment } from '@/components/forms/FormNewComment'
import LikeEvent from '@/components/LikeEvent'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useHomeContext } from '@/context/AuthContext'
import { EventType } from '@/types/event'
import { MessageCircle } from 'lucide-react'
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
    <section className="space-y-6 pb-20">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src="https://github.com/zerok06.png"
            alt="zerok"
            className="w-14 h-14 rounded-lg"
          />
          <div className="flex flex-col">
            <p className="text-white leading-none bold">zerok</p>
            <p className="text-white/50 leading-none text-sm">Dec 3, 2023</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 rounded-lg border">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-white/70 mb-4">
          {new Date(event.fecha).toDateString()}
        </p>
        <img
          src={event.images}
          alt={event.title}
          className="w-full rounded-lg object-cover h-[400px] mb-6"
        />

        <p className="text-white/70 ">{event.description}</p>
      </div>
      {/* Contador de comnetarios y likes */}
      <div className="flex gap-6 text-white/70">
        <div className="flex gap-2 items-center">
          <LikeEvent eventId={event.id} />
          {event._count?.likes} likes
        </div>
        <div className="flex gap-2 items-center">
          <MessageCircle /> {event.comentarios.length} comentarios
        </div>
      </div>
      <Separator />

      <section className="space-y-6">
        {/* Comentarios */}

        {/* formulario de comentaios */}
        <FormNewComment eventId={event.id} />
        {/* Comentarios */}
        <section className="space-y-4">
          {event.comentarios.map(comment => (
            <div className="px-4 py-3 rounded-lg border">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://github.com/zerok06.png"
                    alt="zerok"
                    className="w-10 h-10 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="text-white leading-tight bold">
                      {comment.usuario?.firstName} {comment.usuario?.lastName}
                    </p>
                    <div className="flex gap-2 items-center text-white/50 leading-none text-sm">
                      <p>{comment.usuario?.username}</p>-
                      <p>{new Date(comment.createAt).toDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4">{comment.comentario}</div>
              <div>REPLY</div>
            </div>
          ))}
        </section>
      </section>
    </section>
  )
}

export default Page

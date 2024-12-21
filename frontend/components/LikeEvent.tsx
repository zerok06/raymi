'use client'

import { createLike, deleteLike } from '@/actions/likeActions'
import { useHomeContext } from '@/context/AuthContext'
import { Heart } from 'lucide-react'
import React, { useState } from 'react'

interface LikeEventProps {
  eventId: number
}

const LikeEvent: React.FC<LikeEventProps> = ({ eventId }) => {
  const [like, setLike] = useState(false)
  const { email, id: idUser } = useHomeContext()

  const handleCreateLike = async () => {
    createLike({ userId: idUser, eventId }).then(() => {
      setLike(!like)
    })
  }

  const handleDeleteLike = async () => {
    deleteLike({ userId: idUser, eventId }).then(() => {
      setLike(!like)
    })
  }

  return (
    <>
      {like ? (
        <button onClick={handleCreateLike}>
          <Heart className="fill-ui-300 stroke-ui-300" />
        </button>
      ) : (
        <button onClick={handleDeleteLike}>
          <Heart />
        </button>
      )}
    </>
  )
}

export default LikeEvent

import React, { useState } from 'react'

interface MapPickerProps {
  latitud: number
  longitud: number
}

const useMapPicker = () => {
  const [picker, setPicker] = useState<MapPickerProps>({
    latitud: 0,
    longitud: 0,
  })

  const handlePicker = (latitud: number, longitud: number) => {
    setPicker({ latitud, longitud })
  }

  return { picker, handlePicker }
}

export default useMapPicker

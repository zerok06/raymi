'use client'

import React from 'react'

import { useState } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre'

const initialViewState = {
  longitud: -71.33946,
  latitud: -17.62525,
  zoom: 11,
}

const TOKEN = '26YmL3OUf69VBR5YuM2e'
import type { MarkerDragEvent, LngLat } from 'react-map-gl/maplibre'
import MapPin from '@/components/MapPin'

interface MapPicker {
  latitud: number
  longitud: number
}

interface MapPickerProps {
  picker: MapPicker
  handlePicker: (latitud: number, longitud: number) => void
}

const MapPicker: React.FC<MapPickerProps> = ({ handlePicker, picker }) => {
  const [marker, setMarker] = useState({
    latitud: initialViewState.latitud,
    longitud: initialViewState.longitud,
  })
  const [events, logEvents] = useState<Record<string, LngLat>>({})

  const onMarkerDragStart = (event: MarkerDragEvent) => {}

  const onMarkerDrag = (event: MarkerDragEvent) => {
    setMarker({
      longitud: event.lngLat.lng,
      latitud: event.lngLat.lat,
    })
  }

  const onMarkerDragEnd = (event: MarkerDragEvent) => {}

  return (
    <section className="overflow-hidden rounded-lg">
      <Map
        initialViewState={initialViewState}
        style={{ height: 400 }}
        boxZoom
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=26YmL3OUf69VBR5YuM2e"
      >
        <Marker
          longitude={marker.longitud}
          latitude={marker.latitud}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <MapPin size={20} />
        </Marker>
        <NavigationControl />
      </Map>
      {JSON.stringify(events)}
      {JSON.stringify(marker)}
    </section>
  )
}

export default MapPicker

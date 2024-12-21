'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl/maplibre'
import MapPin from '@/components/MapPin'

const initialViewState = {
  longitud: -71.33946,
  latitud: -17.62525,
  zoom: 14,
}
import { EventType } from '@/types/event'

interface MapPinsProps {
  events: EventType[]
}

export const MapPins: React.FC<MapPinsProps> = ({ events }) => {
  const [popupInfo, setPopupInfo] = useState<EventType | null>(events[0])

  const pins = useMemo(
    () =>
      events.map((element, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={element.latitud}
          latitude={element.longitud}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation()
            setPopupInfo(element)
          }}
        >
          <MapPin />
        </Marker>
      )),
    []
  )

  return (
    <>
      <Map
        initialViewState={initialViewState}
        style={{ height: 400 }}
        boxZoom
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=26YmL3OUf69VBR5YuM2e"
      >
        {/* <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl /> */}

        {/* {pins} */}

        {/* {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitud)}
            latitude={Number(popupInfo.longitud)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              asdasd
              <a target="_new">Wikipedia</a>
            </div>
          </Popup>
        )} */}
      </Map>
    </>
  )
}

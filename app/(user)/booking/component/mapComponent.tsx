"use client"
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAddressFromCoordinates } from "@/app/lib/getAddress";
import { useAddressStore } from "@/app/store/useAddressStore";

const defaultMapContainerStyle = {
  width: '100%',
  height: '30vh',
  borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
  lat: 35.8799866,
  lng: 76.5048004
}

const defaultMapZoom = 17

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
};

type MapComponent = {
  lat: number;
  lng: number
}

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState<MapComponent>()
  const [bounds, setBounds] = useState<any>(null)
  const inputref = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef(null)
  const [markers, setMarkers] = useState<any[]>([]);
  const address = useAddressStore(state => state.address)
  const updateAddress = useAddressStore(state => state.setAddress)
  const [map, setMap] = useState(null)


  const handlePlaceChanged = () => {
    //@ts-ignore
    const results = inputref.current.getPlaces();
    setCurrentLocation({ lat: results[0].geometry?.location.lat(), lng: results[0].geometry?.location.lng() })
    const newMarkers = results.map((result: any) => result.geometry.location);
    setMarkers(newMarkers);
  };
  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setCurrentLocation(pos)
      }
    );
  }, [])

  useEffect(() => {
    const loadCurrentLocation = async () => {
      try {
        if (currentLocation == undefined) {
          return
        }
        const addressText = await getAddressFromCoordinates({ latitude: currentLocation.lat, longitude: currentLocation.lng }) as string
        updateAddress({ addressText: addressText, longitude: currentLocation.lat, latitude: currentLocation.lng, mapLink: `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}` })

      } catch (error) {
        console.log(error)
      }
    }
    loadCurrentLocation()
  }, [currentLocation])

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);
    setMap(map)
  }, [])


  return (
    <div className="w-full shadow-md border-lg p-3">
      <div ref={inputref}>
        <StandaloneSearchBox onLoad={(e: any) => (inputref.current = e)} onPlacesChanged={handlePlaceChanged} bounds={bounds}>
          <input placeholder="Tìm nơi bạn muốn" type="text" className="bg-transparent text-black p-2 focus:border-none focus:outline-none shadow-md h-12 border border-crusta rounded-md mb-4 mt-2 w-full" />
        </StandaloneSearchBox>
      </div>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={currentLocation}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onLoad={map => { mapRef.current = map }}
      >
        {markers.map((mark, index) => (
          <Marker key={index} position={mark} />
        ))}
      </GoogleMap>
    </div>
  )
};

export { MapComponent };




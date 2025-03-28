'use client';

import { FormError } from '@/components/custom/form-error';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

const libraries = ['places', 'drawing', 'geometry'];

export function MapProvider({ children }: { children: ReactNode }) {

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <FormError message='map load error' />

  if (!scriptLoaded) return <p>Map loading...</p>

  return children;
}


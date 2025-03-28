import { MapType } from '@/type/location'
import { create } from 'zustand'

type State = {
  map: MapType
}

type Action = {
  setMap: (map: State['map']) => void
}

export const useMapStore = create<State & Action>((set) => ({
  map: null,
  setMap: (map: MapType) => set(() => ({ map: map }))
}))



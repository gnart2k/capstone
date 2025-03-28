import { MapType } from '@/type/location'
import { create } from 'zustand'

type State = {
  address: MapType,
  addressText: string
}

type Action = {
  setAddress: (address: State['address']) => void
  setAddressText: (text: State['addressText']) => void
}

export const useAddressStore = create<State & Action>((set) => ({
  address: null,
  addressText: '',
  setAddressText: (text: string) => set(() => ({ addressText: text })),
  setAddress: (map: MapType) => set(() => ({ address: map }))
}))


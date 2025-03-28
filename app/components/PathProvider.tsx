"use client"


import React from 'react'
import { useAsPathInitializer } from '../store/usePathStore';

type Props = {}

export default function PathProvider({ }: Props) {
  useAsPathInitializer();

  return (
    <div>

    </div>
  )
}

import React from 'react'

import { Star } from "lucide-react"
import { StarIcon } from "@heroicons/react/20/solid";

type Props = {
  rate: number
}

export default function StarRate({ rate }: Props) {
  console.log(rate)
  let arrayLength: number = Math.round(rate)
  let starArray = []
  if (!arrayLength) {
    starArray = []
  } else {
    starArray = new Array(arrayLength).fill(0)
  }
  const starFull = [1, 2, 3, 4, 5]

  return (
    <div className="flex ">
      <div className="ml-4 w-10/12">
        <div className="relative">
          <div className="flex items-start absolute left-[-30px] bottom-[-20px] text-crusta">
            {starFull.map((index) => (
              <div key={index}>
                <Star className="" />
              </div>
            ))}
          </div>
          <div className="flex items-start absolute bottom-[-20px] left-[-30px]">
            {
              starArray.map((star, index) => (
                <div key={index} className="flex text-crusta">
                  <StarIcon className="w-6" />
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div >

  )
}

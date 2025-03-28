"use client"



import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function RateCount() {
  const [currentOptionIndex, setCurrentoptionIndex] = useState(0)
  const fetchResult = useSWR('getRateStatisticData', async () => {
    const response = fetch(progressOption[currentOptionIndex].apiUrl)
    return response?.then(data => data.json())
  })

  useEffect(() => {
    fetchResult.mutate();
  }, [fetchResult.isLoading, fetchResult, currentOptionIndex])


  const progressOption =
    [
      {
        title: "12 Tháng",
        apiUrl: "/api/rate/year-count"

      },
      {
        title: "30 Ngày",
        apiUrl: "/api/rate/month-count"

      },
      {
        title: "7 Ngày",
        apiUrl: "/api/rate/week-count"

      },
    ]

  const data = [
    {
      labels: "5 sao",
      percentage: fetchResult.data?.fiveStarRate / fetchResult.data?.totalRate * 100,
      amount: fetchResult.data?.fiveStarRate
    },
    {
      labels: "4 sao",
      percentage: fetchResult.data?.fourStarRate / fetchResult.data?.totalRate * 100,
      amount: fetchResult.data?.fourStarRate
    },

    {
      labels: "3 sao",
      percentage: fetchResult.data?.threeStarRate / fetchResult.data?.totalRate * 100,
      amount: fetchResult.data?.threeStarRate
    },

    {
      labels: "2 sao",
      percentage: fetchResult.data?.twoStarRate / fetchResult.data?.totalRate * 100,
      amount: fetchResult.data?.twoStarRate
    },
    {
      labels: "1 sao",
      percentage: fetchResult.data?.oneStarRate / fetchResult.data?.totalRate * 100,
      amount: fetchResult.data?.oneStarRate
    },

  ]

  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(12), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Card className="w-full max-h-full">
        <CardHeader className="grid grid-cols-3 gap-4 items-center">
          <CardTitle className="text-[16px] col-span-2">
            Số lượt đánh giá
          </CardTitle>
          <div>
            <Select onValueChange={(e) => setCurrentoptionIndex(+e)}>
              <SelectTrigger className="">
                <SelectValue placeholder={progressOption[0].title} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {progressOption.map((item, i) => (
                    <SelectItem key={i} value={i + ""}>{item.title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>

        </CardHeader>
        <CardContent className="max-h-10/12">
          {data.map((item, i) => (
            <div key={i} className={cn("grid w-full items-center gap-4 ", i != 0 && 'mt-2')}>
              <div className="w-full text-sm flex items-center justify-between">
                <span>{item.labels}</span>
                <span className="text-gray-600">{item.amount}</span>
              </div>
              <Progress value={item.percentage} className="text-crusta" />
            </div>
          ))}
        </CardContent>
      </Card>

    </>

  )
}



import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { ArrowUp } from "lucide-react"

export default function StatisticCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Thu nhập hôm nay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex items-center justify-between ">
            <span className="font-semibold">12,426VND</span>
            <span className="text-green-500 flex items-center text-sm">+26% <ArrowUp className="w-4 ml-1" /> </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


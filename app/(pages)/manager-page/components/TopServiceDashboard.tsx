"use client";

import React from "react";
import useSWR from "swr";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceData {
  serviceName: string;
  requestCount: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TopServiceDashboard() {
  const { data, error } = useSWR<ServiceData[]>('/api/manager-dashboard/service', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const highestRequestCount = data.reduce((max, item) => Math.max(max, item.requestCount), 0);

  return (
    <Card className="w-full">
      <CardHeader className="grid grid-cols-2 gap-4 items-center">
        <CardTitle className="text-[18px] col-span-2">Các dịch vụ được đặt hàng nhiều nhất</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((item, i) => (
          <div key={i} className={cn("grid w-full items-center gap-4", i !== 0 && 'mt-8')}>
            <div className="w-full text-sm flex items-center justify-between">
              <span>{item.serviceName}</span>
              <span className="text-gray-600">{item.requestCount} lượt đặt</span>
            </div>
            <Progress value={(item.requestCount / highestRequestCount) * 100} className="text-crusta" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

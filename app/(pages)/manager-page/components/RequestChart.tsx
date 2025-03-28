"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import type { InteractionItem } from "chart.js";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import { cn } from "@/lib/utils";
import { FileDown } from "lucide-react";
import useSWR from "swr";
import { PreviewXlsx } from "../../admin-page/components/PreviewXlsx";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function RequestChart() {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [yearData, setYearData] = useState<any[]>([])
  const [monthData, setMonthData] = useState([])
  const [weekData, setWeekData] = useState([])
  const [xlsxData, setXlsxData] = useState([])
  const [xlsxColumns, setXlsxColumns] = useState([])
  const [isChecked, setIsChecked] = useState(false);

  const fetchResult = useSWR("getRequestPerWeek", async () => {
    const response = fetch(chartOption[currentOptionIndex].apiUrl);
    return response?.then((data) => data.json());
  });

  useEffect(() => {
    setIsChecked(false)
  }, [])

  useSWR('getRequestPerYearReview', async () => {
    const response = fetch(chartOption[0].apiUrl)
    const result = await response?.then(data => data.json())
    setYearData(result.reverse())
  })

  useSWR('getRequestPerMonthReview', async () => {
    const response = fetch(chartOption[1].apiUrl)
    const result = await response?.then(data => data.json())
    setMonthData(result.reverse())

  })

  useSWR('getRequestPerWeekReview', async () => {
    const response = fetch(chartOption[2].apiUrl)
    const result = await response?.then(data => data.json())
    setWeekData(result.reverse())

  })

  useEffect(() => {
    fetchResult.mutate();
    const datas: any[] = []
    datas.push(yearData, monthData, weekData)
  }, [fetchResult.isLoading, fetchResult, currentOptionIndex]);
  const _yearlabels = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];

  const today = new Date();
  const currentMonth = today.getMonth();
  const yearPart1 = _yearlabels.slice(0, currentMonth + 1);
  const yearPart2 = _yearlabels.slice(currentMonth + 1, _yearlabels.length);
  const yearlabels = yearPart2.concat(yearPart1);
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maxDay = daysInMonth[currentMonth];

  const _monthLabels = [];
  for (let day = 1; day <= maxDay; day++) {
    const label = `Ngày ${day}`;
    _monthLabels.push(label);
  }

  const currentDate = today.getDate();
  const dayMonthPart1 = _monthLabels.slice(0, currentDate);
  const dayMonthPart2 = _monthLabels.slice(currentDate, _monthLabels.length);
  const monthLabels = dayMonthPart2.concat(dayMonthPart1);

  const _weekLabels = [];
  for (let day = 2; day <= 8; day++) {
    const label = day != 8 ? `Thứ ${day}` : `Chủ nhật`;
    _weekLabels.push(label);
  }

  const currentDay = today.getDay();
  const dayWeek1 = _weekLabels.slice(0, currentDay);
  const dayWeek2 = _weekLabels.slice(currentDay, _weekLabels.length);
  const weekLabels = dayWeek2.concat(dayWeek1);

  const chartOption = [
    {
      title: "12 Tháng",
      labels: yearlabels,
      apiUrl: "/api/manager-dashboard/request/request-per-year",
    },
    {
      title: "30 Ngày",
      labels: monthLabels,
      apiUrl: "/api/manager-dashboard/request/request-per-month",
    },
    {
      title: "7 Ngày",
      labels: weekLabels,
      apiUrl: "/api/manager-dashboard/request/request-per-week",
    },
  ];

  let labels = chartOption[currentOptionIndex].labels;

  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: labels
          .map((e, i) => fetchResult?.data && fetchResult?.data[i])
          .reverse(),
      },
    ],
  };

  function generateObject(keys: string[], values: any[]): { [key: string]: any } {
    let result: { [key: string]: any } = {};
    keys.forEach((key, index) => {
      result[key] = values[index];
    });
    return result;
  }

  const handlePreviewXlsx = () => {
    const columns: any[] = []
    const yearColumns = yearlabels.map(label => (
      { header: label, key: label.toLowerCase() }
    ))
    const monthColumns = monthLabels.map(label => (
      { header: label, key: label.toLowerCase() }
    ))

    const weekColumns = weekLabels.map(label => (
      { header: label, key: label.toLowerCase() }
    ))
    columns.push(yearColumns, monthColumns, weekColumns)
    setXlsxColumns(columns)
    const datas: any[] = []

    let yearObject
    let monthObject
    let weekObject

    if (!isChecked) {
      yearObject = generateObject(yearlabels.map(yearlabel => yearlabel.toLowerCase()), yearData);
      monthObject = generateObject(monthLabels.map(yearlabel => yearlabel.toLowerCase()), monthData);
      weekObject = generateObject(weekLabels.map(yearlabel => yearlabel.toLowerCase()), weekData);
    } else {

      yearObject = generateObject(yearlabels.map(yearlabel => yearlabel.toLowerCase()), yearData);
      monthObject = generateObject(monthLabels.map(yearlabel => yearlabel.toLowerCase()), monthData);
      weekObject = generateObject(weekLabels.map(yearlabel => yearlabel.toLowerCase()), weekData);
    }
    console.log(isChecked)

    setIsChecked(true)

    datas.push([yearObject], [monthObject], [weekObject])
    setXlsxData(datas)
    console.log(datas)

  }

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between">
        <p className="font-semibold">Thống kê lượng yêu cầu</p>
        <div>
          {chartOption.map((e, i) => (
            <span
              onClick={() => setCurrentOptionIndex(i)}
              className={cn(
                "py-1 text-sm px-2 mx-1 hover:border rounded-lg cursor-pointer",
                currentOptionIndex == i && "border"
              )}
              key={i}
            >
              {e.title}
            </span>
          ))}
        </div>
        <div onClick={handlePreviewXlsx}>
          <PreviewXlsx columns={xlsxColumns} data={xlsxData} worksheetTitle={"manager"} />
        </div>
      </div>
      <Chart
        height={115}
        ref={chartRef}
        type="line"
        onClick={onClick}
        options={options}
        data={data}
      />
    </div>
  );
}

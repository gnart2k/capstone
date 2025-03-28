import React from "react";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  sendDate: Date;
  type: string;
  reason: string;
  updatedAt: Date;
  attachedFile: {
    fileName: string;
    downloadUrl: string;
  }[];
};

function ApplicationInfo(props: Props) {
  const dateString = format(props.sendDate, "dd/MM/yyyy");
  const updatedString = props.updatedAt ? format(new Date(props.updatedAt), "dd/MM/yyyy HH:mm") : "N/A";
  return (
    <div className="w-6/12 h-[50vh]">
      <div className="flex flex-col border-b border-b-gray-300 pb-2">
        <span className="text-crusta font-semibold">Ngày gửi đơn</span>
        <span>{dateString}</span>
      </div>

      <div className="flex flex-col border-b border-b-gray-300 pb-2">
        <span className="text-crusta font-semibold">Ngày đơn được xử lý</span>
        <span>{updatedString}</span>
      </div>

      <div className="flex flex-col border-b border-b-gray-300 pb-2">
        <span className="text-crusta font-semibold">Loại đơn</span>
        <span>{props.type}</span>
      </div>

      <div className="flex flex-col border-b border-b-gray-300 pb-2">
        <span className="text-crusta font-semibold">Lí do làm đơn</span>
        <span>{props.reason}</span>
      </div>
      <div className="flex flex-col border-b border-b-gray-300 pb-2">
        <span className="text-crusta font-semibold">Tệp đính kèm</span>
        <div className="flex">
          {props.attachedFile.map((e, i) => (
            <div className="flex flex-col  mt-2 mr-4" key={i} >
              <Link href={e.downloadUrl} className="text-blue-500 hover:underline">

                {e.fileName.endsWith('jpg') || e.fileName.endsWith('png') ? <img src={e.downloadUrl} className="rounded-lg w-20 h-20 object-cover" /> : <p>{e.fileName}</p>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationInfo;

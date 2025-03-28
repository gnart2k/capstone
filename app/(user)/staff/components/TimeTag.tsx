import { Label } from "@/components/ui/label";
import clsx from "clsx";

const TimeTag = (props: any) => {
  const { data, shift } = props;
  const isActive = Array.isArray(data.shift) && data.shift.find((item: any) => item.shift === shift)?.active;

  return (
    <div
      className={clsx(
        "flex flex-col items-center rounded-2xl py-4 px-1",
        isActive ? "bg-[#FF6A28]" : "bg-[#F6F6F6]"
      )}
    >
      <Label className={isActive ? "text-white" : "text-[#A0A0A0]"}>
        {data.day}
      </Label>
      <Label
        className={
          isActive
            ? "text-white text-xs font-light"
            : "text-[#A0A0A0] text-xs font-light"
        }
      >
        {data.date}
      </Label>
    </div>
  );
};

export default TimeTag;

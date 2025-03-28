import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const BenefitQA = ({
  data,
}: {
  data: { title: String; description: String };
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? (
        <div className="py-6 border-b border-gray-200 lg:w-[650px]">
          <div className="border-l-4 border-[#FF6A28] px-6">
            <div className="flex justify-between items-center ">
              <Label className="text-base">{data.title}</Label>
              <Minus
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div>
              <Label className="text-[#666C89]">{data.description}</Label>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 border-b border-gray-200 lg:w-[650px]">
          <div className="flex justify-between border-l-4 px-4 items-center border-gray-200 ">
            <Label className="text-base">{data.title}</Label>
            <Plus className="cursor-pointer" onClick={() => setOpen(true)} />
          </div>
        </div>
      )}
    </>
  );
};

export default BenefitQA;

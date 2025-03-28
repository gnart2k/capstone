import StrengthPoint from "./strengthPoint";
import TrapezoidText from "./trapezoidText";

export default function Introduce() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="font-semibold text-[38px]">Dịch vụ <span className="text-crusta">Tổng Vệ Sinh</span> có gì?</h2>
        <TrapezoidText text="Dịch vụ tổng vệ sinh của chúng tôi bao gồm quét dọn, lau chùi, và làm sạch các khu vực khó tiếp cận, mang đến cho bạn không gian sống và làm việc sạch bóng từ trong ra ngoài.
"/>
        <StrengthPoint />

      </div>
    </>
  )
}

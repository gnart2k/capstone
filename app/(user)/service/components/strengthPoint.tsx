import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { strengthPointData } from "@/initialData/service"
import Image from "next/image"
export default function StrengthPoint() {
  const data = strengthPointData
  return (
    <div className="grid grid-cols-2 w-full gap-8 px-40 mt-16">
      {data.map(item => (
        <div key={item.title} >
          <div className="flex items-center ">
            <div className="bg-gray-200 rounded-full h-20 w-20 p-6 mr-8">
              <Image src={item.icon.src} alt={item.title} width={item.icon.width} height={item.icon.height} className="rounded-full object-contain mr-10" />
            </div>
            <div className="flex-col">
              <h3 className="font-semibold ">{item.title}</h3>
              <desc className="text-[12px]">{item.desc}</desc>
            </div>
          </div>
          <hr className="border border-gray-200 mt-4 w-full" />
        </div>
      ))}

    </div>
  )

}

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type ServiceContainerProps = {
  imgUrl: string;
  title: string;
  sortDesc: string;
  redirectUrl: string;
}

export default function ServiceContainer(props: ServiceContainerProps) {
  const router = useRouter();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6478/6478111.png";
    e.currentTarget.classList.add('error-image');
  };

  return (
    <div className="shadow-md dark:bg-slate-700 flex flex-col justify-between rounded-lg p-8 max-h-[610px] min-h-[510px]">
      <div>
        <img 
          src={props.imgUrl} 
          alt={props.title} 
          className="rounded-md w-full h-[300px] object-cover" 
          onError={handleImageError} 
        />
        <div className="text-xl font-semibold my-4 text-center">{props.title}</div>
        <div className="h-[120px] overflow-hidden">{props.sortDesc.slice(0, 150)}...</div>
      </div>
      <div>
        <Button 
          onClick={() => router.push(props.redirectUrl)} 
          className="mt-4 w-full rounded-full text-white text-lg bg-crusta hover:shadow-md hover:shadow-gray-500 hover:bg-crusta dark:bg-slate-500"
        >
          Khám phá ngay
        </Button>
      </div>
    </div>
  )
}

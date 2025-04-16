"use client"
import { UploadButton } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { UpdateAvatar } from "@/app/actions/profile/update-avatar";
import { useUserStore } from "@/app/store/useUserStore";


type ProfileZoneProps = {
  avatar: string,
  name: string,
  email: string
}

export default function ProfileZone(props: ProfileZoneProps) {
  const [imageUrl, setImageUrl] = useState<string>("")
  const uploadRef = useRef(null);
  const [onHover, setHover] = useState<boolean>(false)
  const session = useSession();
  const [currentAvatar, setCurrentAvatar] = useState(props.avatar)
  const [isLoading, setLoading] = useState(false)
  const setUser = useUserStore(state => state.setUser)
  const user = useUserStore(state => state.user)
  return (
    <div>
      <div className="flex flex-col items-center ">
        <div
          className=" rounded-full mt-20 p-1 relative border  w-[130px] h-[130px] flex items-center justify-center flex-col  hover:border-white"
          ref={uploadRef}
          onClick={() => {
            uploadRef.current &&
              uploadRef.current.querySelector("label").click();
          }}
        >
          <img src={currentAvatar} alt={props.name} className={cn("w-full rounded-full object-contain z-50 hover:opacity-50 hover:blur-sm hover:backdrop-blur-sm")} onMouseOver={() => { setHover(true) }} onMouseOut={() => setHover(false)} />
          <UploadButton
            className="hidden"
            endpoint="imageUploader"
            onUploadBegin={() => setLoading(true)}
            onClientUploadComplete={async (res) => {
              console.log("Files: ", res);
              toast.success("Upload thành công");
              res.length > 0 && setImageUrl(res[0]?.url);
              setUser({ ...user, image: res[0]?.url })

              const isSuccess = await UpdateAvatar({ url: res[0]?.url });

              if (isSuccess) {
                setCurrentAvatar(imageUrl)
                toast.success("Ảnh đại diện đã được cập nhật thành công")
              } else {
                toast.error("Cập nhật ảnh đại diện thất bại, vui lòng thử lại")
              }
              setLoading(false)
            }}

            onUploadError={(error: Error) => {
              setLoading(false)
              toast.error(error.message);
            }}
          />
          {
            onHover &&
            <Camera className="absolute w-8 h-8 text-orange-700" />
          }
        </div>

        <p className="text-xl font-semibold mt-2">{user?.name ?? props.name}</p>
        <p className="text-gray-500 text-sm mt-2">{props.email}</p>
        <div className="mt-8 bg-gray-500">
        </div>
      </div>

    </div>
  )

}

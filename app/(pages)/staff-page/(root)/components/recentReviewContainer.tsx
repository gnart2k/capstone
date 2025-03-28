"use client"


export type RecentlyReviewContainerProps = {
  userName: string;
  text: string;
  rate: number
  userAvatar: string;
}

export default function RecentlyReviewContainer(props: RecentlyReviewContainerProps) {

  return (
    <div className="flex items-center mt-4 justify-between">
      <div className="flex items-center">
        <img className="rounded-full h-[40px] w-[40px] object-cover" src={props.userAvatar} alt="avatar" />
        <div className="ml-2">
          <p className="font-semibold ">{props.userName}</p>
          <p className="text-gray-600 text-sm italic">
            {props.text}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center mr-8">
        <p className="mr-1">{props.rate}/5</p>
        <i className="bi bi-star-fill text-crusta"></i>
      </div>
    </div>
  )

}

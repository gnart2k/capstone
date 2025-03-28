import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ReviewRequest from "./ReviewRequest"

export default function ReviewPopover() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-crusta rounded-3xl hover:bg-orange-600">Đánh giá</Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[825px] ">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-center text-2xl">Đánh giá</DialogTitle>
          <DialogDescription>
            Đánh giá của người dùng về dịch vụ
          </DialogDescription>
        </DialogHeader>
        <ReviewRequest />
      </DialogContent>
    </Dialog>
  )
}


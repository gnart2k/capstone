import { signOut } from "@/auth"
import BackButton from "@/components/custom/button/BackButton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function SignOutPage() {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <form
          action={async (formData) => {
            "use server"
            await signOut()
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất ?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ đăng xuất ra khỏi hệ thống và không tự động đăng nhập lại
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <BackButton />
            <AlertDialogAction type="submit" className="bg-red-500 hover:bg-red-500 hover:shadow-md hover:shadow-slate-400">Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}


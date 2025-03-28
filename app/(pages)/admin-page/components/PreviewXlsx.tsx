import ExportExcel from "@/components/custom/exportExcel";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileDown } from "lucide-react"
import { useEffect, useState } from "react";

interface PropsType {
  columns: any[][];
  data: any[][];
  worksheetTitle?: string;
}

export function PreviewXlsx(props: PropsType) {
  const [workbookName, setWorkbookName] = useState('');
  const managerTitle = ["Lượng yêu cầu theo năm, Lượng yêu cầu theo tháng, Lượng yêu cầu theo tuần"]


  useEffect(() => {
    const current = Date.now().toString();
    if (workbookName.length == 0) {
      setWorkbookName(`my_file_${current}`)
    }
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className='flex items-center text-gray-600 rounded-md px-1'>
            <FileDown className='w-4' />
            <p className='text-sm'>Xuất file XLSX</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <div className="mt-4">
          <ExportExcel workbookName={workbookName} worksheetTitle={props?.worksheetTitle ? managerTitle : ['Doanh thu theo năm', 'Doanh thu theo tháng', 'Doanh thu theo tuần']} columns={props.columns} data={props.data} />
        </div>
      </DialogContent>
    </Dialog>
  )
}




'use client'
import React, { useEffect, useState } from 'react';
import Excel from 'exceljs';
import { columnProps } from './GenerateSampleFile';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {};

export default function ReadExcelFile({ }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [sheetHeader, setSheetHeader] = useState<string[]>([]);
  const [previewColumns, setPreviewColumns] = useState<columnProps[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);

  useEffect(() => {
    if (fileContent.length > 0) {
      const newSheetHeader = [...sheetHeader];
      if (newSheetHeader.length >= 8) newSheetHeader.shift();
      setSheetHeader(newSheetHeader);

      const columnsArray: columnProps[] = newSheetHeader.map(header => ({
        header,
        key: header.toLowerCase(),
      }));

      setPreviewColumns(columnsArray);
      // router.refresh();
    }
  }, [fileContent]);

  const handleSubmit = async () => {
    const response = await axios.post("/api/generate/staff", previewData)
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  const handleChooseFile = async (e: React.FormEvent) => {
    const files = (e.currentTarget as HTMLInputElement).files;
    if (files && files.length > 0) {
      setFile(files[0]);

      const wb = new Excel.Workbook();
      const reader = new FileReader();

      reader.readAsArrayBuffer(files[0]);
      reader.onload = () => {
        const buffer = reader.result;
        //@ts-ignore
        wb.xlsx.load(buffer).then(workbook => {
          workbook.eachSheet((sheet, id) => {
            let rowArray: any[][] = [];
            let rowHeader: string[] = [];
            let previewData_: any[] = [];

            sheet.eachRow((row, rowIndex) => {
              if (row.hasValues) {
                const stringArr: string[] = []
                for (let i = 0; i < (+row.values.length); i++) {
                  //@ts-ignore
                  const e = row.values[i]
                  if (e != undefined) {
                    if (typeof e == 'object') {
                      stringArr.push(e.text)
                    } else {
                      stringArr.push(e)

                    }
                  }
                }

                console.log(stringArr)
                if (rowIndex === 1) {
                  //@ts-ignore
                  setSheetHeader(stringArr);
                  //@ts-ignore
                  rowHeader = stringArr;
                } else {
                  //@ts-ignore

                  rowArray.push(stringArr);
                }
              }
            });

            setFileContent(rowArray);

            const processedData = rowArray.map(rowElement => {
              const obj: { [key: string]: string } = {};
              rowHeader.forEach((key, index) => {
                obj[key] = rowElement[index] || '';
              });
              return obj;
            });

            setPreviewData(processedData);
          });
        });
      };
    }
  };

  return (
    <div>
      <form className='flex flex-col items-center'>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" onChange={handleChooseFile} type="file" className="hidden" />
          </label>
        </div>

        <div className='my-8'>
          <div className='font-semibold text-xl text-center text-slate-500'>Bản xem trước</div>
        </div>
        <table style={{ margin: '0 auto' }}>
          <thead>
            <tr >
              {previewData.length > 0 && Object?.entries(previewData[0]).map(([key, value], index) => (
                //@ts-ignore
                <th key={index}>{key}</th>
              ))}
            </tr>

          </thead>
          <tbody>
            {previewData.map((uniqueData, i) => (
              <tr key={i}>
                {Object.entries(uniqueData).map(([key, value], index) => (
                  //@ts-ignore
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button type='button' onClick={handleSubmit} variant='outline' className='mt-4 mb-8 bg-crusta text-white hover:bg-crusta shadow-md hover:shadow-lg'>Tạo</Button>
      </form>
    </div>
  );
}


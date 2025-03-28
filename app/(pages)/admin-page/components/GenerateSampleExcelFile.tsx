'use client'
import React, { useEffect } from 'react';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
const myInputId = 'myInput';

interface PageProps {
  data: any[];
  columns: any[];
  workbookName: string;
  worksheetTitle: string[]
}

interface columnProps {
  header: string;
  key: string;
  width?: number;
  outlineLevel?: number;
}

export default function GenerateSampleExcelFile(
) {
  const worksheetName = "Thông tin nhân viên"
  const workbook = new Excel.Workbook();
  const header = ["email", "password", "gender", "phone", "role", "dob", "skills"];
  const [columns, setColumns] = React.useState([])
  const [roles, setRoles] = React.useState<string[]>([])
  const [skills, setSkills] = React.useState<string[]>([]
  )

  useEffect(() => {
    const columnsArray: columnProps[] = []
    for (const item of header) {
      let object = { header: item, key: item.toLowerCase() }
      columnsArray.push(object)
    }

    const fetchData = async () => {
      const response = await fetch("/api/initial/role").then((data) => data.json())
      setRoles(response)
      const skillResponse = await fetch("/api/initial/skills").then(data => data.json())
      setSkills(skillResponse)
      console.log(skillResponse)
    }

    fetchData()
    setColumns(columnsArray)
  }, [])

  const data = Array.from({ length: 1 }, (_, i) => ({
    email: `user${i}@example.com`,
    password: `password${i}`,
    gender: 'nam',
    phone: `123-456-789${i}`,
    role: roles[0].split(',')[0],
    dob: `1990-01-${String(i + 1).padStart(2, '0')}`,
    skills: skills[0].split(',')[0]
  }));

  const fileName = "sample_file";
  const saveExcel = async () => {
    try {

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(worksheetName);
      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };

      // loop through all of the columns and set the alignment with width.
      worksheet.columns.forEach(column => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      // loop through data and add each one to worksheet
      data.forEach(singleData => {
        worksheet.addRow(singleData);
      });

      const genderColumn = worksheet.getColumn('gender');
      genderColumn.eachCell((cell, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          cell.dataValidation = {
            type: 'list',
            allowBlank: false,
            errorTitle: 'Invalid selection',
            formulae: ["Nam, Nữ"],
            showErrorMessage: true,
            error: 'Please select a value from the dropdown list.'
          };
        }
      });

      const roleColumn = worksheet.getColumn('role');
      roleColumn.eachCell((cell, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          cell.dataValidation = {
            type: 'list',
            allowBlank: false,
            errorTitle: 'Invalid selection',
            formulae: roles,
            showErrorMessage: true,
            error: 'Please select a value from the dropdown list.'
          };
        }
      });

      const skillColumn = worksheet.getColumn('skills');
      skillColumn.eachCell((cell, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          cell.dataValidation = {
            type: 'list',
            allowBlank: false,
            errorTitle: 'Invalid selection',
            formulae: skills,
            showErrorMessage: true,
            error: 'Please select a value from the dropdown list.'
          };
        }
      });

      // loop through all of the rows and set the outline style.
      worksheet.eachRow({ includeEmpty: false }, row => {
        // store each cell to currentCell
        //@ts-ignore
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        //@ts-ignore
        currentCell.forEach(singleCell => {
          const cellAddress = singleCell._address;

          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('<<<ERRROR>>>', error);
      //@ts-ignore
      console.error('Something Went Wrong', error.message);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet("Thông tin nhân viên");
    }
  };

  return (
    <>
      <style>
        {`
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            textAlign: center;
          }
           th, td { 
             padding: 4px;
           }
        `}
      </style>
      <div style={{ textAlign: 'center' }}>
        <div>
          Tên File: <input id={myInputId} defaultValue={fileName} /> .xlsx
        </div>
        <div>
          <table style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                {columns.map(({ header }: { header: string }, i: number) => {
                  return <th key={i}>{header}</th>;
                })}
              </tr>

              {data.map((uniqueData: any, i: number) => {
                return (
                  <tr key={i}>
                    {Object.entries(uniqueData).map((eachData, index) => {
                      const value: string = eachData[1].toString();
                      return <td key={index}>{value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='mt-4'>
            <Button variant='outline' className='bg-crusta text-white' onClick={saveExcel}>Export</Button>
          </div>

        </div>
      </div>
    </>
  );
}




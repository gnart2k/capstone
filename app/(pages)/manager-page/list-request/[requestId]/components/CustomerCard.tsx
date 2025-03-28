"use client"
import { changePhone } from '@/app/actions/request/RequestAction';
import { useEditWrapperStore } from '@/app/store/useEditWrapperStore';
import EditWrapper from '@/components/custom/EditWrapper';
import { Button } from '@/components/ui/button';
import { CustomerCardProps } from '@/type/customerCard';
import { Phone } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


function CustomerCard({ props }: { props: CustomerCardProps }) {
  const params = useParams();
  const router = useRouter();
  const inputValue = useEditWrapperStore((state) => state.input);
  const setInputValue = useEditWrapperStore((state) => state.setInput);
  const [editField, setEditField] = useState<string | null>(null);
  useEffect(() => {
    if (editField === 'phone') {
      setInputValue(props.phone);
    }
  }, [editField, props.phone]);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const handleChangePhone = async () => {
    if (!validatePhone(inputValue)) {
      toast.error("Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số!!");
      return;
    }
    await changePhone({ requestId: params.requestId[0], phone: inputValue });
    toast.success("Cập nhật số điện thoại thành công!");
    router.refresh();
  };

  return (
    <div className=''>
      <div className='border shadow-md flex flex-col rounded-2xl items-center justify-center p-8 mt-2'>
        <div className='rounded-full border p-2 '>
          <img src={props.avatar} alt={props.name} className='rounded-full w-[125px] h-[125px] object-cover' />
        </div>
        <span className='text-2xl font-semibold text-center'>{props.name}</span>
        <span className='text-sm text-gray-500 mb-2 mt-2'>{props.address}</span>
        <div className='flex items-center'>
          <span className='text-sm text-gray-500 mr-2'>Số điện thoại:</span>
          <EditWrapper
            defaultValue={{ value: props.phone, type: "text" }}
            triggerFunction={handleChangePhone}
            onEdit={editField === 'phone'}
            setOnEdit={() => setEditField(editField === 'phone' ? null : 'phone')}
          >
            <span>{props.phone}</span>
          </EditWrapper>
        </div>

        <div className='border-t border-gray-300 mt-4 p-2 w-full flex items-center flex-col justify-center'>
          <Button variant='ghost' onClick={() => window.open(`tel:${props.phone}`)} className='bg-crusta shadow-md flex hover:bg-crusta hover:shadow-lg text-white mt-2'>
            <Phone className='w-[15px] mr-2' />
            <p>Gọi ngay</p></Button>
        </div>
      </div>
    </div>
  )
}


export default CustomerCard

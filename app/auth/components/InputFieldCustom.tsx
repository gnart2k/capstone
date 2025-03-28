"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"

export interface InputFieldCustomProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFieldCustom = React.forwardRef<HTMLInputElement, InputFieldCustomProps>(
  ({ className, type, label, placeholder, value, onChange, ...props }, ref) => {
    const [onPreview, setOnPreview] = useState(false)
    return (
      type !== "password" ? (
        <div className={cn("grid w-full max-w-sm items-center gap-1.5", `${className}`)} >
          <Label className="font-semibold">{label}</Label>
          <Input type={type} placeholder={placeholder} className="h-14 border-gray-700" value={value} onChange={onChange} />
        </div>
      ) : (
        <div className={cn("grid w-full max-w-sm items-center gap-1.5", `${className}`)} >
          <div className="flex justify-between items-end">
            <Label className="font-semibold">{label}</Label>
            {label.length < 9 && (
              <p className="text-gray-400 text-[12px]">Quen mat khau ?</p>
            )
            }
          </div>
          <div className="relative">
            {
              onPreview ? (
                <div>
                  <Input type="text" placeholder={placeholder} className="h-14 border-gray-700" value={value} onChange={onChange} />
                  <EyeOff className="text-orange-500 absolute right-2 top-4  cursor-pointer" onClick={() => setOnPreview(prev => !prev)} />
                </div>
              ) : (
                <div>
                  <Input type={type} placeholder={placeholder} className="h-14 border-gray-700" value={value} onChange={onChange} />
                  <Eye className="text-orange-500 absolute right-2 top-4 cursor-pointer" onClick={() => setOnPreview(prev => !prev)} />
                </div>
              )
            }
          </div>
        </div>
      )
    )
  }
)

InputFieldCustom.displayName = "InputFieldCustom"

export { InputFieldCustom }

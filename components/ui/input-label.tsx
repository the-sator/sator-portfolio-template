"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { AiOutlineExclamationCircle } from "react-icons/ai";
export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  showCount?: boolean;
  maxLength?: number;
  defaultValue?: string;
  required?: boolean;
  minHeight?: number;
  className?: string;
  instruction?: string;
  register?: UseFormRegisterReturn;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: ZodErrorFormatted | null;
};
type SelectWithLabelProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  options: SelectOption[];
  errors?: ZodErrorFormatted | null;
};
export function InputWithLabel({
  label,
  required = false,
  name,
  type = "text",
  placeholder,
  maxLength,
  onChange,
  className,
  instruction,
  value,
  defaultValue,
  errors,
  register,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Label htmlFor={name} className="flex items-center gap-2">
        <div>
          {label}
          {required && <span className="text-red-500">{" *"}</span>}
        </div>
        {instruction && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>
                <span className="sr-only w-full basis-1/2">Instruction</span>
                <AiOutlineExclamationCircle size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{instruction}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          // <Button variant="icon" className="h-4 w-4 p-0">

          // </Button>
        )}
      </Label>
      <Input
        {...register}
        type={type}
        name={name}
        variant={"outline"}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cn(errors && "border-red-400")}
      />
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

type ZodErrorFormatted = {
  _errors: string[];
};

type IconInputWithLabelProps = {
  label: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  icon: React.ReactNode;
  errors?: ZodErrorFormatted;
};

export function IconInputWithLabel({
  label,
  name,
  placeholder,
  icon,
  errors,
  defaultValue,
}: IconInputWithLabelProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <Label>{label}</Label>
      </div>
      <Input
        name={name}
        variant={"outline"}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function TextAreaWithLabel({
  label,
  placeholder,
  showCount = false,
  maxLength = 100,
  name,
  required,
  minHeight = 80,
  defaultValue,
  register,
}: Props) {
  const [text, setText] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };
  return (
    <div className="relative flex h-full flex-col gap-3">
      <Label>
        {label}
        <span className="text-red-500">{required && " *"}</span>
      </Label>
      <Textarea
        {...register}
        name={name}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        variant={"outline"}
        required={required}
        style={{
          minHeight: `${minHeight}px`,
        }}
        className="h-full"
      />
      {showCount && (
        <p className="absolute bottom-1 right-5 text-[12px] text-neutral-500">
          {text?.length || 0}/{maxLength}
        </p>
      )}
    </div>
  );
}

export function SelectWithLabel({
  label,
  options,
  defaultValue,
  placeholder,
  name,
  errors,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>

      <Select defaultValue={defaultValue} name={name}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors && (
        <p className="text-xs text-red-400">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

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
type SelectOption = {
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
};
export function InputWithLabel({
  label,
  required = false,
  name,
  type = "text",
  placeholder,
  onChange,
  value,
  defaultValue,
  errors,
  register,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register}
        type={type}
        name={name}
        variant={"outline"}
        placeholder={placeholder}
        value={value}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
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
      <Label>{label}</Label>
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
    </div>
  );
}

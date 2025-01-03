"use client";
import React from "react";
import { Button } from "../button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type SubmitButtonProps = {
  label: string;
  className?: string;
};
export default function SubmitButton({ label, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className={cn("mt-6 flex w-full gap-2", className)}
    >
      {label}
      {pending && <AiOutlineLoading3Quarters className="animate-spin" />}
    </Button>
  );
}

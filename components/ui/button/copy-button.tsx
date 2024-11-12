"use client";
import React, { MouseEventHandler } from "react";
import { Button, ButtonProps } from "../button";
import { IoCopy } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type CopyButtonProps = ButtonProps & {
  text: string;
};

export default function CopyButton({
  text,
  className,
  ...props
}: CopyButtonProps) {
  const { toast } = useToast();
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link has been copied to clipboard",
        variant: "success",
      });
    } catch (error: unknown) {
      toast({
        title: "Unexpected Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      variant="icon"
      size="icon"
      type="button"
      className={cn(
        "bg-main hover:bg-main/70 flex-shrink-0 rounded-l-none py-5",
        className,
      )}
      onClick={handleCopy}
      {...props}
    >
      <IoCopy className="h-4 w-4" />
    </Button>
  );
}

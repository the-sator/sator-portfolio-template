"use client";
import { Button } from "@/components/ui/button";
import { useOverlay } from "@/store/overlay";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

export default function CreateButton() {
  const { showModal, setShowModal } = useOverlay();

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log("showModal:", showModal);
        setShowModal(true);
      }}
    >
      <IoAddOutline size={14} />
      <p className="text-sm group-hover:text-blue-700">Create</p>
    </Button>
  );
}

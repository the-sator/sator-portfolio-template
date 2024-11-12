import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  size?: number;
};
export default function Spinner({ size = 14 }: Props) {
  return (
    <AiOutlineLoading3Quarters
      className="animate-spin text-neutral-500"
      size={size}
    />
  );
}

import ImageContainer from "@/components/ui/image/image-container";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import placeholder from "@/public/image/placeholder-portfolio.png";
import Tag from "@/components/ui/tag";

export default function Blogpage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          href={"/"}
          className="group flex items-center gap-2 rounded-md border px-4 py-1 transition-all hover:border-blue-800/70"
        >
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex h-[200px] w-full overflow-hidden rounded-md border bg-card">
          <ImageContainer src={placeholder} className="h-full basis-1/2" />
          <div className="flex flex-col justify-between gap-2 px-10 py-6">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Tag color="blue">Art</Tag>
                <Tag color="blue">Inspiration</Tag>
                <Tag color="blue">UI Design</Tag>
              </div>
              <div>
                <h2 className="text-lg font-bold">Project Demolition</h2>
                <p className="text-xs text-label">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                  modi distinctio sequi, voluptatem magnam ducimus et numquam
                  praesentium ut minus quod quia ea, omnis esse maiores
                  asperiores sunt incidunt possimus!
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <p className="text-xs">16 Nov 2024</p>
              <p className="text-xs">1000 views</p>
            </div>
          </div>
        </div>
        <Link
          href={"/blog/create"}
          className="group flex min-h-[200px] w-full items-center justify-center rounded-md border border-dashed p-0 transition-all hover:border-black hover:dark:border-label/50"
        >
          <IoAddOutline
            size={24}
            className="text-border group-hover:text-black group-hover:dark:text-label/50"
          />
        </Link>
      </div>
    </div>
  );
}

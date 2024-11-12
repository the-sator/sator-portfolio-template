import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
// import { updateTag } from "@/data/client/tag";

// import { revalidatePathClient } from "@/action";
// import { deleteTag } from "@/action/tag";
type Props = {
  tag: {
    label: string;
    value: string;
    color?: string;
    icon?: React.ComponentType<{
      className?: string;
    }>;
  };
  onTagUpdate?: () => Promise<void>;
  startLoadingTransition: React.TransitionStartFunction;
};

export default function TagEditDropdown({
  tag,
  // onTagUpdate,
  // startLoadingTransition,
}: Props) {
  const [open, setOpen] = useState(false); // Track dropdown open state
  // const router = useRouter();

  const { register, setValue, watch } = useForm({
    defaultValues: {
      name: tag.label,
      color: tag.color,
      id: tag.value,
    },
  });

  const colorClasses = {
    red: "border-red-800 bg-red-900/30 text-white",
    violet: "border-violet-800 bg-violet-900/30 text-white",
    green: "border-green-800 bg-green-900/30 text-white",
    purple: "border-purple-800 bg-purple-900/30 text-white",
    yellow: "border-yellow-800 bg-yellow-900/30 text-white",
    orange: "border-orange-800 bg-orange-900/30 text-white",
    gray: "border-gray-700 bg-gray-900/90 text-white",
    teal: "border-teal-800 bg-teal-900/30 text-white",
    indigo: "border-indigo-800 bg-indigo-900/30 text-white",
    blue: "border-blue-800 bg-blue-900/30 text-white",
  };
  const selectedColor = watch("color"); // Watch the selected color

  //   const isDataChanged = (data: any) => {
  //     return data.name !== tag.label || data.color !== tag.color;
  //   };
  //   const handleUpdateTag = useCallback(
  //     async (data: any) => {
  //       if (!isDataChanged(data)) {
  //         console.log("No changes, skipping update.");
  //         return;
  //       }
  //       startLoadingTransition(async () => {
  //         try {
  //           const { error } = await updateTag(data);
  //           if (error) {
  //             toast({
  //               title: "Error Updating Tag!",
  //               description: error.message,
  //               variant: "destructive",
  //             });
  //             return;
  //           }
  //           if (onTagUpdate) {
  //             onTagUpdate();
  //           }
  //           revalidatePathClient("/create");
  //         } catch (error: unknown) {
  //           toast({
  //             title: "Error Updating Tag!",
  //             description: error instanceof Error ? error.message : String(error),
  //             variant: "destructive",
  //           });
  //         }
  //       });
  //     },
  //     [toast, onTagUpdate, isDataChanged]
  //   );

  //   const handleDeleteTag = async (e: React.MouseEvent<HTMLDivElement>) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     startLoadingTransition(async () => {
  //       try {
  //         const { error } = await deleteTag(+tag.value);
  //         if (error) {
  //           toast({
  //             title: "Error Deleting Tag!",
  //             description: error.message,
  //             variant: "destructive",
  //           });
  //           return;
  //         }
  //         toast({
  //           title: "Successfully Delete Tag!",
  //           variant: "success",
  //         });
  //         if (onTagUpdate) {
  //           onTagUpdate();
  //         }
  //         revalidatePathClient("/create");
  //       } catch (error: unknown) {
  //         toast({
  //           title: "Error Updating Tag!",
  //           description: error instanceof Error ? error.message : String(error),
  //           variant: "destructive",
  //         });
  //       }
  //     });
  //   };

  return (
    <DropdownMenu
      open={open} // Control open state
      onOpenChange={(isOpen) => {
        // if (!isOpen) {
        //   handleSubmit(handleUpdateTag)(); // Trigger form submission when the dropdown closes
        // }
        console.log("Changing");
        setOpen(isOpen); // Update state
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant={"icon"}
          size={"icon"}
          className="h-full w-fit rounded-full p-1 hover:bg-neutral-700/50 focus-visible:ring-offset-0"
        >
          <SlOptionsVertical className="text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52"
        side="right"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="p-2">
          <Input
            {...register("name")}
            variant={"outline"}
            className="h-8 text-[12px]"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
          />
        </div>
        <DropdownMenuItem>
          <MdDelete className="mr-2 h-4 w-4 text-red-400" />
          <Button variant={"icon"} size={"icon"} className="h-fit text-red-400">
            Delete
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-4" />
        <p className="mb-2 px-2 text-sm">Color</p>
        {Object.entries(colorClasses).map(([colorName, classes]) => (
          <DropdownMenuCheckboxItem
            key={colorName}
            className={cn(
              "flex cursor-pointer items-center gap-4",
              selectedColor === colorName ? "bg-neutral-700/50" : "", // Highlight selected color
            )}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              setValue("color", colorName);
            }} // Set color on click
          >
            <div className={cn("size-2 rounded-full border", classes)}></div>
            <span className="text-sm capitalize">{colorName}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

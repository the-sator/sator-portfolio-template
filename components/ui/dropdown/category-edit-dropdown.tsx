import React, { useCallback, useState } from "react";
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
import { CreateCategory } from "@/types/category.type";
import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/action/category.action";
import { toast } from "@/hooks/use-toast";
import { Color } from "@/enum/base.enum";

type Props = {
  category: {
    label: string;
    value: string;
    color?: string;
    icon?: React.ComponentType<{
      className?: string;
    }>;
  };
  startLoadingTransition: React.TransitionStartFunction;
};

export default function CategoryEditDropdown({
  category,
  // onCategoryUpdate,
  startLoadingTransition,
}: Props) {
  const [open, setOpen] = useState(false); // Track dropdown open state
  // const router = useRouter();

  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      name: category.label,
      color: category.color?.toUpperCase() as Color,
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

  const handleUpdateCategory = useCallback(
    async (data: CreateCategory) => {
      const isDataChanged = (data: CreateCategory) => {
        return data.name !== category.label || data.color !== category.color;
      };
      if (!isDataChanged(data)) {
        console.log("No changes, skipping update.");
        return;
      }
      console.log("Data: ", data);
      // return;
      startLoadingTransition(async () => {
        try {
          const response = await updateCategoryAction(category.value, data);
          console.log("response:", response);
          if (response.error) {
            if ("statusCode" in response.error) {
              toast({
                title: "Update Category Error",
                description: response.error.error,
                variant: "destructive",
                duration: 1500,
              });
            } else {
              toast({
                title: "Update Category Error",
                description: response.error.name?._errors,
                variant: "destructive",
                duration: 1500,
              });
            }
          } else {
            toast({
              title: "Category Updated",
              variant: "success",
            });
          }
        } catch (error: unknown) {
          toast({
            title: "Error Updating Category!",
            description: error instanceof Error ? error.message : String(error),
            variant: "destructive",
          });
        }
      });
    },
    [startLoadingTransition, category],
  );

  const handleDeleteCategory = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    startLoadingTransition(async () => {
      try {
        const { error } = await deleteCategoryAction(category.value);
        if (error) {
          toast({
            title: "Error Deleting Category!",
            description: error.error,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Successfully Delete Category!",
          variant: "success",
        });
      } catch (error: unknown) {
        toast({
          title: "Error Updating Category!",
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
      }
    });
  };

  return (
    <DropdownMenu
      open={open} // Control open state
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleSubmit(handleUpdateCategory)(); // Trigger form submission when the dropdown closes
        }
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
            autoComplete="off"
            className="h-8 text-[12px]"
          />
        </div>
        <DropdownMenuItem>
          <MdDelete className="mr-2 h-4 w-4 text-red-400" />
          <Button
            onClick={handleDeleteCategory}
            variant={"icon"}
            size={"icon"}
            className="h-fit text-red-400"
          >
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
              selectedColor === colorName.toUpperCase()
                ? "bg-neutral-700/50"
                : "", // Highlight selected color
            )}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              setValue("color", colorName.toUpperCase() as Color);
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

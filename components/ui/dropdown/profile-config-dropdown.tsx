import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { ChevronsUpDown } from "lucide-react";
import { IoLogOutSharp } from "react-icons/io5";

export default function ProfileConfigDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group flex h-12 w-full justify-between px-2"
          variant="ghost"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-left text-sm">Ponleu</p>
              <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/50">
                ponleu@gmail.com
              </p>
            </div>
          </div>
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IoLogOutSharp className="text-red-500" />

            <p className="text-red-500">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

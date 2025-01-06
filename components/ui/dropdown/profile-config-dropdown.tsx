"use client";
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
import { toast } from "@/hooks/use-toast";
import { siteUserSignoutAction } from "@/action/auth.action";
import { SiteUser } from "@/types/site-user.type";
type Props = {
  user: SiteUser;
};
export default function ProfileConfigDropdown({ user }: Props) {
  const handleSignout = async () => {
    const { error } = await siteUserSignoutAction();
    if (error) {
      toast({
        title: "Error Signing Out",
        description: error.error,
        variant: "destructive",
      });
    }
  };
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
              <p className="text-left text-sm">{user.username}</p>
              <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/50">
                {user.email}
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
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              variant={"icon"}
              onClick={handleSignout}
              className="flex h-fit w-full items-center justify-start gap-2 px-2 py-2 font-normal text-red-500 opacity-80 hover:opacity-100"
            >
              <IoLogOutSharp className="text-red-500" />
              <p className="text-red-500">Logout</p>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

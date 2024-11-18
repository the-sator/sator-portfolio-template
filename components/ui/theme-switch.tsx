"use client";
import { useTheme } from "next-themes";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Spinner from "./spinner";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Spinner />;

  if (resolvedTheme === "dark") {
    return (
      <IoMdSunny
        className="flex-shrink-0 cursor-pointer transition-all hover:scale-110"
        color="white"
        onClick={() => setTheme("light")}
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <MdDarkMode
        className="flex-shrink-0 cursor-pointer text-neutral-900 transition-all hover:scale-110"
        onClick={() => setTheme("dark")}
      />
    );
  }
}

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        width="40"
        height="40"
        className="hidden dark:block"
      />
      <Image
        src="/logo-light.svg"
        alt="Logo"
        width="40"
        height="40"
        className="dark:hidden"
      />
      <p className={cn("font-semibold", font.className)}>Notion</p>
    </div>
  );
};

export default Logo;

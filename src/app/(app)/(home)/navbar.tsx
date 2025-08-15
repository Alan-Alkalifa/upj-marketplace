"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      className={cn(
        "bg-transparent hover:bg-primary text-primary rounded-xl hover:text-white transition-colors border-transparent px-3.5 text-lg",
        isActive &&
          "bg-secondary text-white hover:bg-primary hover:border-primary hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/about", children: "About" },
  { href: "/priceing", children: "Priceing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold text-primary")}>
          Marketplace
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex lg:pr-6">
        <Button
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 h-full rounded-none bg-white text-primary hover:bg-primary hover:text-white transition-colors text-lg "
        >
          Log in
        </Button>
        <Button
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 h-full rounded-none bg-primary text-white hover:bg-primary transition-colors text-lg "
        >
          Start Selling
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center pr-6">
        <Button
          className="size-12 border-transparent bg-primary"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

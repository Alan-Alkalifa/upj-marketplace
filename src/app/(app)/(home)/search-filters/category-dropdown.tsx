"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState, useCallback } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustomCategory;
  isActive: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { getDropdownPosition } = useDropdownPosition()(dropdownRef);

  const onMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const docs = Array.isArray(category.subcategories)
      ? category.subcategories
      : category.subcategories?.docs ?? [];
    const hasSubcategories = docs.filter((d) => typeof d !== "string").length > 0;
    if (hasSubcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to close the dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 50); // 300ms delay before closing
  }, []);

  const dropdownPosition = getDropdownPosition();
  const toggleDropdown = () => {
    const docs = Array.isArray(category.subcategories)
      ? category.subcategories
      : category.subcategories?.docs ?? [];
    const hasSubcategories = docs.filter((d) => typeof d !== "string").length > 0;
    if (hasSubcategories){
      setIsOpen(!isOpen)
    }
  }
  return (
    <>
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={toggleDropdown}
      >
        <Button
          className={cn(
            "bg-muted text-primary rounded-xl transition-colors h-11 px-4 border border-transparent hover:bg-transparent hover:border-primary hover:text-primary",
            isActive &&
              !isNavigationHovered &&
              "bg-primary text-primary-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground",
              isOpen && "border-primary text-primary bg-muted"
          )}
        >
          <Link
          prefetch
          href={`/${category.slug === "all" ? "" : category.slug}`}>
          {category.categories}
          </Link>
        </Button>
        {(() => {
          const docs = Array.isArray(category.subcategories)
            ? category.subcategories
            : category.subcategories?.docs ?? [];
          const hasSubcategories = docs.filter((d) => typeof d !== "string").length > 0;
          return hasSubcategories;
        })() && (
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-[10px] border-b-black left-1/2 -translate-x-1/2",
                isOpen && "opacity-100"
              )}
            />
          )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};

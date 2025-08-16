"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState, useCallback } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
  category: Category;
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

    if (category.subcategories) {
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

  return (
    <>
      <div
        className="relative"
        ref={dropdownRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Button
          className={cn(
            "bg-primary text-white rounded-xl transition-colors h-11 px-4 border border-transparent hover:bg-transparent hover:border-primary hover:text-primary",
            isActive &&
              !isNavigationHovered &&
              "bg-secondary text-white hover:bg-primary hover:border-primary hover:text-white"
          )}
        >
          {category.categories}
        </Button>
        {category.subcategories &&
          category.subcategories.docs &&
          category.subcategories.docs.length > 0 && (
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

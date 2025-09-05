import Link from "next/link";
import { CustomCategory } from "../types";
import { Category } from "@/payload-types";

interface Props {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number; left: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SubcategoryMenu = ({ 
  category, 
  isOpen, 
  position, 
  onMouseEnter, 
  onMouseLeave 
}: Props) => {
  ( {
    isOpen,
    category: category.categories,
    subcategories: category.subcategories,
  });

  const docsRaw: (string | Category)[] = Array.isArray(category.subcategories)
    ? (category.subcategories as unknown as (string | Category)[])
    : (category.subcategories?.docs ?? []);
  const objectDocs: Category[] = docsRaw.filter((d): d is Category => typeof d !== "string");
  if (!isOpen || objectDocs.length === 0) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

     return (
     <div
       className="fixed z-50 mt-3"
       style={{ top: position.top, left: position.left }}
       onMouseEnter={onMouseEnter}
       onMouseLeave={onMouseLeave}
     >
      <div className="w-60">
        <div
          style={{ backgroundColor }}
          className="w-60 rounded-md overflow-hidden border"
        >
          <div>
            {objectDocs.map((subcategory) => {
              return (
                <Link
                  key={subcategory.slug }
                  href={`/${category.slug}/${subcategory.slug}`}
                  className="w-full text-left p-4 hover:bg-primary hover:text-white flex justify-between items-center underline font-medium"
                >
                  {subcategory.categories}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

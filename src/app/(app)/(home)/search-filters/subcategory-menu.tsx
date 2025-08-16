import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: Category;
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
  console.log("SubcategoryMenu props:", {
    isOpen,
    category: category.categories,
    subcategories: category.subcategories,
  });

  if (
    !isOpen ||
    !category.subcategories ||
    !category.subcategories.docs ||
    category.subcategories.docs.length === 0
  ) {
    console.log("SubcategoryMenu returning null");
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
            {category.subcategories.docs?.map((subcategory) => {
              if (typeof subcategory === "string") return null;
              return (
                <Link
                  key={subcategory.slug }
                  href="/"
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

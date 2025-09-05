import { Category } from "@/payload-types";

export type CustomCategory = Omit<Category, "subcategories"> & {
    subcategories?:
        | Category[]
        | {
            docs?: (string | Category)[];
            hasNextPage?: boolean;
            totalDocs?: number;
        }
        | null;
}
'use client'
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react"
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    disabled?: boolean;
    data: CustomCategory[];
}

export const SearchInput = ({ disabled, data }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
                <Input placeholder="Search Products" className="pl-8" disabled={disabled} />
            </div>

            <Button
            className=" shrink-0 flex lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon/>
            </Button>
        </div>
    )
}
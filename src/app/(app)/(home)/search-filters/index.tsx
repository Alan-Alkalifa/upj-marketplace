import { CustomCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface Props {
  data: CustomCategory[];
}
export const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 py-8 border-b-2 flex flex-col gap-4 w-full">
      <SearchInput data={data}/>
      <div className="hidden lg:block">
      <Categories data={data}/>
      </div>
    </div>
  );
};

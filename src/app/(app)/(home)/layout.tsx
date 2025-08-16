import Footer from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Categories } from "./search-filters/categories";
import { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })
  
  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      }
    }
  });
  
  const formatedData = data.docs.map((doc) => ({
    ...doc,
    subCategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    }))
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formatedData}/>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;

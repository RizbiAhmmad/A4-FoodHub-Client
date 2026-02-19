import { getCategories } from "@/actions/category.action";
import { CategoryTable } from "@/components/modules/admin/category/CategoryTable";


const AllCategoryPage = async () => {
  const { data } = await getCategories();

  return (
    <div className="p-6">
      <CategoryTable categories={data} />
    </div>
  );
};

export default AllCategoryPage;

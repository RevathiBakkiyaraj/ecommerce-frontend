import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../State/Store";

const ShopByCategory = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div
      className="
        flex
        flex-wrap
        justify-center
        lg:justify-between
        gap-4
        sm:gap-5
        md:gap-6
        lg:gap-8
        px-4
        sm:px-6
        md:px-10
        lg:px-20
      "
    >
      {customer.homePageData?.shopByCategories?.map((item) => (
        <ShopByCategoryCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default ShopByCategory;
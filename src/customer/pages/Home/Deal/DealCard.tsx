import { Deal } from "../../../../types/dealTypes";

const DealCard = ({ item }: { item: Deal }) => {
  return (
    <div
      className="
        w-full
        max-w-[13rem]
        mx-auto
        cursor-pointer
      "
    >
      <img
        className="
          border-x-[5px]
          sm:border-x-[7px]
          border-t-[5px]
          sm:border-t-[7px]
          border-pink-600
          w-full
          h-[11rem]
          sm:h-[12rem]
          md:h-[13rem]
          object-cover
          object-top
        "
        src={item.category.image}
        alt={item.category.name}
      />

      <div
        className="
          border-4
          border-black
          bg-black
          text-white
          p-2
          sm:p-3
          text-center
        "
      >
        <p
          className="
            text-base
            sm:text-lg
            font-semibold
            truncate
          "
        >
          {item.category.name}
        </p>

        <p
          className="
            text-xl
            sm:text-2xl
            font-bold
          "
        >
          {item.discount}% OFF
        </p>

        <p
          className="
            text-sm
            sm:text-lg
          "
        >
          Shop now
        </p>
      </div>
    </div>
  );
};

export default DealCard;
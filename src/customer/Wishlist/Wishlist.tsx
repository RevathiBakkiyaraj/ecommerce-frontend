import React, { useEffect } from 'react';
import WishlistProductCard from './WishlistProductCard';
import { useAppDispatch, useAppSelector } from '../../State/Store';
import { getWishlistByUserId } from '../../State/customer/wislistSlice';

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const wishlist = useAppSelector(
    (store) => store.wishlist.wishlist
  );

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, [dispatch]);

  const products = wishlist?.products ?? [];

  return (
    <div className="min-h-[85vh] p-5 lg:p-20">
      <section>
        <h1>
          <strong>My Wishlist</strong>{" "}
          <span>{products.length} items</span>
        </h1>

        {products.length === 0 ? (
          <div className="pt-10">
            <p className="text-gray-500">
              Your wishlist is empty.
            </p>
          </div>
        ) : (
          <div className="pt-10 flex flex-wrap gap-5">
            {products.map((item) => (
              <WishlistProductCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
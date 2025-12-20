import { useEffect, useState } from "react";
import Styles from "./LikeSelector.module.scss";
import LikeImg from "./assets/Favorite.svg?react";
import { useFavoriteToggleMutation } from "./api/likeSelector.api";
import { useGetFavoritedProductsQuery } from "@/pages/CategoryPage/api/categoryPage.api";

type LikeSelectorProps = {
  SKU: string;
  category: string;
};

export const LikeSelector = ({ SKU, category }: LikeSelectorProps) => {
  const [likeToggle] = useFavoriteToggleMutation();

  const { data } = useGetFavoritedProductsQuery();

  const [liked, setLiked] = useState<boolean>();

  useEffect(() => {
    const favoriteStatus = data?.skus.some((sku) => sku === SKU);
    if (favoriteStatus) {
      setLiked(favoriteStatus);
    } else {
      setLiked(false);
    }
  }, [data, SKU]);

  const likeHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    void (await likeToggle({ category, SKU }));
  };

  return (
    <button
      onClick={(event) => void likeHandler(event)}
      className={`${liked ? Styles.toggled : ""} ${Styles.toggle}`}
    >
      <LikeImg />
    </button>
  );
};

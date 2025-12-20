import { FullScreenWrapper } from "@/shared";
import { Sidebar } from "@/widgets";
import { useProductCard } from "@/widgets/ProductCards/hook/useProductCard";
import { useParams } from "react-router";
import Styles from "./CategoryPage.module.scss";
import { CategoryPageProductsCards } from "@/features";
import { useGetFavoritedProductsQuery } from "./api/categoryPage.api";

export const CategoryPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { isSuccess, productCardsData } = useProductCard({ category });

  const { favorites, success } = useGetFavoritedProductsQuery(undefined, {
    selectFromResult: (result) => ({
      skip: category !== "favorites",
      success: result.isSuccess,
      favorites:
        result.data?.favorites.map((favorite) => ({
          SKU: favorite.SKU,
          promo: favorite.promo,
          TitleImg: favorite.TitleImg,
          name: favorite.name,
          price: favorite.price,
          rating: favorite.rating,
          brand: favorite.brand,
          category: favorite.category,
        })) ?? [],
    }),
  });

  return (
    <FullScreenWrapper>
      <h1>{category} category page</h1>
      {isSuccess && (
        <div className={Styles.categoryPage}>
          <Sidebar productsData={category === "favorites" ? favorites : productCardsData} />
          <div className={Styles.productCardsWrapper}>
            <CategoryPageProductsCards
              productCardsData={category === "favorites" ? favorites : productCardsData}
            />
          </div>
        </div>
      )}
    </FullScreenWrapper>
  );
};

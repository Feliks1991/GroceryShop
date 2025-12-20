import { useGetProductsByCategoryQuery } from "../api/productCard.api";
import type Product from "@/app/store/ProductType";

type UseProductCardParams = {
  category?: string;
  size?: number;
};

export type ProductCardType = Pick<
  Product,
  "SKU" | "promo" | "TitleImg" | "name" | "price" | "rating" | "brand" | "category"
>;

type UseProductCard = {
  productCardsData: ProductCardType[];
  isSuccess: boolean;
};

export const useProductCard = ({ category, size }: UseProductCardParams): UseProductCard => {
  const { productCardsData, isSuccess } = useGetProductsByCategoryQuery(category ?? "", {
    skip: !category && category === "favorites",
    selectFromResult: (result) => ({
      isSuccess: result.isSuccess,
      productCardsData:
        result.data?.slice(0, size ?? result.data.length).map((product) => ({
          SKU: product.SKU,
          promo: product.promo,
          TitleImg: product.TitleImg,
          name: product.name,
          price: product.price,
          rating: product.rating,
          brand: product.brand,
          category: product.category,
        })) ?? [],
    }),
  });
  return { productCardsData, isSuccess };
};

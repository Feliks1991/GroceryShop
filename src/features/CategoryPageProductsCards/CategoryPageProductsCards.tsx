import { GridContainer } from "@/shared";
import { ProductCardType } from "../../widgets/ProductCards/hook/useProductCard";
import { ProductCard } from "@/entities";
import { useAppSelector } from "@/app/store/reduxTypes";

type CategoryPageProductsCardsProps = {
  productCardsData: ProductCardType[];
};

export const CategoryPageProductsCards = ({ productCardsData }: CategoryPageProductsCardsProps) => {
  const filterParams = useAppSelector((state) => state.filterOptionsSlice);

  type FilterParams = typeof filterParams;

  type HandlerMap = {
    [K in keyof FilterParams]: (product: ProductCardType, params: FilterParams[K]) => boolean;
  };

  const filterHandlers: HandlerMap = {
    priceRange: (product, params) => {
      const price = product.promo.discount ? product.price.discountCard : product.price.regular;
      return price >= Math.min(...params) && price <= Math.max(...params);
    },
    allowedBrands: (product, params) => {
      return !params.length || params.includes(product.brand);
    },
  };

  const filter = (products: ProductCardType[]) => {
    const entries = Object.entries(filterHandlers) as [
      keyof FilterParams,
      HandlerMap[keyof FilterParams],
    ][];
    return products.filter((product) =>
      entries.every(<K extends keyof FilterParams>([key, handler]: [K, HandlerMap[K]]) =>
        handler(product, filterParams[key]),
      ),
    );
  };

  const filteredProducts = filter(productCardsData);

  return (
    <GridContainer>
      {filteredProducts.map((item) => (
        <ProductCard {...item} key={item.SKU} />
      ))}
    </GridContainer>
  );
};

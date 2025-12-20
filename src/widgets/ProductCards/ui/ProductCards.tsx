import { useProductCard } from "@/widgets/ProductCards/hook/useProductCard";
import { ProductCard } from "@/entities/ProductCard";
import { GridContainer } from "@/shared";

type ProductCardsProps = {
  category: string;
  size?: 3 | 4;
};

export const ProductCards = ({ category, size }: ProductCardsProps) => {
  const { productCardsData } = useProductCard({ category, size });

  return (
    <GridContainer>
      {productCardsData.map((item) => (
        <ProductCard {...item} key={item.SKU} />
      ))}
    </GridContainer>
  );
};

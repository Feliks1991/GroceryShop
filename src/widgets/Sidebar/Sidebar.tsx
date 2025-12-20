import { RangeSlider, BrandSelector } from "@/features";
import Styles from "./Sidebar.module.scss";
import { useMemo } from "react";
import { ProductCardType } from "@/widgets";

type SidebarProps = {
  productsData: ProductCardType[];
};

export const Sidebar = ({ productsData }: SidebarProps) => {
  const allowedPriceRange = useMemo(() => {
    const prices = productsData.map((product) =>
      product.promo.discount ? product.price.discountCard : product.price.regular,
    );
    return [Math.min(...prices), Math.max(...prices)];
  }, [productsData]);

  const brandsByCategory = useMemo(() => {
    return Array.from(new Set(productsData.map((product) => product.brand))).sort();
  }, [productsData]);

  return (
    <aside className={Styles.sidebar}>
      <RangeSlider allowedPriceRange={allowedPriceRange} />
      <BrandSelector brandsByCategory={brandsByCategory} />
    </aside>
  );
};

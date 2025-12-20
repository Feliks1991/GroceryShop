import { FullScreenWrapper, SectionWrapper } from "@/shared";
import Styles from "./ProductPage.module.scss";
import {
  Comments,
  ProductImgsSlider,
  DescriptionTable,
  ProductPagePrice,
  SimilarProduct,
} from "@/features";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetProductQuery } from "./api/productPage.api";

export const ProductPage = () => {
  const { category, sku } = useParams<{ category?: string; sku?: string }>();

  const { data, isSuccess } = useGetProductQuery(
    category && sku ? { category: category, SKU: sku } : skipToken,
  );

  return (
    <FullScreenWrapper>
      {isSuccess && (
        <SectionWrapper title={data.name}>
          <div className={Styles.productDataBlock}>
            <ProductImgsSlider
              titleImg={data.TitleImg}
              imgs={data.imgs}
              discountPercent={data.promo.percentage}
              discount={data.promo.discount}
            />

            <div className={Styles.productDescription}>
              <ProductPagePrice
                regularPrice={data.price.regular}
                discountPrice={data.price.discountCard}
                discount={data.promo.discount}
              />
              <DescriptionTable
                brand={data.brand}
                origin={data.origin}
                value={data.packing.value}
                unit={data.packing.unit}
                description={data.description}
              />
            </div>
            <SimilarProduct category={category} />
          </div>
        </SectionWrapper>
      )}
      <Comments category={category} sku={sku} />
    </FullScreenWrapper>
  );
};

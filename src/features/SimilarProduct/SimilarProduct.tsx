import { useNavigate } from "react-router";
import Styles from "./SimilarProduct.module.scss";
import { useGetRandomProductQuery } from "./api/similar.api";
import type Product from "@/app/store/ProductType";

type SimilarProductProps = {
  category?: string;
};

export const SimilarProduct = ({ category }: SimilarProductProps) => {
  const { randomData, randomSuccess } = useGetRandomProductQuery(category ?? "", {
    skip: !category,
    selectFromResult: (result) => ({
      randomSuccess: result.isSuccess,
      randomData: result.data?.map((product) => ({
        SKU: product.SKU,
        category: product.category,
        TitleImg: product.TitleImg,
        price: product.price,
        promo: product.promo,
      })),
    }),
  });

  type SimilarProduct = Pick<Product, "SKU" | "promo" | "TitleImg" | "category">;

  const navigate = useNavigate();
  const goToProduct = (data: SimilarProduct) => {
    void navigate(`/catalog/${data.category}/${data.SKU}`);
  };

  return (
    <>
      {randomSuccess && (
        <div className={Styles.similarProducts}>
          <p className={Styles.similarTitle}>Похожие</p>
          {randomData?.map((product, index) => (
            <div
              onClick={() => {
                goToProduct(product);
              }}
              key={index}
              className={Styles.productCardMinimal}
            >
              <div className={Styles.imgWrapper}>
                <img src={product.TitleImg} alt="" />
              </div>
              <div className={Styles.priceWrapper}>
                <p className={Styles.price}>
                  {product.promo.discount ? product.price.discountCard : product.price.regular}
                  <span>₽</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

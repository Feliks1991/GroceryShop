import { LikeSelector, PercentageBadge } from "@/shared";
import Blin from "./assets/Blin.png";
import Styles from "./ProductImage.module.scss";

type ProductImageProps = {
  percent?: number;
  page?: boolean;
  img: string;
  SKU: string;
  category: string;
};

export const ProductImage: React.FC<ProductImageProps> = ({
  percent,
  page,
  img,
  SKU,
  category,
}) => {
  return (
    <div className={Styles.imgWrapper}>
      <img src={img ? img : Blin} alt={"Blin"} className={Styles.img} />
      {percent ? (
        <div className={page ? Styles.bageWrapperPage : Styles.bageWrapperCard}>
          <PercentageBadge percent={percent} />
        </div>
      ) : null}
      {page ? null : (
        <div className={Styles.likeWrapper}>
          <LikeSelector SKU={SKU} category={category} />
        </div>
      )}
    </div>
  );
};

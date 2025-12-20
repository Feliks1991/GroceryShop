import { PercentageBadge } from "@/shared";
import Styles from "./ProductImgsSlider.module.scss";
import DownArrow from "./assets/DownArrow.svg?react";
import { useEffect, useRef, useState } from "react";

type ProductImgsSliderProps = {
  titleImg: string;
  imgs: string[];
  discountPercent: number;
  discount: boolean;
};

export const ProductImgsSlider = ({
  titleImg,
  imgs,
  discount,
  discountPercent,
}: ProductImgsSliderProps) => {
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [activeImg, setActiveImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    setActiveImg(titleImg);
  }, [titleImg]);

  const scroll = (scrollDirection: "up" | "down") => {
    if (thumbRef.current) {
      const thumbQty = thumbRef.current.children.length;
      const thumbsHeight = thumbRef.current.scrollHeight;
      const step = thumbsHeight / thumbQty;
      thumbRef.current.scrollBy({
        top: scrollDirection === "up" ? step : -step,
        behavior: "smooth",
      });
    }
  };

  const allThumbs = [titleImg, ...imgs];

  return (
    <div className={Styles.slider}>
      <div className={Styles.thumbList}>
        <button
          className={`${Styles.scrollButton} ${Styles.scrollButtonUp}`}
          onClick={() => {
            scroll("down");
          }}
        >
          <DownArrow />
        </button>
        <div ref={thumbRef} className={Styles.thumbs}>
          {allThumbs.map((thumb, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveImg(thumb);
              }}
              className={Styles.thumb}
            >
              <img src={thumb} alt="" />
            </div>
          ))}
        </div>
        <button
          className={Styles.scrollButton}
          onClick={() => {
            scroll("up");
          }}
        >
          <DownArrow />
        </button>
      </div>
      <div className={Styles.titleImg}>
        {discount && (
          <div className={Styles.percentage}>
            <PercentageBadge percent={discountPercent} />
          </div>
        )}
        <img src={activeImg} alt="" />
      </div>
    </div>
  );
};

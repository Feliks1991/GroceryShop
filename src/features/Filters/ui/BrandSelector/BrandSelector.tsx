import { useAppDispatch } from "@/app/store/reduxTypes";
import { selectBrands } from "@/features/Filters/model/filters.slice";
import { useEffect, useState } from "react";
import Styles from "./BrandSelector.module.scss";

type BrandSelectorProps = {
  brandsByCategory: string[];
};

export const BrandSelector = ({ brandsByCategory }: BrandSelectorProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const addBrandFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBrands((prev) => {
      if (!event.target.checked) {
        return prev.filter((brand) => brand !== event.target.name);
      } else {
        return [...prev, event.target.name];
      }
    });
  };

  useEffect(() => {
    const dispatchTimeout = setTimeout(() => {
      dispatch(selectBrands(selectedBrands));
    }, 700);

    return () => {
      clearTimeout(dispatchTimeout);
    };
  }, [selectedBrands, dispatch]);

  return (
    <div className={Styles.selectors}>
      {brandsByCategory.map((brand, index) => (
        <label htmlFor={index.toString()} key={index} className={Styles.label}>
          <input
            onChange={(event) => {
              addBrandFilter(event);
            }}
            type="checkbox"
            name={brand}
            id={index.toString()}
            className={Styles.input}
          />
          <p className={Styles.labelDescription}>{brand}</p>
        </label>
      ))}
    </div>
  );
};

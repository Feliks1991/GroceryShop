import { Slider } from "@base-ui-components/react/slider";
import Styles from "./RangeSlider.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store/reduxTypes";
import { selectPrice } from "@/features/Filters/model/filters.slice";

type RangeSliderProps = {
  allowedPriceRange: number[];
};

export const RangeSlider = ({ allowedPriceRange }: RangeSliderProps) => {
  const [sliderValues, setSliderValues] = useState<number[]>([0, 0]);
  const validationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Number.isFinite(allowedPriceRange[0]) && Number.isFinite(allowedPriceRange[1])) {
      setSliderValues(allowedPriceRange);
    }
  }, [allowedPriceRange, setSliderValues]);

  useEffect(() => {
    if (dispatchTimerRef.current) {
      clearTimeout(dispatchTimerRef.current);
    }
    dispatchTimerRef.current = setTimeout(() => {
      dispatch(selectPrice(sliderValues));
    }, 700);
  }, [sliderValues, dispatch]);

  const indexMap: Record<string, number> = {
    min: 0,
    max: 1,
  } as const;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (validationTimerRef.current) {
      clearTimeout(validationTimerRef.current);
    }
    const { value, name } = event.currentTarget;
    const numericValue = Number(value);
    if (!Number.isNaN(numericValue)) {
      const updatedValues = [...sliderValues];
      const index = indexMap[name];
      updatedValues[index] = numericValue;
      setSliderValues(updatedValues);
      validationTimerRef.current = setTimeout(() => {
        validation(numericValue, index);
      }, 1000);
    }
    return;
  };

  const toDefault = () => {
    setSliderValues(allowedPriceRange);
  };

  const validation = (value: number, index: number): void => {
    const minThumbRange = [Math.min(...allowedPriceRange), sliderValues[index + 1]];
    const maxThumbRange = [sliderValues[index - 1], Math.max(...allowedPriceRange)];

    const thumbsRanges: Record<number, number[]> = {
      0: minThumbRange,
      1: maxThumbRange,
    };

    const currentThumbRange = thumbsRanges[index];
    const updatedValues = [...sliderValues];
    if (value > Math.max(...currentThumbRange)) {
      updatedValues[index] = Math.max(...currentThumbRange);
    } else if (value < Math.min(...currentThumbRange)) {
      updatedValues[index] = Math.min(...currentThumbRange);
    }
    setSliderValues(updatedValues);
  };

  return (
    <div className={Styles.slider}>
      <div className={Styles.sliderHeader}>
        <p className={Styles.headerDescription}>Цена</p>
        <button className={Styles.defaultButton} onClick={toDefault}>
          Очистить
        </button>
      </div>
      <div className={Styles.inputWrapper}>
        <input
          name="min"
          value={sliderValues[0]}
          onChange={(event) => {
            inputHandler(event);
          }}
          className={Styles.handleChangeInput}
        />
        <span className={Styles.dash}></span>
        <input
          name="max"
          value={sliderValues[1]}
          onChange={(event) => {
            inputHandler(event);
          }}
          className={Styles.handleChangeInput}
        />
      </div>
      <Slider.Root
        value={sliderValues}
        onValueChange={(value) => {
          setSliderValues(value);
        }}
        min={Math.min(...allowedPriceRange)}
        max={Math.max(...allowedPriceRange)}
        className={Styles.root}
        step={0.1}
      >
        <Slider.Control className={Styles.control}>
          <Slider.Track className={Styles.track}>
            <Slider.Indicator className={Styles.indicator} />
            <Slider.Thumb className={Styles.thumb} />
            <Slider.Thumb className={Styles.thumb} />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};

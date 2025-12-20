import { useState } from "react";
import Styles from "./starsRating.module.scss";

type StarsRatingProps = {
  value: number;
  disabled?: true | false;
  onChange?: (value: number) => void;
};

type Stars = { ui: string; color: string; rating: number };

export const StarsRating = ({ value = 0, disabled = false, onChange }: StarsRatingProps) => {
  const initialStars = [
    { ui: "★", color: "rgb(191, 191, 191)", rating: 1 },
    { ui: "★", color: "rgb(191, 191, 191)", rating: 2 },
    { ui: "★", color: "rgb(191, 191, 191)", rating: 3 },
    { ui: "★", color: "rgb(191, 191, 191)", rating: 4 },
    { ui: "★", color: "rgb(191, 191, 191)", rating: 5 },
  ];

  const [stars, setStars] = useState<Stars[]>(initialStars);
  const [valueToggle, setValueToggle] = useState<boolean>(false);

  const selectedRating = (starIndex: number) => {
    if (!disabled) {
      const updatedStars = [...stars];
      updatedStars.map((item, index) => {
        if (starIndex >= index) {
          item.color = "rgba(255, 102, 51, 1)";
        } else {
          item.color = "rgb(191, 191, 191)";
        }
        setStars(updatedStars);
      });
    }
    return;
  };

  return (
    <div
      onMouseEnter={() => {
        if (!disabled) {
          setValueToggle(true);
        }
      }}
      onMouseLeave={() => {
        if (!disabled) {
          setValueToggle(false);
        }
      }}
      className={Styles.starsInit}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      {!valueToggle && (
        <div
          style={{ "--width": `${(value * 10 * 2).toString()}%` } as React.CSSProperties}
          className={Styles.starsValue}
        ></div>
      )}
      <div className={Styles.selectedStars}>
        {valueToggle &&
          stars.map((star, index) => (
            <span
              key={index}
              className={Styles.star}
              style={{ color: star.color }}
              onMouseEnter={() => {
                selectedRating(index);
              }}
              onMouseLeave={() => {
                setStars(initialStars);
              }}
              onClick={() => {
                if (onChange) {
                  onChange(index + 1);
                }
              }}
            >
              {star.ui}
            </span>
          ))}
      </div>
    </div>
  );
};

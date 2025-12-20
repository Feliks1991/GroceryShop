import Styles from "./DescriptionTable.module.scss";

type DescriptionTableProps = {
  brand: string;
  origin: string;
  value: number;
  unit: string;
  description: string;
};

export const DescriptionTable = ({
  brand,
  origin,
  value,
  unit,
  description,
}: DescriptionTableProps) => {
  return (
    <table className={Styles.descriptionTable}>
      <tbody>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableParametr}>Бренд:</td>
          <td className={Styles.tableValue}>{brand}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableParametr}>Страна производителя:</td>
          <td className={Styles.tableValue}>{origin}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableParametr}>Упаковка:</td>
          <td className={Styles.tableValue}>
            {value} {unit}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableParametr}>Описание:</td>
          <td className={Styles.tableValue}>{description}</td>
        </tr>
      </tbody>
    </table>
  );
};

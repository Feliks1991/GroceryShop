import Styles from "./PercentageBadge.module.scss";

type PercentageBageProps = {
  percent: number;
};

export const PercentageBadge = ({ percent }: PercentageBageProps) => {
  return (
    <div className={Styles.wrapper}>
      <p className={Styles.description}>{`-${percent.toString()} %`}</p>
    </div>
  );
};

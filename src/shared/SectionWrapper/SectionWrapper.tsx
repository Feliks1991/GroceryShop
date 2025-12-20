import { ReactNode } from "react";
import Styles from "./SectionWrapper.module.scss";
import RowRight from "./assets/RowRight.svg?react";
// import { Link } from "react-router";
import { FullScreenWrapper } from "../FullScreenWrapper/FullScreenWrapper";
import { Link } from "react-router";

type ProductSectionProps = {
  title: string;
  link?: string;
  linkName?: string;
  children?: ReactNode;
};

export const SectionWrapper = ({ title, link, linkName, children }: ProductSectionProps) => {
  return (
    <section className={Styles.sectionWrapper}>
      <FullScreenWrapper>
        <div className={Styles.sectionHeader}>
          <h2>{title}</h2>
          <div className={Styles.sectionLink}>
            {link ? (
              <Link to={link} className={Styles.link}>
                <span>{linkName}</span>
                <RowRight className={Styles.rightArow} />
              </Link>
            ) : null}
          </div>
        </div>
        {children}
      </FullScreenWrapper>
    </section>
  );
};

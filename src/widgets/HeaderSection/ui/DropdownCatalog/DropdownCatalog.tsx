import Styles from "./DropdownCatalog.module.scss";
import { catalogCardData } from "@/app/data/catalogCardData";
import { FullScreenWrapper } from "@/shared";
import { Link } from "react-router";

export const DropdownCatalog = () => {
  const catalogTitleData = catalogCardData.map((item) => {
    return { title: item.title, path: item.path };
  });

  const catalogTitleDataColoumns = [
    catalogTitleData.slice(0, 4),
    catalogTitleData.slice(4, 7),
    catalogTitleData.slice(7, 10),
    catalogTitleData.slice(10, 13),
  ];

  return (
    <FullScreenWrapper>
      <div className={Styles.dropdownContainer}>
        {catalogTitleDataColoumns.map((coloumn, index) => (
          <div key={index}>
            {coloumn.map((item, index) => (
              <Link to={item.path} className={Styles.dropdownLink} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </FullScreenWrapper>
  );
};

import { FullScreenWrapper } from "@/shared";
import Styles from "./Header.module.scss";
import Logo from "./assets/Logo.svg?react";
import { Link } from "react-router";
import { DropDown } from "../DropDown/DropDown";
import useDropDown from "../../hook/useDropDown";
import { DropdownCatalog } from "../DropdownCatalog/DropdownCatalog";
import UserPanel from "../UserPanel/UserPanel";
import CatalogButton from "../CatalogButton/CatalogButton";
import FindInput from "../FindInput/FindInput";
import ProductService from "../ProductService/ProductService";
import { useAppSelector } from "@/app/store/reduxTypes";
import { UserControlPanel } from "@/entities";

export const Header = () => {
  const {
    open: openCategoryPanel,
    close: closeCategoryPanel,
    closeCanceling: categoryPanelCanceling,
    visible: categoryPanelVisible,
  } = useDropDown();
  const {
    open: openUserControl,
    close: closeUserControl,
    closeCanceling: userControlCanceling,
    visible: userControlVisible,
  } = useDropDown();

  const { user } = useAppSelector((state) => state.auth);

  // const navigate = useNavigate();
  // const toCatalogPage = () => {
  //   void navigate("/catalog");
  // };
  // const toMainPage = () => {
  //   void navigate("/");
  // };

  return (
    <section className={Styles.headerSection}>
      <div className={Styles.header}>
        <FullScreenWrapper>
          <div className={Styles.headerElements}>
            <Link to={"/"}>
              <Logo />
            </Link>
            <div className={Styles.productsFind}>
              <CatalogButton open={openCategoryPanel} close={closeCategoryPanel} />
              <FindInput />
            </div>
            <div className={Styles.userPanel}>
              <ProductService />
              <UserPanel
                userName={user ? user.name : ""}
                open={openUserControl}
                close={closeUserControl}
                visible={userControlVisible}
              />
            </div>
          </div>
        </FullScreenWrapper>
      </div>
      <DropDown
        visible={categoryPanelVisible}
        close={closeCategoryPanel}
        closeCanceling={categoryPanelCanceling}
      >
        <DropdownCatalog />
      </DropDown>
      <div className={Styles.userDropDownWrapper}>
        <DropDown
          visible={userControlVisible}
          close={closeUserControl}
          closeCanceling={userControlCanceling}
        >
          <UserControlPanel />
        </DropDown>
      </div>
    </section>
  );
};

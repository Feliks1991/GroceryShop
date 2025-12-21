import { Link, useLocation } from "react-router";
import Cart from "./assets/Cart.svg?react";
import Favorites from "./assets/Favorites.svg?react";
import Orders from "./assets/Orders.svg?react";
import Styles from "./ProductService.module.scss";
import clsx from "clsx";

const ProductService = () => {
  const par = useLocation();
  const isCart = par.pathname.endsWith("cart");
  const isFavorite = par.pathname.endsWith("favorites");

  return (
    <div className={Styles.serviceContainer}>
      <Link to={"../catalog/favorites"} className={Styles.serviceElement}>
        <Favorites className={clsx(Styles.icon, isFavorite && Styles.orange)} />
        <p className={clsx(Styles.serviceName, isFavorite && Styles.orange)}>Избранное</p>
      </Link>
      <button className={Styles.serviceElement}>
        <Orders className={Styles.icon} />
        <p className={Styles.serviceName}>Заказы</p>
      </button>
      <Link to={"../cart"} className={Styles.serviceElement}>
        <Cart className={clsx(Styles.icon, isCart && Styles.orange)} />
        <p className={clsx(Styles.serviceName, isCart && Styles.orange)}>Корзина</p>
      </Link>
    </div>
  );
};

export default ProductService;

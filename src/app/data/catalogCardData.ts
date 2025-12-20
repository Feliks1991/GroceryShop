import BabiesFood from "./assets/BabiesFood.png";
import Bread from "./assets/Bread.png";
import Confectionery from "./assets/Confectionery.png";
import Dairy from "./assets/Dairy.png";
import Drinks from "./assets/Drinks.png";
import FrozenGoods from "./assets/FrozenGoods.png";
import Groceries from "./assets/Groceries.png";
import HealthFood from "./assets/HealthFood.png";
import Meat from "./assets/Meat.png";
import NonFoodGoods from "./assets/NonFoodGoods.png";
import TeaCofee from "./assets/TeaCofee.png";
import Vegetables from "./assets/Vegetables.png";
import ZooGoods from "./assets/ZooGoods.png";

type CardSize = "S" | "L";

export type CatalogCardProps = {
  title: string;
  img: string;
  size: CardSize;
  path: string;
};

export const catalogCardData: CatalogCardProps[] = [
  { title: "Молоко, сыр, яйцо", img: Dairy, size: "L", path: "/catalog/dairy" },
  { title: "Хлеб", img: Bread, size: "S", path: "/catalog/bread" },
  { title: "Фрукты и овощи", img: Vegetables, size: "S", path: "/catalog/vegetables" },
  { title: "Замороженные продукты", img: FrozenGoods, size: "S", path: "/catalog/frozengoods" },
  { title: "Напитки", img: Drinks, size: "S", path: "/catalog/drinks" },
  { title: "Кондитерские изделия", img: Confectionery, size: "S", path: "/catalog/confectionery" },
  { title: "Чай, кофе", img: TeaCofee, size: "S", path: "/catalog/teacofee" },
  { title: "Бакалея", img: Groceries, size: "S", path: "/catalog/groceries" },
  { title: "Здоровое питание", img: HealthFood, size: "S", path: "/catalog/healthfood" },
  { title: "Зоотовары", img: ZooGoods, size: "L", path: "/catalog/zoogoods" },
  { title: "Детское питание", img: BabiesFood, size: "S", path: "/catalog/babiesfood" },
  { title: "Мясо, птица, колбаса", img: Meat, size: "L", path: "/catalog/meat" },
  {
    title: "Непродовольственные товары",
    img: NonFoodGoods,
    size: "S",
    path: "/catalog/nonfoodgoods",
  },
];

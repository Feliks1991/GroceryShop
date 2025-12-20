type Product = {
  SKU: string;
  category: string;
  promo: {
    discount: boolean;
    percentage: number;
  };
  rating: {
    average: number;
    ratingLength: number;
    rating5Length: number;
    rating4Length: number;
    rating3Length: number;
    rating2Length: number;
    rating1Length: number;
  };
  TitleImg: string;
  imgs: string[];
  name: string;
  price: {
    regular: number;
    discountCard: number;
  };
  brand: string;
  origin: string;
  packing: {
    value: number;
    unit: string;
  };
  description: string;
  comments: {
    id: string;
    user: { name: string; id: string };
    date: string;
    comment: string;
    rating: number;
  }[];
};

export default Product;

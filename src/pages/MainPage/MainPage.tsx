import { PromoSlider } from "@/features";
import { SectionWrapper } from "@/shared";
import { OurShops, ProductCards } from "@/widgets";

export const MainPage = () => {
  return (
    <>
      <PromoSlider />
      <SectionWrapper title={"Акции"} linkName={"Все акции"} link={"../catalog/promotions"}>
        <ProductCards category={"promotions"} size={4} />
      </SectionWrapper>
      <SectionWrapper title={"Новинки"} linkName={"Все новинки(test)"} link={"../catalog/test"}>
        <ProductCards category={"babiesfood"} size={4} />
      </SectionWrapper>
      <SectionWrapper title={"Покупали ранее"} linkName={"Все покупки"} link={"/"}>
        <ProductCards category={"zoogoods"} size={4} />
      </SectionWrapper>
      <SectionWrapper title={"Наши магазины"}>
        <OurShops />
      </SectionWrapper>
    </>
  );
};

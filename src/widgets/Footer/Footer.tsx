import RoundLogo from "./assets/RoundLogo.svg?react";
import Instagram from "./assets/Instagram.svg?react";
import VK from "./assets/VK.svg?react";
import FB from "./assets/FB.svg?react";
import OK from "./assets/OK.svg?react";
import Tel from "./assets/Tel.svg?react";
import Zasovskiy from "./assets/Zasovskiy.svg?react";
import Styles from "./Footer.module.scss";
import { FullScreenWrapper } from "@/shared";

export const Footer = () => {
  return (
    <section className={Styles.footer}>
      <FullScreenWrapper>
        <div className={Styles.linksBlock}>
          <div className={Styles.siteLinks}>
            <a href="">
              <RoundLogo />
            </a>
            <a href="">О компании</a>
            <a href="">Контакты</a>
            <a href="">Вакансии</a>
            <a href="">Статьи</a>
            <a href="">Политика обработки персональных данных</a>
          </div>
          <div className={Styles.externalLinks}>
            <div className={Styles.socialLinks}>
              <a href="">
                <Instagram />
              </a>
              <a href="">
                <VK />
              </a>
              <a href="">
                <FB />
              </a>
              <a href="">
                <OK />
              </a>
            </div>
            <a className={Styles.tel} href="tel:88007773333">
              <Tel />
              <span>8 800 777 33 33</span>
            </a>
          </div>
        </div>
        <a className={Styles.author} href="">
          <p>Дизайн</p>
          <Zasovskiy />
        </a>
      </FullScreenWrapper>
    </section>
  );
};

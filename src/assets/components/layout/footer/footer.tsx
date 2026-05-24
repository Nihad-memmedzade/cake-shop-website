import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/assets/images/icons";
import Logo from "@/assets/images/logo/cake-logo.png";
import { getLocalizedPath } from "@/helpers/languagePath";

import style from "./footer.module.scss";

type FooterLink = {
  labelKey: string;
  path: string;
};

type FooterSection = {
  titleKey: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    titleKey: "common.footer.sections.pages.title",
    links: [
      { labelKey: "common.footer.sections.pages.home", path: "/" },
      { labelKey: "common.footer.sections.pages.shop", path: "/products" },
      { labelKey: "common.footer.sections.pages.contact", path: "/contact" },
    ],
  },
  {
    titleKey: "common.footer.sections.shop.title",
    links: [
      { labelKey: "common.footer.sections.shop.allCakes", path: "/products" },
      {
        labelKey: "common.footer.sections.shop.classicCakes",
        path: "/products?category=Classic%20Cake",
      },
      {
        labelKey: "common.footer.sections.shop.fruitCakes",
        path: "/products?category=Fruit%20Cake",
      },
      {
        labelKey: "common.footer.sections.shop.birthdayCakes",
        path: "/products?category=Birthday%20Cake",
      },
      {
        labelKey: "common.footer.sections.shop.premiumCakes",
        path: "/products?category=Premium%20Cake",
      },
    ],
  },
  {
    titleKey: "common.footer.sections.account.title",
    links: [
      { labelKey: "common.footer.sections.account.login", path: "/auth/login" },
      {
        labelKey: "common.footer.sections.account.register",
        path: "/auth/register",
      },
      {
        labelKey: "common.footer.sections.account.myAccount",
        path: "/account/details",
      },
      {
        labelKey: "common.footer.sections.account.wishlist",
        path: "/account/wishlist",
      },
      {
        labelKey: "common.footer.sections.account.orders",
        path: "/account/orders",
      },
      { labelKey: "common.footer.sections.account.cart", path: "/cart" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: TwitterIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/12463450695",
    icon: WhatsappIcon,
  },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={style.footer}>
      <div className={style.footerMain}>
        <div className={style.brandColumn}>
          <Link
            to={getLocalizedPath("/")}
            className={style.logo}
            aria-label="Cake House home"
          >
            <img src={Logo} alt="Cake House" />
          </Link>

          <p className={style.description}>{t("common.footer.description")}</p>

          <div className={style.contactInfo}>
            <a href="mailto:hello@cakehouse.com">hello@cakehouse.com</a>
            <a href="tel:+12463450695">+1 246-345-0695</a>
          </div>

          <div className={style.address}>{t("common.footer.address")}</div>
        </div>

        <div className={style.rightColumn}>
          <div className={style.linksColumn}>
            {footerSections.map((section) => (
              <div className={style.footerSection} key={section.titleKey}>
                <h3 className={style.title}>{t(section.titleKey)}</h3>

                <ul className={style.list}>
                  {section.links.map((item) => (
                    <li key={item.labelKey}>
                      <Link
                        className={style.link}
                        to={getLocalizedPath(item.path)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={style.socialMedia}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <img src={item.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

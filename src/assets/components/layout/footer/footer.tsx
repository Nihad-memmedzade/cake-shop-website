import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/assets/images/icons";
import Logo from "@/assets/images/logo/cake-logo.png";
import style from "./footer.module.scss";

type FooterLink = {
  label: string;
  path: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Blog", path: "/blog" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "All Cakes", path: "/products" },
      { label: "Birthday Cakes", path: "/products?category=Birthday%20Cake" },
      { label: "Fruit Cakes", path: "/products?category=Fruit%20Cake" },
      { label: "Premium Cakes", path: "/products?category=Premium%20Cake" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Service", path: "/contact" },
      { label: "Delivery Info", path: "/delivery" },
      { label: "Refund Policy", path: "/refund-policy" },
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
  return (
    <footer className={style.footer}>
      <div className={style.footerMain}>
        <div className={style.brandColumn}>
          <Link to="/" className={style.logo} aria-label="Cake House home">
            <img src={Logo} alt="Cake House" />
          </Link>

          <p className={style.description}>
            Fresh handmade cakes, sweet celebrations and custom flavors baked
            with care for every special moment.
          </p>

          <div className={style.contactInfo}>
            <a href="mailto:hello@cakehouse.com">hello@cakehouse.com</a>
            <a href="tel:+12463450695">+1 246-345-0695</a>
          </div>

          <div className={style.address}>
            1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
          </div>
        </div>

        <div className={style.rightColumn}>
          <div className={style.linksColumn}>
            {footerSections.map((section) => (
              <div className={style.footerSection} key={section.title}>
                <h3 className={style.title}>{section.title}</h3>

                <ul className={style.list}>
                  {section.links.map((item) => (
                    <li key={item.label}>
                      <Link className={style.link} to={item.path}>
                        {item.label}
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

      <div className={style.bottomBar}>
        <p>{"\u00A9"} {new Date().getFullYear()} Cake House. All rights reserved.</p>

        <div className={style.bottomLinks}>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

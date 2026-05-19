import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import style from "./backToTop.module.scss";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`${style.backToTop} ${isVisible ? style.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
<ArrowUp size={22} strokeWidth={2.5} />
    </button>
  );
}

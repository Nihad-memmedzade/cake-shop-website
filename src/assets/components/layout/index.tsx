import Footer from "./footer/footer";
import Header from "./header/Header";
import BackToTop from "./backToTop/backToTop";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}

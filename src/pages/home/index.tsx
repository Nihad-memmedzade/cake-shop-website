import Layout from "@/assets/components/layout";
import MainSlider from "./sections/mainSlider";
import TrendyProducts from "./sections/trendyProducts";
import Category from "./sections/category";
import LimitedEdition from "./sections/limitedEdition";
import SpringCollection from "./sections/springCollection";

function Home() {
  return (
    <Layout>
      <MainSlider />
      <Category />
      <TrendyProducts />
      <SpringCollection />
      <LimitedEdition />
    </Layout>
  );
}
export default Home;

import Layout from "@/assets/components/layout";
import ProductCard from "@/assets/components/productCard/productCard";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  fetchSearchProducts,
} from "@/store/productSlice";
import type { ShopFilterParams } from "@/types/shop";
import EmptyState from "./sections/EmptyState";
import FilterDrawer from "./sections/FilterDrawer";
import FilterSidebar from "./sections/FilterSidebar";
import ShopHero from "./sections/ShopHero";
import ShopPagination from "./sections/ShopPagination";
import ShopToolbar from "./sections/ShopToolbar";
import style from "./shop.module.scss";

const PRODUCTS_PER_PAGE = 6;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  const query = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedFlavors = useMemo(
    () => searchParams.getAll("flavors"),
    [searchParams]
  );
  const selectedTags = useMemo(() => searchParams.getAll("tags"), [searchParams]);
  const selectedSizes = useMemo(
    () => searchParams.getAll("sizes"),
    [searchParams]
  );
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "default";

  const pageParam = Number(searchParams.get("page") || "1");
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return items.slice(startIndex, endIndex);
  }, [items, currentPage]);

  const activeFilterCount =
    Number(Boolean(selectedCategory)) +
    selectedFlavors.length +
    selectedTags.length +
    selectedSizes.length +
    Number(Boolean(minPrice)) +
    Number(Boolean(maxPrice));

  const selectedFlavorsKey = selectedFlavors.join(",");
  const selectedTagsKey = selectedTags.join(",");
  const selectedSizesKey = selectedSizes.join(",");

  const filterContentProps = {
    selectedCategory,
    selectedFlavors,
    selectedTags,
    selectedSizes,
    minPrice,
    maxPrice,
    onCategoryChange: handleCategoryChange,
    onFlavorChange: handleFlavorChange,
    onTagChange: handleTagChange,
    onSizeChange: handleSizeChange,
    onMinPriceChange: handleMinPriceChange,
    onMaxPriceChange: handleMaxPriceChange,
  };

  function updateUrlParams(filters: ShopFilterParams) {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (filters.category) params.set("category", filters.category);

    filters.flavors?.forEach((flavor) => params.append("flavors", flavor));
    filters.tags?.forEach((tag) => params.append("tags", tag));
    filters.sizes?.forEach((size) => params.append("sizes", size));

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    if (filters.sort && filters.sort !== "default") {
      params.set("sort", filters.sort);
    }

    params.delete("page");
    setSearchParams(params);
  }

  function handleCategoryChange(category: string) {
    updateUrlParams({
      category: selectedCategory === category ? "" : category,
      flavors: selectedFlavors,
      tags: selectedTags,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
      sort,
    });
  }

  function handleFlavorChange(flavor: string) {
    const updatedFlavors = selectedFlavors.includes(flavor)
      ? selectedFlavors.filter((item) => item !== flavor)
      : [...selectedFlavors, flavor];

    updateUrlParams({
      category: selectedCategory,
      flavors: updatedFlavors,
      tags: selectedTags,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
      sort,
    });
  }

  function handleTagChange(tag: string) {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavors,
      tags: updatedTags,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
      sort,
    });
  }

  function handleSizeChange(size: string) {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((item) => item !== size)
      : [...selectedSizes, size];

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavors,
      tags: selectedTags,
      sizes: updatedSizes,
      minPrice,
      maxPrice,
      sort,
    });
  }

  function handleMinPriceChange(value: string) {
    if (maxPrice && Number(value) > Number(maxPrice)) return;

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavors,
      tags: selectedTags,
      sizes: selectedSizes,
      minPrice: value,
      maxPrice,
      sort,
    });
  }

  function handleMaxPriceChange(value: string) {
    if (minPrice && Number(value) < Number(minPrice)) return;

    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavors,
      tags: selectedTags,
      sizes: selectedSizes,
      minPrice,
      maxPrice: value,
      sort,
    });
  }

  function handleSortChange(value: string) {
    updateUrlParams({
      category: selectedCategory,
      flavors: selectedFlavors,
      tags: selectedTags,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
      sort: value,
    });
  }

  function handleClearFilters() {
    const params = new URLSearchParams();

    if (query) params.set("q", query);

    setSearchParams(params);
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const hasFilters =
      selectedCategory ||
      selectedFlavors.length > 0 ||
      selectedTags.length > 0 ||
      selectedSizes.length > 0 ||
      minPrice ||
      maxPrice ||
      (sort && sort !== "default");

    if (query && !hasFilters) {
      dispatch(fetchSearchProducts(query));
      return;
    }

    if (hasFilters) {
      dispatch(
        fetchFilteredProducts({
          category: selectedCategory || undefined,
          flavors: selectedFlavors,
          tags: selectedTags,
          sizes: selectedSizes,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          sort: sort === "default" ? undefined : sort,
        })
      );
      return;
    }

    dispatch(fetchAllProducts());
  }, [
    query,
    selectedCategory,
    selectedFlavorsKey,
    selectedTagsKey,
    selectedSizesKey,
    minPrice,
    maxPrice,
    sort,
    dispatch,
  ]);

  useEffect(() => {
    if (!loading && currentPage > totalPages) {
      handlePageChange(totalPages);
    }
  }, [loading, currentPage, totalPages]);

  return (
    <Layout>
      <main className={style.page}>
        <ShopHero />

        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onClearFilters={handleClearFilters}
          {...filterContentProps}
        />

        <div className={style.container}>
          <FilterSidebar
            onClearFilters={handleClearFilters}
            {...filterContentProps}
          />

          <section className={style.content}>
            <ShopToolbar
              sort={sort}
              itemsCount={items.length}
              loading={loading}
              activeFilterCount={activeFilterCount}
              onSortChange={handleSortChange}
              onOpenFilter={() => setIsFilterOpen(true)}
            />

            {error && <p className={style.errorText}>{error}</p>}

            {!loading && !error && items.length === 0 && <EmptyState />}

            <div className={style.grid3}>
              {paginatedItems.map((item) => (
                <ProductCard key={item.id} card={item} />
              ))}
            </div>

            {items.length > PRODUCTS_PER_PAGE && (
              <ShopPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}

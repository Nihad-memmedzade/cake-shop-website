import {
  createProductReview,
  getRelatedProducts,
  getBestSellerProducts,
  getFilteredProducts,
  getLimitedEditionProducts,
  getNewArrivalProducts,
  getProductById,
  getProductReviews,
  getProducts,
  getSearchProducts,
  getTopRatedProducts,
} from "@/api/product";

import type { CreateProductReviewPayload, ProductReview } from "@/types/review";
import type { Product } from "@/types/product";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductState {
  items: Product[];
  limitedEditionItems: Product[];
  selectedProductById: Product | null;

  reviews: ProductReview[];

  loading: boolean;
  limitedEditionLoading: boolean;
  reviewsLoading: boolean;
  reviewSubmitLoading: boolean;

  error: string | null;
  reviewsError: string | null;
  reviewSubmitError: string | null;
  reviewSubmitSuccess: boolean;

  relatedProducts: Product[];
  relatedProductsLoading: boolean;
  relatedProductsError: string | null;
}

const initialState: ProductState = {
  items: [],
  limitedEditionItems: [],
  selectedProductById: null,

  reviews: [],

  loading: false,
  limitedEditionLoading: false,
  reviewsLoading: false,
  reviewSubmitLoading: false,

  error: null,
  reviewsError: null,
  reviewSubmitError: null,
  reviewSubmitSuccess: false,

  relatedProducts: [],
  relatedProductsLoading: false,
  relatedProductsError: null,
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const data = await getProducts();
    return data;
  },
);

export const fetchNewArrivalsProduct = createAsyncThunk(
  "products/fetchNewArrivalsProduct",
  async () => {
    const data = await getNewArrivalProducts();
    return data;
  },
);

export const fetchTopRatedProducts = createAsyncThunk(
  "products/fetchTopRatedProducts",
  async () => {
    const data = await getTopRatedProducts();
    return data;
  },
);

export const fetchBestSellerProducts = createAsyncThunk(
  "products/fetchBestSellerProducts",
  async () => {
    const data = await getBestSellerProducts();
    return data;
  },
);

export const fetchLimitedEditionProducts = createAsyncThunk(
  "products/fetchLimitedEditionProducts",
  async () => {
    const data = await getLimitedEditionProducts();
    return data;
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const data = await getProductById(id);
    return data;
  },
);

export const fetchSearchProducts = createAsyncThunk(
  "products/fetchSearchProducts",
  async (searchText: string) => {
    const data = await getSearchProducts(searchText);
    return data;
  },
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filters: {
    category?: string;
    flavors?: string[];
    tags?: string[];
    sizes?: string[];
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }) => {
    const data = await getFilteredProducts(filters);
    return data;
  },
);

export const fetchProductReviews = createAsyncThunk(
  "products/fetchProductReviews",
  async (productId: number) => {
    const data = await getProductReviews(productId);
    return data;
  },
);

export const submitProductReview = createAsyncThunk(
  "products/submitProductReview",
  async ({
    productId,
    payload,
  }: {
    productId: number;
    payload: CreateProductReviewPayload;
  }) => {
    const data = await createProductReview(productId, payload);
    return data;
  },
);

const updateProductRating = (
  product: Product | null,
  productId: number,
  reviews: ProductReview[],
) => {
  if (!product || product.id !== productId || reviews.length === 0) return;

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  product.rating = Number(averageRating.toFixed(1));
};

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ productId, limit = 8 }: { productId: number; limit?: number }) => {
    const data = await getRelatedProducts(productId, limit);
    return data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProductById = null;
      state.reviews = [];
      state.reviewsError = null;
      state.reviewSubmitError = null;
      state.reviewSubmitSuccess = false;
    },

    clearProductReviews: (state) => {
      state.reviews = [];
      state.reviewsError = null;
    },

    clearReviewSubmitState: (state) => {
      state.reviewSubmitError = null;
      state.reviewSubmitSuccess = false;
    },

    clearRelatedProducts: (state) => {
      state.relatedProducts = [];
      state.relatedProductsError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchNewArrivalsProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivalsProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchNewArrivalsProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchTopRatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTopRatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBestSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProductById = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchSearchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchLimitedEditionProducts.pending, (state) => {
        state.limitedEditionLoading = true;
        state.error = null;
      })
      .addCase(fetchLimitedEditionProducts.fulfilled, (state, action) => {
        state.limitedEditionLoading = false;
        state.limitedEditionItems = action.payload;
        state.error = null;
      })
      .addCase(fetchLimitedEditionProducts.rejected, (state, action) => {
        state.limitedEditionLoading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchProductReviews.pending, (state) => {
        state.reviewsLoading = true;
        state.reviewsError = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        state.reviews = action.payload;
        state.reviewsError = null;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.reviewsLoading = false;
        state.reviewsError = action.error.message || "Error";
      })

      .addCase(submitProductReview.pending, (state) => {
        state.reviewSubmitLoading = true;
        state.reviewSubmitError = null;
        state.reviewSubmitSuccess = false;
      })
      .addCase(submitProductReview.fulfilled, (state, action) => {
        state.reviewSubmitLoading = false;
        state.reviewSubmitError = null;
        state.reviewSubmitSuccess = true;

        const updatedReviews = [action.payload, ...state.reviews];
        state.reviews = updatedReviews;

        updateProductRating(
          state.selectedProductById,
          action.payload.productId,
          updatedReviews,
        );

        state.items = state.items.map((item) => {
          if (item.id !== action.payload.productId) return item;

          const averageRating =
            updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
            updatedReviews.length;

          return {
            ...item,
            rating: Number(averageRating.toFixed(1)),
          };
        });
      })
      .addCase(submitProductReview.rejected, (state, action) => {
        state.reviewSubmitLoading = false;
        state.reviewSubmitError = action.error.message || "Error";
        state.reviewSubmitSuccess = false;
      })

      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedProductsLoading = true;
        state.relatedProductsError = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProductsLoading = false;
        state.relatedProducts = action.payload;
        state.relatedProductsError = null;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.relatedProductsLoading = false;
        state.relatedProductsError = action.error.message || "Error";
      });
  },
});

export const {
  clearProductReviews,
  clearRelatedProducts,
  clearReviewSubmitState,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;

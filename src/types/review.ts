export type ProductReview = {
  id: number;
  productId: number;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type CreateProductReviewPayload = {
  name: string;
  email: string;
  rating: number;
  text: string;
};

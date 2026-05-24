import { useEffect, useState, type FormEvent } from "react";
import { Star } from "lucide-react";

import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  clearReviewSubmitState,
  fetchProductReviews,
  submitProductReview,
} from "@/store/productSlice";

import styles from "./reviews.module.scss";

type ProductReviewsProps = {
  productId: number;
  productTitle: string;
};

export default function ProductReviews({
  productId,
  productTitle,
}: ProductReviewsProps) {
  const dispatch = useAppDispatch();

  const {
    reviews,
    reviewsLoading,
    reviewsError,
    reviewSubmitLoading,
    reviewSubmitError,
    reviewSubmitSuccess,
  } = useAppSelector((state: RootState) => state.products);

  const [rating, setRating] = useState(0);
  const [showRatingError, setShowRatingError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(fetchProductReviews(productId));

    return () => {
      dispatch(clearReviewSubmitState());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (reviewSubmitSuccess) {
      setName("");
      setEmail("");
      setText("");
      setRating(0);
      setShowRatingError(false);
      setFormError("");
    }
  }, [reviewSubmitSuccess]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (!rating) {
      setShowRatingError(true);
      setFormError("");
      return;
    }

    if (trimmedName.length < 2) {
      setShowRatingError(false);
      setFormError("Name must be at least 2 characters.");
      return;
    }

    if (trimmedText.length < 5) {
      setShowRatingError(false);
      setFormError("Review must be at least 5 characters.");
      return;
    }

    setShowRatingError(false);
    setFormError("");

    dispatch(
      submitProductReview({
        productId,
        payload: {
          name: trimmedName,
          email: trimmedEmail,
          rating,
          text: trimmedText,
        },
      }),
    );
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${styles.activeTab}`}>
          Reviews ({reviews.length})
        </button>
      </div>

      <div className={styles.reviewsBlock}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>Customer notes</p>
          <h2 className={styles.heading}>Reviews</h2>
        </div>

        <div className={styles.reviewList}>
          {reviewsLoading && (
            <p className={styles.formNote}>Loading reviews...</p>
          )}

          {reviewsError && <p className={styles.formNote}>{reviewsError}</p>}

          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <p className={styles.formNote}>
              No reviews yet. Be the first to review this cake.
            </p>
          )}

          {!reviewsLoading &&
            reviews.map((review) => (
              <article key={review.id} className={styles.reviewItem}>
                <div className={styles.avatar}>
                  {review.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className={styles.reviewContent}>
                  <div className={styles.reviewTop}>
                    <div>
                      <h4 className={styles.reviewerName}>{review.name}</h4>
                      <p className={styles.reviewDate}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className={styles.stars}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill={index < review.rating ? "#c59b5f" : "none"}
                          stroke="#c59b5f"
                        />
                      ))}
                    </div>
                  </div>

                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              </article>
            ))}
        </div>

        <div className={styles.formBlock}>
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Share your opinion</p>
            <h3 className={styles.formTitle}>Review {productTitle}</h3>
          </div>

          <p className={styles.formNote}>
            Your email address will not be published.
          </p>

          {showRatingError && (
            <p className={styles.formNote}>Please select a rating.</p>
          )}

          {formError && <p className={styles.formNote}>{formError}</p>}

          {reviewSubmitError && (
            <p className={styles.formNote}>{reviewSubmitError}</p>
          )}

          {reviewSubmitSuccess && (
            <p className={styles.formNote}>
              Your review was submitted successfully.
            </p>
          )}

          <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <div className={styles.ratingInputRow}>
              <span className={styles.ratingLabel}>Your rating</span>

              <div className={styles.interactiveStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.ratingStar} ${
                      star <= rating ? styles.activeRatingStar : ""
                    }`}
                    onClick={() => {
                      setRating(star);
                      setShowRatingError(false);
                      setFormError("");
                    }}
                    aria-label={`Rate ${star} star`}
                  >
                    <Star size={20} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className={styles.textarea}
              placeholder="Your review"
              rows={7}
              value={text}
              minLength={5}
              maxLength={1000}
              onChange={(event) => {
                setText(event.target.value);

                if (formError) {
                  setFormError("");
                }
              }}
              required
            />

            <div className={styles.inputGrid}>
              <input
                type="text"
                className={styles.input}
                placeholder="Name *"
                value={name}
                minLength={2}
                maxLength={80}
                onChange={(event) => {
                  setName(event.target.value);

                  if (formError) {
                    setFormError("");
                  }
                }}
                required
              />

              <input
                type="email"
                className={styles.input}
                placeholder="Email address *"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={reviewSubmitLoading}
            >
              {reviewSubmitLoading ? "Submitting..." : "Submit review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
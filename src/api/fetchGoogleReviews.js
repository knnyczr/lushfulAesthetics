/**
 * Fetch the latest Google reviews from our API endpoint
 * @returns {Promise<Array>} Array of Google reviews
 */
export const fetchLatestGoogleReviews = async () => {
  try {
    // In production, this would be your actual API endpoint
    // For now, using the existing API structure you have
    const response = await fetch("/api/google-reviews");

    if (!response.ok) {
      console.warn("Failed to fetch latest Google reviews:", response.status);
      return [];
    }

    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.warn("Error fetching latest Google reviews:", error);
    return [];
  }
};

/**
 * Merge hardcoded reviews with latest Google reviews
 * @param {Array} hardcodedReviews - Reviews from JSON file
 * @param {Array} googleReviews - Latest reviews from Google API
 * @returns {Array} Merged and deduplicated reviews array
 */
export const mergeReviews = (hardcodedReviews, googleReviews) => {
  // Add a source flag to hardcoded reviews
  const hardcodedWithSource = hardcodedReviews.map((review) => ({
    ...review,
    source: "hardcoded",
  }));

  const googleWithSource = googleReviews.map((review) => ({
    ...review,
    source: "google",
  }));

  // Remove any duplicates from Google reviews
  const uniqueGoogleReviews = googleWithSource.filter(
    (review, index, self) =>
      index ===
      self.findIndex(
        (r) => r.author_name === review.author_name && r.text === review.text
      )
  );

  // Remove any duplicates from hardcoded reviews
  const uniqueHardcodedReviews = hardcodedWithSource.filter(
    (review, index, self) =>
      index ===
      self.findIndex(
        (r) => r.author_name === review.author_name && r.text === review.text
      )
  );

  // Return Google API reviews first, then hardcoded reviews
  return [...uniqueGoogleReviews, ...uniqueHardcodedReviews];
};

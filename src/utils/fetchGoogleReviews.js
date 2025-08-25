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
 * Generate random timestamps for hardcoded reviews (spread over last 2 years)
 * @param {number} count - Number of timestamps to generate
 * @returns {Array} Array of Unix timestamps
 */
const generateRandomTimestamps = (count) => {
  const now = Date.now();
  const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000; // 2 years ago in milliseconds

  return Array.from({ length: count }, () => {
    const randomTime = twoYearsAgo + Math.random() * (now - twoYearsAgo);
    return Math.floor(randomTime / 1000); // Convert to Unix timestamp (seconds)
  }).sort((a, b) => b - a); // Sort newest first
};

/**
 * Format timestamp to display month and year
 * @param {number|string} timestamp - Unix timestamp in seconds or date string (e.g., "Jun 2024")
 * @returns {string} Formatted date string (e.g., "Dec 2023")
 */
export const formatReviewDate = (timestamp) => {
  if (!timestamp) return "";

  // If timestamp is already a string in the desired format, return it
  if (typeof timestamp === "string") {
    return timestamp;
  }

  // If timestamp is a number, convert from Unix timestamp
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  const options = { month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Merge hardcoded reviews with latest Google reviews
 * @param {Array} hardcodedReviews - Reviews from JSON file
 * @param {Array} googleReviews - Latest reviews from Google API
 * @returns {Array} Merged and sorted reviews array
 */
export const mergeReviews = (hardcodedReviews, googleReviews) => {
  // Generate timestamps for hardcoded reviews if they don't have them
  const timestamps = generateRandomTimestamps(hardcodedReviews.length);

  // Add a source flag and timestamps to hardcoded reviews
  const hardcodedWithSource = hardcodedReviews.map((review, index) => ({
    ...review,
    source: "hardcoded",
    time: review.time || timestamps[index], // Use existing timestamp or generate one
  }));

  const googleWithSource = googleReviews.map((review) => ({
    ...review,
    source: "google",
    // Ensure Google reviews have timestamps - if not, use current time minus a small offset
    time:
      review.time ||
      Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400), // Random time within last 24 hours if no timestamp
  }));

  // Remove any duplicates from Google reviews first
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

  // Sort hardcoded reviews by timestamp (newest first)
  const sortedHardcodedReviews = uniqueHardcodedReviews.sort((a, b) => {
    const timeA = a.time || 0;
    const timeB = b.time || 0;
    return timeB - timeA;
  });

  // Always put Google API reviews first, then hardcoded reviews
  return [...uniqueGoogleReviews, ...sortedHardcodedReviews];
};

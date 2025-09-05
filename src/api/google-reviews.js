// Using native fetch (available in Node.js 18+)

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { GOOGLE_MAPS_API_KEY, GOOGLE_PLACE_ID } = process.env;

    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) {
      console.error("Missing credentials:", {
        hasKey: !!GOOGLE_MAPS_API_KEY,
        hasPlaceId: !!GOOGLE_PLACE_ID,
      });
      return res.status(500).json({ error: "Missing Google API credentials" });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${GOOGLE_MAPS_API_KEY}`;
    console.log("Fetching from URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("Google API error:", data);
      return res.status(response.status).json({
        error: "Error fetching reviews from Google API",
        details: data,
      });
    }

    if (!data.result || !data.result.reviews) {
      console.error("No reviews in response:", data);
      return res.status(404).json({ error: "No reviews found" });
    }

    // Format the reviews
    const reviews = data.result.reviews.map((review) => ({
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relative_time_description: review.relative_time_description,
      time: review.time, // Unix timestamp
    }));

    return res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Error fetching reviews",
      details: error.message,
    });
  }
}

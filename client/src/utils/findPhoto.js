import { createClient } from "pexels";

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

const findPhoto = async (query) => {
  try {
    const photos = await client.photos.search({ query, per_page: 1 });

    return photos.photos[0].src.original;
  } catch (error) {
    console.error("Error fetching photo from Pexels:", error);
    throw error;
  }
};

export default findPhoto;

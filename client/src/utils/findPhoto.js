// import { createClient } from "pexels";

// const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

const findPhoto = async (query) => {
  // try {
  // const photos = await client.photos.search({ query, per_page: 1 });

  // return photos.photos[0].src.original;

  return "https://t4.ftcdn.net/jpg/04/39/89/01/360_F_439890152_sYbPxa1ANTSKcZuUsKzRAf9O7bJ1Tx5B.jpg";
  // } catch (error) {
  // console.error("Error fetching photo from Pexels:", error);
  // throw error;
  // }
};

export default findPhoto;

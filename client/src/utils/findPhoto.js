import unsplashInstance from "../api/unsplashInstance";

const findPhoto = async (query) => {
  try {
    const response = await unsplashInstance.get("/search/photos", {
      params: {
        query,
        page: 1,
        per_page: 10,
      },
    });

    const image = response.data?.results[0]?.urls.small_s3;

    console.log("Found image URL:", image);

    return image;
  } catch (error) {
    console.error("Error fetching photo from Unsplash:", error);
    throw error;
  }
};

export default findPhoto;

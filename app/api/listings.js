import client from "./client";

const endpoint = "/posts";

const getListings = () => client.get(endpoint);

export const addListing = (listing, onUploadProgress) => {
  // const data = new FormData();
  // data.append("dataType", listing.dataType);
  // data.append("mimeType", listing.mimeType);
  // data.append("hint", listing.hint);
  // data.append("category", listing.category);
  // data.append("lat", listing.lat);
  // data.append("long", listing.long);

  // data.append("title", listing.title);
  // data.append("scripture", listing.scripture);
  // data.append("categoryId", listing.category.value);
  // data.append("description", listing.description);

  // listing.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  // if (listing.location)
  //   data.append("location", JSON.stringify(listing.location));

  //Parent > Child

  return client.post("post", listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// content-type
// application/json
// multipart/form-data

export default {
  addListing,
  getListings,
};

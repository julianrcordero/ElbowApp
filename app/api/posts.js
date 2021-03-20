import client from "./client";

const getPosts = () => client.get("/posts");
const getLocker = () => client.get("locker");
const searchPosts = () =>
  client.get(
    "/search?lat=34.27130126953125&lon=-118.51389390427481&distance=10"
  );
// , {
//   params: {
//     lat: 34.27130126953125,
//     lon: -118.51389390427481,
//     distance: 10,
//   },
//  });

const unlockListing = (post, location, onUploadProgress) => {
  console.log("trying to unlock this:", post);
  console.log("My location:", location);

  const requestBody = {
    postID: post.id,
    lat: location.lat,
    lon: location.lon,
    distance: 0,
  };

  return client.post("unlock", requestBody, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const addPost = (post, onUploadProgress) => {
  // console.log(object);
  if (!post.location) {
    return alert("You must enable location to post");
    // data.append("lat", JSON.stringify(post.location.latitude));
    // data.append("long", JSON.stringify(post.location.longitude));
  }

  const newPost = {
    dataType: "photo",
    mimeType: post.category.value,
    hint: post.description,
    category: post.category.label,
    lat: post.location.latitude,
    long: post.location.longitude,
  };

  console.log(newPost);

  //Parent > Child

  return client.post("post", newPost, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// content-type
// application/json
// multipart/form-data

export default {
  addPost,
  getLocker,
  getPosts,
  searchPosts,
  unlockListing,
};

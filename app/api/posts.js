import client from "./client";

const getPosts = () => client.get("/posts");
const getLocker = () => client.get("locker");
// const searchPosts = () => client.get("/search?lat=34&lon=-118&distance=10");
const searchPosts = (region, onUploadProgress) => {
  let lat = region.latitude;
  let lon = region.longitude;
  console.log("my location:", lat, lon);
  return client.get("/search?lat=" + lat + "&lon=" + lon + "&distance=20", {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const unlockListing = (post, location, onUploadProgress) => {
  console.log("trying to unlock this:", post);
  console.log("My location:", location);

  const requestBody = {
    postID: post.id,
    lat: 34.271270751953125, //location.lat,
    lon: -118.51387839775394, //location.lon,
    distance: 20,
  };

  return client.post("unlock", requestBody, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const addPost = (post, onUploadProgress) => {
  if (!post.location) {
    return alert("You must enable location to post");
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

const addTour = (post, onUploadProgress) => {
  if (!post.location) {
    return alert("You must enable location to post");
  }

  const newPost = {
    // dataType: "photo",
    // mimeType: post.category.value,
    // hint: post.description,
    // category: post.category.label,
    // lat: post.location.latitude,
    // long: post.location.longitude,

    title: post.title,
    categories: [post.category.label],
    active: true,
    location: {
      lat: post.location.latitude,
      lon: post.location.longitude,
    },
  };

  console.log(newPost);

  //Parent > Child

  return client.post("tour", newPost, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getTours = () => client.get("/my-tours");

// content-type
// application/json
// multipart/form-data

export default {
  addPost,
  addTour,
  getLocker,
  getPosts,
  getTours,
  searchPosts,
  unlockListing,
};

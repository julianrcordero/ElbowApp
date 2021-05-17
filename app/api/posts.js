import client from "./client";

const getPosts = () => client.get("/posts");
const getLocker = () => client.get("locker");
// const searchPosts = () => client.get("/search?lat=34&lon=-118&distance=10");
const searchPosts = (region, onUploadProgress) => {
  let lat = region.latitude;
  let lon = region.longitude;
  return client.get("/search?lat=" + lat + "&lon=" + lon + "&distance=50000", {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
const getTourPoints = (tourID, onUploadProgress) => {
  return client.get("/search?tourID=" + tourID, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const unlockListing = (id, location, onUploadProgress) => {
  const requestBody = {
    postID: id,
    // lat: location.lat,
    // lon: location.lon,
    lat: 34.157112274394436,
    lon: -118.43738625822279,
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
    completed: true,
    public: true,
    userIDs: [],
    tourID: post.tour.ID,
  };

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

  const newTour = {
    title: post.title,
    categories: ["Category 1"],
    active: true,
    location: {
      lat: post.location.latitude,
      lon: post.location.longitude,
    },
  };

  //Parent > Child

  return client.post("tour", newTour, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const subscribeTour = (tour, onUploadProgress) => {
  const newPost = {
    tourID: tour.id,
  };

  //Parent > Child

  return client.post("subscription", newPost, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getSubscribedTours = () => client.get("/my-tours");

const getCreatedTours = () => client.get("/tours");

const getUser = (userID, onUploadProgress) => {
  return client.get("/user/" + userID, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
// content-type
// application/json
// multipart/form-data

export default {
  addPost,
  addTour,
  getCreatedTours,
  getLocker,
  getPosts,
  getSubscribedTours,
  getUser,
  searchPosts,
  getTourPoints,
  subscribeTour,
  unlockListing,
};

import client from "./client";

const getPosts = () => client.get("/posts");
const getLocker = () => client.get("locker");
// const searchPosts = () => client.get("/search?lat=34&lon=-118&distance=10");
const searchPosts = (region, onUploadProgress) => {
  let lat = region.latitude;
  let lon = region.longitude;
  console.log("my location:", lat, lon);
  return client.get("/search?lat=" + lat + "&lon=" + lon + "&distance=20000", {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// region: {
//   latitude: 34.2709266,
//   longitude: -118.5139665,
//   latitudeDelta: 0.2,
//   longitudeDelta: 0.0421,
// }
const searchTourPoints = (tour, onUploadProgress) => {
  return client.get(
    "/search?lat=" +
      tour.location.lat +
      "&lon=" +
      tour.location.lon +
      "&distance=20000",
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
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
    completed: true,
    public: true,
    userIDs: [],
    tourID: post.tour.ID,
  };

  console.log(newPost);

  //Parent > Child

  return client.post("post", newPost, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const addTour = (post, onUploadProgress) => {
  console.log("addTour");
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
  searchTourPoints,
  subscribeTour,
  unlockListing,
};

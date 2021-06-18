import * as Location from "expo-location";
import { LocationAccuracy } from "expo-location";
import { useEffect, useState } from "react";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest,
      });
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  const watchPosition = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.watchPositionAsync();
      setLocation({ latitude, longitude });
      console.log("location updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};

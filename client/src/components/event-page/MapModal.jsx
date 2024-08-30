import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const MapModal = ({ mapLocation }) => {
  const { latitude, longitude } = mapLocation;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude]
  );

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="w-100% h-100%"
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </>
  );
};

export default MapModal;

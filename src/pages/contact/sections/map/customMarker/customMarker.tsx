import React, { useMemo } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";
import MapMarker from "@/assets/images/icons/marker.svg"

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children?: React.ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, children }) => {
  const customIcon = useMemo(
    () =>
      L.icon({
        iconUrl: MapMarker, 
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -45],
      }),
    []
  );

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;

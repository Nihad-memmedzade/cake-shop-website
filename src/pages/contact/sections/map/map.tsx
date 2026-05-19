import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "./customMarker/customMarker";
import style from "./map.module.scss";

const WARSAW_CENTER: [number, number] = [52.2297, 21.0122];

const WARSAW_BOUNDS: [[number, number], [number, number]] = [
  [52.05, 20.85],
  [52.37, 21.27],
];

const rectangle: [[number, number], [number, number]] = [
  [52.215, 20.97],
  [52.245, 21.05],
];

export default function Map() {
  return (
    <section className={style.mapCard}>
      <MapContainer
        center={WARSAW_CENTER}
        zoom={15}
        scrollWheelZoom
        className={style.map}
        maxBounds={WARSAW_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={11}
        maxZoom={17}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Warsaw marker">
            <LayerGroup>
              <CustomMarker position={WARSAW_CENTER}>
                <Popup>
                  <div className={style.popup}>
                    <p className={style.popupTitle}>Cake House Warsaw</p>
                    <p className={style.popupText}>Rynek Starego Miasta 1</p>
                  </div>
                </Popup>
              </CustomMarker>
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Delivery area">
            <LayerGroup>
              <Circle
                center={WARSAW_CENTER}
                radius={600}
                pathOptions={{
                  color: "#b94867",
                  weight: 2,
                  fillColor: "#b94867",
                  fillOpacity: 0.14,
                }}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Store area">
            <FeatureGroup>
              <Popup>Store area in Warsaw</Popup>
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  type MapRef,
  type MapMouseEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Museo } from "../data/museos";
import { COLORES_CATEGORIAS } from "../data/museos";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const INITIAL_VIEW = {
  latitude: 19.4326,
  longitude: -99.155,
  zoom: 12,
  pitch: 50,
  bearing: -15,
};

interface Props {
  museos: Museo[];
  selected: Museo | null;
  onSelect: (museo: Museo) => void;
  onDeselect: () => void;
}

export default function MuseumMap({ museos, selected, onSelect, onDeselect }: Props) {
  const mapRef = useRef<MapRef>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const flyTo = useCallback((lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;

    const isMobile = window.innerWidth < 768;
    
    // On mobile, use padding to account for detail panel covering bottom 50vh
    const padding = isMobile 
      ? { top: 50, right: 20, bottom: window.innerHeight * 0.5 + 50, left: 20 }
      : { top: 20, right: 20, bottom: 20, left: 20 };

    map.flyTo({
      center: [lng, lat],
      zoom: isMobile ? 15 : 16,
      pitch: isMobile ? 45 : 60,
      bearing: -20,
      duration: 1400,
      essential: true,
      padding,
    });
  }, []);

  // Fly to the selected museum (works for sidebar clicks too)
  useEffect(() => {
    if (selected) {
      flyTo(selected.lat, selected.lng);
    }
  }, [selected, flyTo]);

  const handleMarkerClick = useCallback(
    (museo: Museo, e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(museo);
      flyTo(museo.lat, museo.lng);
    },
    [onSelect, flyTo],
  );

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const target = e.originalEvent.target as HTMLElement;
      if (!target.closest(".museum-pin")) {
        onDeselect();
      }
    },
    [onDeselect],
  );

  /* Add 3D extruded buildings when the map style finishes loading */
  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const layers = map.getStyle().layers || [];
    let firstSymbol: string | undefined;
    for (const l of layers) {
      if (l.type === "symbol" && (l as Record<string, unknown>).layout) {
        firstSymbol = l.id;
        break;
      }
    }

    if (!map.getLayer("3d-buildings")) {
      map.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              0, "#dce6f2",
              50, "#a8bdd9",
              200, "#7a9cc6",
            ],
            "fill-extrusion-height": ["get", "render_height"],
            "fill-extrusion-base": ["get", "render_min_height"],
            "fill-extrusion-opacity": 0.7,
          },
        },
        firstSymbol,
      );
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      style={{ width: "100%", height: "100%" }}
      mapStyle={MAP_STYLE}
      onClick={handleMapClick}
      onLoad={handleLoad}
      attributionControl={false}
      maxPitch={70}
    >
      <NavigationControl position="top-right" visualizePitch />
      <GeolocateControl position="top-right" />
      <ScaleControl position="bottom-right" />

      {museos.map((museo) => {
        const color = COLORES_CATEGORIAS[museo.categoria] ?? "#888";
        const isSelected = selected?.id === museo.id;
        const isHovered = hoveredId === museo.id;
        const scale = isSelected ? 1.4 : isHovered ? 1.15 : 1;

        return (
          <Marker key={museo.id} longitude={museo.lng} latitude={museo.lat} anchor="bottom">
            <div
              className="museum-pin"
              style={{
                cursor: "pointer",
                transform: `scale(${scale})`,
                transition: "transform 0.2s ease",
              }}
              onClick={(e) => handleMarkerClick(museo, e)}
              onMouseEnter={() => setHoveredId(museo.id)}
              onMouseLeave={() => setHoveredId(null)}
              title={museo.nombre}
            >
              <svg width="32" height="42" viewBox="0 0 32 42">
                <defs>
                  <filter id={`sh${museo.id}`} x="-30%" y="-20%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.4" />
                  </filter>
                </defs>
                <path
                  d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z"
                  fill={isSelected ? "#1d4ed8" : color}
                  filter={`url(#sh${museo.id})`}
                />
                <circle cx="16" cy="15" r="7" fill="white" opacity={0.95} />
                <text x="16" y="19" textAnchor="middle" fontSize="11">🏛</text>
              </svg>
              {isSelected && (
                <div className="pin-label">
                  {museo.nombre.length > 30 ? museo.nombre.slice(0, 30) + "…" : museo.nombre}
                </div>
              )}
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}

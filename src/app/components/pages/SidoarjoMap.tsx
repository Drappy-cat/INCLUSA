import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type Kecamatan } from "../../data/content";
import { useContent } from "../../data/ContentStore";

function heatColor(cases: number, max: number) {
  const r = cases / max;
  if (r > 0.8) return "#e4412f"; // sangat tinggi
  if (r > 0.6) return "#f0654e"; // tinggi
  if (r > 0.4) return "#1f9aa0"; // cukup tinggi
  if (r > 0.2) return "#34bec4"; // sedang
  return "#f7c948"; // rendah
}

// Recenter peta secara halus saat kecamatan dipilih.
function FlyTo({ selected }: { selected: Kecamatan }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([selected.lat, selected.lng], 12, { duration: 0.8 });
  }, [map, selected]);
  return null;
}

export function SidoarjoMap({
  selected,
  onSelect,
}: {
  selected: Kecamatan;
  onSelect: (k: Kecamatan) => void;
}) {
  const { kecamatan: kecamatanData } = useContent();
  const max = Math.max(...kecamatanData.map((k) => k.cases));
  return (
    <MapContainer
      center={[-7.4478, 112.7]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {kecamatanData.map((k) => {
        const isSel = k.name === selected.name;
        const radius = 10 + (k.cases / max) * 22;
        const color = heatColor(k.cases, max);
        return (
          <CircleMarker
            key={k.name}
            center={[k.lat, k.lng]}
            radius={radius}
            pathOptions={{
              color: isSel ? "#123a40" : color,
              weight: isSel ? 3 : 1.5,
              fillColor: color,
              fillOpacity: isSel ? 0.85 : 0.55,
            }}
            eventHandlers={{ click: () => onSelect(k) }}
          >
            <Tooltip direction="top" offset={[0, -4]}>
              <div className="text-xs">
                <strong>{k.name}</strong>
                <br />
                {k.cases} kasus · {k.faskes} faskes
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
      <FlyTo selected={selected} />
    </MapContainer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapProperty {
  id: string;
  name: string;
  neighborhood: string;
  price: string;
  size: string;
  type: string;
  lat: number;
  lng: number;
}

const properties: MapProperty[] = [
  { id: "p1", name: "Achrafieh Penthouse", neighborhood: "Achrafieh", price: "$1,200,000", size: "320 sqm", type: "Penthouse", lat: 33.8880, lng: 35.5270 },
  { id: "p2", name: "Verdun Luxury Villa", neighborhood: "Verdun", price: "$2,800,000", size: "650 sqm", type: "Villa", lat: 33.8780, lng: 35.4870 },
  { id: "p3", name: "Downtown Loft", neighborhood: "Downtown", price: "$450,000", size: "95 sqm", type: "Apartment", lat: 33.8960, lng: 35.5030 },
  { id: "p4", name: "Gemmayzeh Duplex", neighborhood: "Gemmayzeh", price: "$680,000", size: "180 sqm", type: "Duplex", lat: 33.8930, lng: 35.5180 },
  { id: "p5", name: "Rabieh Family Home", neighborhood: "Rabieh", price: "$1,500,000", size: "450 sqm", type: "Villa", lat: 33.9120, lng: 35.5480 },
  { id: "p6", name: "Jounieh Waterfront", neighborhood: "Jounieh", price: "$380,000", size: "120 sqm", type: "Apartment", lat: 33.9800, lng: 35.6180 },
  { id: "p7", name: "Baabda Land Parcel", neighborhood: "Baabda", price: "$3,200,000", size: "2,500 sqm", type: "Land", lat: 33.8340, lng: 35.5440 },
  { id: "p8", name: "Hamra Studio", neighborhood: "Hamra", price: "$195,000", size: "55 sqm", type: "Studio", lat: 33.8940, lng: 35.4820 },
  { id: "p9", name: "Sin el Fil Office", neighborhood: "Sin el Fil", price: "$320,000", size: "200 sqm", type: "Office", lat: 33.8740, lng: 35.5440 },
  { id: "p10", name: "Dbayeh Residence", neighborhood: "Dbayeh", price: "$520,000", size: "160 sqm", type: "Apartment", lat: 33.9170, lng: 35.5770 },
  { id: "p11", name: "Antelias Townhouse", neighborhood: "Antelias", price: "$750,000", size: "280 sqm", type: "Villa", lat: 33.9100, lng: 35.5940 },
  { id: "p12", name: "Mansourieh Flat", neighborhood: "Mansourieh", price: "$290,000", size: "140 sqm", type: "Apartment", lat: 33.8650, lng: 35.5720 },
  { id: "p13", name: "Broummana Chalet", neighborhood: "Broummana", price: "$420,000", size: "200 sqm", type: "Villa", lat: 33.8770, lng: 35.6410 },
  { id: "p14", name: "Mar Mikhael Loft", neighborhood: "Mar Mikhael", price: "$350,000", size: "110 sqm", type: "Apartment", lat: 33.8910, lng: 35.5220 },
  { id: "p15", name: "Beit Mery Estate", neighborhood: "Beit Mery", price: "$1,800,000", size: "800 sqm", type: "Villa", lat: 33.8620, lng: 35.6080 },
  { id: "p16", name: "Kaslik Commercial", neighborhood: "Kaslik", price: "$550,000", size: "300 sqm", type: "Office", lat: 33.9760, lng: 35.6230 },
  { id: "p17", name: "Hazmieh Garden Apt", neighborhood: "Hazmieh", price: "$410,000", size: "175 sqm", type: "Apartment", lat: 33.8520, lng: 35.5340 },
  { id: "p18", name: "Ashrafieh Heritage", neighborhood: "Achrafieh", price: "$890,000", size: "240 sqm", type: "Duplex", lat: 33.8850, lng: 35.5310 },
  { id: "p19", name: "Mtayleb Villa", neighborhood: "Mtayleb", price: "$2,100,000", size: "550 sqm", type: "Villa", lat: 33.8940, lng: 35.6280 },
  { id: "p20", name: "Saifi Village Apt", neighborhood: "Saifi", price: "$620,000", size: "130 sqm", type: "Apartment", lat: 33.8980, lng: 35.5100 },
];

const typeColors: Record<string, string> = {
  Penthouse: "#C4A265",
  Villa: "#1B3A5C",
  Apartment: "#2b849e",
  Duplex: "#6366f1",
  Land: "#f59e0b",
  Studio: "#8b5cf6",
  Office: "#64748b",
};

interface BeirutMapProps {
  height?: string;
  onPropertySelect?: (property: MapProperty) => void;
  className?: string;
}

export function BeirutMap({ height = "400px", onPropertySelect, className }: BeirutMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [selected, setSelected] = useState<MapProperty | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      const maplibregl = await import("maplibre-gl");

      if (cancelled || !mapRef.current) return;

      const map = new maplibregl.default.Map({
        container: mapRef.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap &copy; CARTO",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
        center: [35.52, 33.89],
        zoom: 11.5,
        maxZoom: 16,
        minZoom: 9,
      });

      mapInstanceRef.current = map;

      map.on("load", () => {
        if (cancelled) return;
        setMapReady(true);

        properties.forEach((p) => {
          const color = typeColors[p.type] || "#1B3A5C";

          const el = document.createElement("div");
          el.className = "map-marker";
          el.style.cssText = `
            width: 14px; height: 14px; border-radius: 50%;
            background: ${color}; border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer; transition: transform 0.15s ease;
          `;
          el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.4)"; });
          el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelected(p);
            onPropertySelect?.(p);
          });

          new maplibregl.default.Marker({ element: el })
            .setLngLat([p.lng, p.lat])
            .addTo(map);
        });
      });
    }

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onPropertySelect]);

  const legendItems = [
    { label: "Penthouse", color: "#C4A265" },
    { label: "Villa", color: "#1B3A5C" },
    { label: "Apartment", color: "#2b849e" },
    { label: "Duplex", color: "#6366f1" },
    { label: "Land", color: "#f59e0b" },
    { label: "Office", color: "#64748b" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={cn("card-premium overflow-hidden relative", className)}
    >
      {/* Map */}
      <div
        ref={mapRef}
        style={{ height: expanded ? "600px" : height }}
        className="w-full transition-all duration-300"
      />

      {/* Loading overlay */}
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F7F8FA]">
          <div className="flex items-center gap-2 text-sm text-[#9B9BA8]">
            <MapPin className="size-4 animate-pulse" />
            Loading map...
          </div>
        </div>
      )}

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute top-3 right-3 rounded-lg bg-white/90 backdrop-blur-sm border border-[#E8E8E4] p-2 shadow-sm hover:bg-white transition-colors z-10"
      >
        {expanded ? <Minimize2 className="size-3.5 text-[#4A4A5A]" /> : <Maximize2 className="size-3.5 text-[#4A4A5A]" />}
      </button>

      {/* Selected property popup */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-14 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white rounded-xl shadow-lg border border-[#E8E8E4] p-4 z-10"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-[#9B9BA8] hover:text-[#4A4A5A] text-xs"
          >
            ✕
          </button>
          <p className="text-sm font-semibold text-[#0F1117]">{selected.name}</p>
          <p className="text-xs text-[#9B9BA8] mt-0.5">{selected.neighborhood}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm font-bold text-[#1B3A5C]">{selected.price}</span>
            <span className="text-xs text-[#9B9BA8]">{selected.size}</span>
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${typeColors[selected.type]}15`, color: typeColors[selected.type] }}
            >
              {selected.type}
            </span>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-[#E8E8E4]/60 bg-white/80 backdrop-blur-sm flex-wrap">
        <span className="text-[10px] text-[#9B9BA8] font-medium uppercase tracking-wider">Property Types</span>
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-[#4A4A5A]">{item.label}</span>
          </div>
        ))}
        <span className="ml-auto text-[10px] text-[#9B9BA8]">{properties.length} properties</span>
      </div>
    </motion.div>
  );
}

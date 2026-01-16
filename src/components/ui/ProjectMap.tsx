import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Layers } from "lucide-react";
import type { Project } from "../../types";

// Helper to create icon based on size
const createCustomIcon = (scale: number = 1) => {
  const size = 30 * scale; // Reduced base size from 40 to 30
  const iconSize: [number, number] = [size, size];
  const iconAnchor: [number, number] = [size / 2, size]; // Center bottom anchor
  const popupAnchor: [number, number] = [0, -size];

  return L.divIcon({
    className: "bg-transparent border-none transition-all duration-300",
    html: `<svg viewBox="0 0 24 24" fill="#F05B22" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-xl filter"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor,
  });
};

// Component to handle zoom events and marker resizing
const MapEvents = ({ setScale }: { setScale: (scale: number) => void }) => {
  const map = useMapEvents({
    zoomend: () => {
      const zoom = map.getZoom();
      // Logic adjusted for user request:
      // Default (Zoom 7-9): Small (Scale 1 -> 30px)
      // Zoom Out (< 7): Smaller (Scale 0.7 -> 21px)
      // Zoom In (> 9): Bigger (Scale 1.5 -> 45px)
      // Zoom In (> 12): Much Bigger (Scale 2 -> 60px)
      let newScale = 1;

      if (zoom < 9) {
        newScale = 0.7;
      } else if (zoom >= 15) {
        newScale = 2.0;
      } else if (zoom >= 12) {
        newScale = 1.5;
      } else {
        newScale = 1;
      }

      setScale(newScale);
    },
  });
  return null;
};

// Custom Hook to fit bounds
const RecenterAutomatically = ({ projects }: { projects: any[] }) => {
  const map = useMap();

  useEffect(() => {
    if (projects.length > 0) {
      const bounds = L.latLngBounds(
        projects.map((p) => [p.coordinates.lat, p.coordinates.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [projects, map]);

  return null;
};

interface ProjectMapProps {
  projects?: Project[];
}

export const ProjectMap = ({ projects: propProjects }: ProjectMapProps) => {
  const { projects: allProjects, divisions } = useData();
  const sourceProjects = propProjects || allProjects;

  const [scale, setScale] = useState(1);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter projects based on selected divisions
  const mapProjects = React.useMemo(() => {
    return sourceProjects.filter((p) => {
      // Check valid coordinates
      if (
        !p.coordinates ||
        typeof p.coordinates.lat !== "number" ||
        typeof p.coordinates.lng !== "number"
      ) {
        return false;
      }

      // Filter by division if any selected
      if (selectedDivisions.length > 0) {
        // Show project if it includes ANY of the selected divisions
        return p.divisionSlugs?.some((slug) =>
          selectedDivisions.includes(slug)
        );
      }

      return true; // Show all if no filter
    });
  }, [sourceProjects, selectedDivisions]);

  const toggleDivision = (slug: string) => {
    setSelectedDivisions((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedDivisions([]);
  };

  return (
    <div className="w-full h-[600px] relative z-0 group">
      <MapContainer
        center={[24.4539, 54.3773]} // Default to Abu Dhabi
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#242424" }}
      >
        <MapEvents setScale={setScale} />

        {/* Dark Matter Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <RecenterAutomatically projects={mapProjects} />

        {mapProjects.map((project) => (
          <Marker
            key={project.id}
            position={[project.coordinates!.lat, project.coordinates!.lng]}
            icon={createCustomIcon(scale)}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              click: (e) => e.target.openPopup(),
            }}
          >
            <Popup className="project-popup">
              <Link
                to={`/projects/${project.slug}`}
                className="block min-w-[200px] hover:no-underline"
              >
                {/* Only show image for Major Projects */}
                {project.category === "Major Projects" && (
                  <div className="relative h-28 mb-2 rounded overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="px-5 pb-5 pt-3">
                  <h3 className="text-base font-bold font-display text-primary mb-1 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-sm font-medium text-neutral-700 mb-3">
                    <MapPin size={12} className="mr-1 text-accent" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-xs font-bold text-accent">
                    View Details <ArrowRight size={12} className="ml-1" />
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Filter Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-white text-primary px-4 py-2 rounded-lg shadow-lg font-bold flex items-center gap-2 hover:bg-neutral-50 transition-colors"
        >
          <Layers size={18} />
          Filters
          {selectedDivisions.length > 0 && (
            <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedDivisions.length}
            </span>
          )}
        </button>

        {isFilterOpen && (
          <div className="bg-white rounded-lg shadow-xl mt-2 p-4 w-64 animate-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Filter by Division
              </span>
              {selectedDivisions.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-accent hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {divisions.map((division) => (
                <label
                  key={division.id}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent/20"
                      checked={selectedDivisions.includes(division.slug)}
                      onChange={() => toggleDivision(division.slug)}
                    />
                  </div>
                  <span className="text-sm text-neutral-700 group-hover:text-primary transition-colors">
                    {division.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay Title */}
      <div className="absolute top-8 left-20 z-[1000] bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-sm border-l-4 border-accent hidden md:block pointer-events-none">
        <h2 className="text-2xl font-display font-bold text-primary mb-2">
          Project Locations
        </h2>
        <p className="text-neutral-600 text-sm">
          {selectedDivisions.length > 0
            ? `Showing ${mapProjects.length} projects in selected divisions.`
            : "Explore our project footprint across the region."}
        </p>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

const createCustomIcon = () => {
  return L.divIcon({
    className: "bg-transparent border-none",
    html: `<svg viewBox="0 0 24 24" fill="#F05B22" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 drop-shadow-xl filter"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
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

import type { Project } from "../../types";

interface ProjectMapProps {
  projects?: Project[];
}

export const ProjectMap = ({ projects: propProjects }: ProjectMapProps) => {
  const { projects: allProjects } = useData();
  const projects = propProjects || allProjects;

  // Filter projects that have valid coordinates
  const mapProjects = projects.filter(
    (p) =>
      p.coordinates &&
      typeof p.coordinates.lat === "number" &&
      typeof p.coordinates.lng === "number"
  );

  if (mapProjects.length === 0) return null;

  return (
    <div className="w-full h-[600px] relative z-0">
      <MapContainer
        center={[24.4539, 54.3773]} // Default to Abu Dhabi
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#242424" }}
      >
        {/* Dark Matter Tile Layer - ideal for premium feeling */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <RecenterAutomatically projects={mapProjects} />

        {mapProjects.map((project) => (
          <Marker
            key={project.id}
            position={[project.coordinates!.lat, project.coordinates!.lng]}
            icon={createCustomIcon()}
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
                <div className="relative h-28 mb-2 rounded overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-bold font-display text-primary mb-0.5 leading-tight">
                  {project.title}
                </h3>
                <div className="flex items-center text-xs text-neutral-500 mb-2">
                  <MapPin size={10} className="mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center text-xs font-bold text-accent">
                  View Details <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay Title */}
      <div className="absolute top-8 left-8 z-[1000] bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-sm border-l-4 border-accent hidden md:block">
        <h2 className="text-2xl font-display font-bold text-primary mb-2">
          Project Locations
        </h2>
        <p className="text-neutral-600 text-sm">
          Explore our project footprint across the region. Hover or click
          markers to see details.
        </p>
      </div>
    </div>
  );
};

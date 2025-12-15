// src/pages/RidePage.jsx

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Default Marker Fix for Leaflet (important for Vite)
// If you prefer local images import approach, replace these URLs with imports.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function RidePage() {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersGroupRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupCoord, setPickupCoord] = useState(null);
  const [dropCoord, setDropCoord] = useState(null);

  // Initialize Map once
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [28.6139, 77.2090], // Default Delhi
        zoom: 13,
      });

      // OSM TILE
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      // marker layer group so we can clear markers easily
      markersGroupRef.current = L.layerGroup().addTo(mapRef.current);
    }

    // cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Helper: geocode with Nominatim
  const geocodeLocation = async (location, type) => {
    if (!location || !mapRef.current) return;

    try {
      // encode the query and request only 1 result
      const q = encodeURIComponent(location);
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`;

      // Note: browsers won't let you set a custom User-Agent header. If Nominatim blocks you,
      // consider using a backend proxy or a paid geocoding service (Mapbox/Google).
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en",
        },
      });
      const data = await res.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        if (type === "pickup") setPickupCoord([lat, lon]);
        if (type === "drop") setDropCoord([lat, lon]);

        // add marker + highlight (for pickup) using the markersGroup
        const mg = markersGroupRef.current;
        // Remove previous marker of this type by clearing and re-adding all from coords state in effect below
        // For now just add the marker (we'll re-sync markers in the coords useEffect)
        return [lat, lon];
      } else {
        // Not found
        return null;
      }
    } catch (err) {
      console.error("Geocode error:", err);
      return null;
    }
  };

  // Sync markers & highlights on map when coords change
  useEffect(() => {
    const map = mapRef.current;
    const mg = markersGroupRef.current;
    if (!map || !mg) return;

    // clear previous markers/highlights
    mg.clearLayers();

    const points = [];

    if (pickupCoord) {
      const m = L.marker(pickupCoord).bindPopup("Pickup");
      m.addTo(mg);

      // highlight pickup with circle + subtle outer ring
      L.circle(pickupCoord, {
        radius: 80,
        color: "#1e90ff",
        fillColor: "#1e90ff",
        fillOpacity: 0.18,
        weight: 2,
      }).addTo(mg);

      L.circle(pickupCoord, {
        radius: 220,
        color: "#1e90ff",
        fillColor: "#1e90ff",
        fillOpacity: 0.06,
        weight: 0,
      }).addTo(mg);

      points.push(pickupCoord);
    }

    if (dropCoord) {
      const m2 = L.marker(dropCoord).bindPopup("Drop");
      m2.addTo(mg);

      // optional different color for drop
      L.circle(dropCoord, {
        radius: 70,
        color: "#2ecc71",
        fillColor: "#2ecc71",
        fillOpacity: 0.14,
        weight: 2,
      }).addTo(mg);

      points.push(dropCoord);
    }

    // adjust view
    if (points.length === 1) {
      map.flyTo(points[0], 15, { duration: 0.8 });
    } else if (points.length === 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [pickupCoord, dropCoord]);

  // Add Routing when both coords available
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // remove old routing control
    if (routingRef.current) {
      try {
        map.removeControl(routingRef.current);
      } catch (e) {
        console.warn("Error removing routing control:", e);
      }
      routingRef.current = null;
    }

    if (pickupCoord && dropCoord) {
      // create new routing control
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoord[0], pickupCoord[1]),
          L.latLng(dropCoord[0], dropCoord[1]),
        ],
        lineOptions: {
          styles: [{ color: "black", weight: 5 }],
        },
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
        createMarker: function () {
          return null; // we already have our own markers + highlights
        },
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        showAlternatives: false,
      }).addTo(map);

      // optional: zoom to route when route found
      routingRef.current.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const bounds = routes[0].bounds;
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      });
    }
  }, [pickupCoord, dropCoord]);

  // Handlers for input blur/search
  const handlePickupSearch = async () => {
    if (!pickup) return;
    const res = await geocodeLocation(pickup, "pickup");
    if (res) {
      setPickupCoord(res);
    } else {
      alert("Pickup location not found");
    }
  };

  const handleDropSearch = async () => {
    if (!drop) return;
    const res = await geocodeLocation(drop, "drop");
    if (res) {
      setDropCoord(res);
    } else {
      alert("Drop location not found");
    }
  };

  // Optional: "Confirm Ride" can trigger both geocodes and route
  const handleConfirm = async () => {
    let ok = true;
    if (!pickupCoord) {
      const p = await geocodeLocation(pickup, "pickup");
      if (p) setPickupCoord(p);
      else ok = false;
    }
    if (!dropCoord) {
      const d = await geocodeLocation(drop, "drop");
      if (d) setDropCoord(d);
      else ok = false;
    }
    if (!ok) alert("Please check pickup/drop addresses.");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fff" }}>
      {/* LEFT SIDE FORM */}
      <div
        style={{
          width: "35%",
          padding: "30px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Book your ride</h1>

        <label style={{ fontWeight: "600" }}>Pickup Location</label>
        <input
          type="text"
          placeholder="Enter pickup"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          onBlur={handlePickupSearch}
          style={{
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <label style={{ fontWeight: "600" }}>Drop Location</label>
        <input
          type="text"
          placeholder="Enter drop"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          onBlur={handleDropSearch}
          style={{
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleConfirm}
          style={{
            background: "black",
            color: "white",
            padding: "14px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Confirm Ride
        </button>
      </div>

      {/* MAP SECTION */}
      <div id="map" style={{ width: "65%", height: "100%" }}></div>
    </div>
  );
}

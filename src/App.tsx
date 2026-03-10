import { useState, useCallback } from "react";
import { museos } from "./data/museos";
import type { Museo } from "./data/museos";
import MuseumMap from "./components/MuseumMap";
import Sidebar from "./components/Sidebar";
import MuseumDetail from "./components/MuseumDetail";

export default function App() {
  const [selected, setSelected] = useState<Museo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = useCallback((museo: Museo) => setSelected(museo), []);
  const handleDeselect = useCallback(() => setSelected(null), []);

  return (
    <div className="app">
      <Sidebar
        museos={museos}
        selected={selected}
        onSelect={handleSelect}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="map-area">
        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => {
          setSidebarOpen(true);
          setSelected(null); // Close detail panel when opening sidebar on mobile
        }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>{museos.length} Museos</span>
        </button>

        <MuseumMap
          museos={museos}
          selected={selected}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />

        <MuseumDetail museo={selected} onClose={handleDeselect} />
      </div>
    </div>
  );
}

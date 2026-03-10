import { useState } from "react";
import type { Museo } from "../data/museos";
import { categorias, COLORES_CATEGORIAS } from "../data/museos";

interface Props {
  museos: Museo[];
  selected: Museo | null;
  onSelect: (museo: Museo) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ museos, selected, onSelect, isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = museos.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      m.nombre.toLowerCase().includes(q) ||
      m.colonia.toLowerCase().includes(q) ||
      m.alcaldia.toLowerCase().includes(q);
    const matchCat = !activeCat || m.categoria === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <div>
              <h1 className="sidebar-title">🏛️ Museos CDMX</h1>
              <p className="sidebar-count">{filtered.length} de {museos.length} museos</p>
            </div>
            <button onClick={onClose} className="sidebar-close-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="sidebar-search">
            <svg className="sidebar-search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Buscar museo, colonia, alcaldía…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sidebar-search-input"
            />
          </div>

          {/* Category chips */}
          <div className="sidebar-chips">
            <button
              onClick={() => setActiveCat(null)}
              className={`chip ${!activeCat ? "chip--active" : ""}`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(activeCat === cat ? null : cat)}
                className={`chip ${activeCat === cat ? "chip--active" : ""}`}
                style={activeCat === cat ? { backgroundColor: COLORES_CATEGORIAS[cat] } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Museum list */}
        <ul className="sidebar-list">
          {filtered.length === 0 && (
            <li className="sidebar-empty">
              <p>\uD83D\uDD0D</p>
              <p>Sin resultados</p>
            </li>
          )}
          {filtered.map((museo) => {
            const color = COLORES_CATEGORIAS[museo.categoria] ?? "#888";
            const isActive = selected?.id === museo.id;

            return (
              <li key={museo.id}>
                <button
                  onClick={() => {
                    onSelect(museo);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`sidebar-item ${isActive ? "sidebar-item--active" : ""}`}
                  style={isActive ? { borderLeftColor: color } : undefined}
                >
                  <div className="sidebar-item-dot" style={{ backgroundColor: color }} />
                  <div className="sidebar-item-info">
                    <p className="sidebar-item-name">{museo.nombre}</p>
                    <p className="sidebar-item-meta">{museo.alcaldia} · {museo.colonia}</p>
                    <span className="sidebar-item-badge" style={{ backgroundColor: color }}>
                      {museo.categoria}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          Fuente: <a href="https://sic.cultura.gob.mx" target="_blank" rel="noopener noreferrer">SIC Cultura</a> · OpenFreeMap
        </div>
      </aside>
    </>
  );
}

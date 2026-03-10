import type { Museo } from "../data/museos";
import { COLORES_CATEGORIAS } from "../data/museos";

interface Props {
  museo: Museo | null;
  onClose: () => void;
}

export default function MuseumDetail({ museo, onClose }: Props) {
  if (!museo) return null;

  const color = COLORES_CATEGORIAS[museo.categoria] ?? "#888";
  const sicUrl = `https://sic.cultura.gob.mx/ficha.php?table=museo&table_id=${museo.sicId}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${museo.lat},${museo.lng}`;

  return (
    <div className="detail-overlay">
      <div className="detail-panel">
        {/* Mobile drag handle */}
        <div className="detail-handle" />

        {/* Header */}
        <div className="detail-header" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
          <button onClick={onClose} className="detail-close" aria-label="Cerrar">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span className="detail-badge" style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
            {museo.categoria}
          </span>
          <h2 className="detail-title">{museo.nombre}</h2>
          <p className="detail-subtitle">{museo.alcaldia}</p>
        </div>

        {/* Body */}
        <div className="detail-body">
          <InfoRow icon="📍" label="Dirección" value={`${museo.direccion}, ${museo.colonia}, CP ${museo.cp}`} />
          {museo.telefono && <InfoRow icon="📞" label="Teléfono" value={museo.telefono} />}
          {museo.horario && <InfoRow icon="🕒" label="Horario" value={museo.horario} />}
          {museo.costo && <InfoRow icon="💰" label="Costo" value={museo.costo} />}
          <InfoRow icon="🎭" label="Temática" value={museo.tematica || museo.categoria} />
          <InfoRow icon="🔗" label="Registro SIC" value={`ID ${museo.sicId}`} link={sicUrl} />
        </div>

        {/* Actions */}
        <div className="detail-actions">
          {museo.web && (
            <a href={museo.web} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ backgroundColor: color }}>
              🌐 Sitio web
            </a>
          )}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderColor: color, color }}>
            🗺️ Cómo llegar
          </a>
          <a href={sicUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderColor: "#6b7280", color: "#6b7280" }}>
            📋 Ficha SIC
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, link }: { icon: string; label: string; value: string; link?: string }) {
  return (
    <div className="info-row">
      <span className="info-icon">{icon}</span>
      <div>
        <p className="info-label">{label}</p>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="info-link">{value}</a>
        ) : (
          <p className="info-value">{value}</p>
        )}
      </div>
    </div>
  );
}

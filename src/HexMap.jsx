import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { MISSIONS, ZONE_CONFIG, getActiveMissions } from './gameData';

const S = 38;
const R3 = Math.sqrt(3);
const COLS = 10;
const ROWS = 7;
const PAD = 40;
const TILT_ANGLE = 45; // Ângulo 3D
const PILLAR_DEPTH = 14; // Altura do bloco 3D

function hcenter(col, row) {
  return {
    x: col * S * 1.5 + S + PAD,
    y: row * S * R3 + (col % 2 ? S * R3 * 0.5 : 0) + S * R3 * 0.5 + PAD,
  };
}

function hpoints(cx, cy, r = S) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

const SVG_W = (COLS - 1) * S * 1.5 + S * 2 + PAD * 2;
const SVG_H = (ROWS - 1) * S * R3 + S * R3 + PAD * 2 + 10;

export default function HexMap({ completedIds = [], onSelect, organization }) {
  const [hovered, setHovered] = useState(null);

  // ── Zoom / Pan ─────────────────────────────────────────
  const [zoom, setZoom] = useState(1.2);
  const [pan, setPan]   = useState({ x: 0, y: 0 });
  const dragging  = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastPan   = useRef({ x: 0, y: 0 });
  const pinchDist = useRef(null);
  const containerRef = useRef(null);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoom(z => Math.max(0.4, Math.min(5, z * factor)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastPan.current = { ...pan };
  }, [pan]);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setPan({ x: lastPan.current.x + dx, y: lastPan.current.y + dy });
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      dragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPan.current = { ...pan };
    } else if (e.touches.length === 2) {
      dragging.current = false;
      pinchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, [pan]);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging.current) {
      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;
      setPan({ x: lastPan.current.x + dx, y: lastPan.current.y + dy });
    } else if (e.touches.length === 2 && pinchDist.current) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setZoom(z => Math.max(0.4, Math.min(5, z * (d / pinchDist.current))));
      pinchDist.current = d;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
    pinchDist.current = null;
  }, []);

  const handleHexClick = useCallback((mission) => {
    if (onSelect) onSelect(mission);
  }, [onSelect]);

  // ── Mágica dos Mundos (Filtragem Dinâmica) ──────────────
  const { hexes } = useMemo(() => {
    // 1. Pegar apenas missões ativas
    const activeMissions = getActiveMissions(organization);

    const mMap = {};
    for (const m of activeMissions) mMap[`${m.col},${m.row}`] = m;

    // 2. Recalcular as zonas (cores do chão) baseado apenas nas missões ativas!
    const zMap = {};
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const { x, y } = hcenter(c, r);
        let best = 'neutral', bestD = Infinity;
        for (const m of activeMissions) {
          const mc = hcenter(m.col, m.row);
          const d = Math.hypot(x - mc.x, y - mc.y);
          if (d < bestD) { bestD = d; best = m.zone; }
        }
        zMap[`${c},${r}`] = best;
      }
    }

    // 3. Montar o grid de hexágonos
    const list = [];
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const { x, y } = hcenter(c, r);
        const key = `${c},${r}`;
        const mission = mMap[key];
        const zone = zMap[key];
        const cfg = ZONE_CONFIG[zone] || ZONE_CONFIG.neutral;
        const completed = mission ? completedIds.includes(mission.id) : false;
        list.push({ c, r, x, y, key, mission, zone, cfg, completed });
      }
    }
    return { hexes: list };
  }, [completedIds, organization]);

  return (
    <div
      ref={containerRef}
      className="hexmap-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ cursor: dragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}
    >
      <div
        className="hexmap-inner"
        style={{
          transform: `perspective(1200px) rotateX(${TILT_ANGLE}deg) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="hexmap-svg">
          <defs>
            {['blue','teal','magenta','green','gold'].map(z => (
              <filter key={z} id={`gf-${z}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            ))}
            <filter id="gf-done" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <pattern id="tech-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect width={SVG_W} height={SVG_H} fill="url(#tech-grid)"/>

          {/* Hexes de fundo (Não-missões) */}
          {hexes.filter(h => !h.mission).map(h => (
            <g key={h.key}>
              <polygon
                points={hpoints(h.x, h.y + PILLAR_DEPTH, S - 2.5)}
                fill="#01040a"
                stroke={h.cfg.border} strokeOpacity="0.1" strokeWidth="0.5"
              />
              <polygon
                points={hpoints(h.x, h.y, S - 2.5)}
                fill={h.cfg.hex} fillOpacity="0.15"
                stroke={h.cfg.border} strokeOpacity="0.2" strokeWidth="0.8"
              />
            </g>
          ))}

          {/* Hexes de Missão (Pilares 3D) */}
          {hexes.filter(h => h.mission).map(h => {
            const isHov = hovered === h.key;
            const done = h.completed;
            const glowFilter = done ? 'url(#gf-done)' : `url(#gf-${h.zone})`;
            
            return (
              <g
                key={h.key}
                style={{ cursor: 'pointer' }}
                onClick={(e) => { e.stopPropagation(); handleHexClick(h.mission); }}
                onMouseEnter={() => setHovered(h.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <polygon
                  points={hpoints(h.x, h.y + PILLAR_DEPTH, S - 1)}
                  fill={done ? '#061b24' : '#020617'}
                  stroke={done ? '#00d4ff' : h.cfg.border}
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />

                <g filter={glowFilter}>
                  <polygon
                    points={hpoints(h.x, h.y, S + 3)}
                    fill="none"
                    stroke={done ? '#00d4ff' : h.cfg.glow}
                    strokeWidth={isHov ? 3 : 1.5}
                    strokeOpacity={isHov ? 1 : 0.4}
                    className={!done ? "hex-ring-pulse" : ""}
                  />
                  
                  <polygon
                    points={hpoints(h.x, h.y, S - 1)}
                    fill={done ? 'rgba(0, 212, 255, 0.15)' : h.cfg.hex}
                    fillOpacity={done ? 1 : isHov ? 0.95 : 0.8}
                    stroke={done ? '#00d4ff' : h.cfg.border}
                    strokeWidth={isHov ? 2.5 : done ? 2 : 1.5}
                  />

                  <g transform={`translate(${h.x}, ${h.y - 10})`}>
                    {done ? (
                      <path 
                        d="M-8,0 L-3,5 L9,-6" 
                        fill="none" 
                        stroke="#00d4ff" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    ) : (
                      <text
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={isHov ? "16" : "14"}
                        style={{ userSelect: 'none', transition: 'font-size 0.15s' }}
                      >
                        {h.mission.icon}
                      </text>
                    )}
                  </g>

                  <text x={h.x} y={h.y + 8} textAnchor="middle" dominantBaseline="middle"
                    fontSize="6.5" fill={done ? '#00d4ff' : h.cfg.border}
                    fontWeight="700" style={{ userSelect: 'none', letterSpacing: '0.5px' }}>
                    {h.mission.shortTitle.slice(0, 12)}
                  </text>
                  {h.mission.shortTitle.length > 12 && (
                    <text x={h.x} y={h.y + 17} textAnchor="middle" dominantBaseline="middle"
                      fontSize="6" fill={done ? '#00d4ff' : h.cfg.border} 
                      fontWeight="600" style={{ userSelect: 'none', letterSpacing: '0.5px' }}>
                      {h.mission.shortTitle.slice(12, 26)}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="zoom-controls">
        <button className="zoom-btn" onClick={() => setZoom(z => Math.min(5, z * 1.3))} title="Ampliar">＋</button>
        <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.4, z / 1.3))} title="Reduzir">－</button>
        <button className="zoom-btn zoom-reset" onClick={() => { setZoom(1.2); setPan({x:0,y:0}); }} title="Resetar">⊡</button>
      </div>
    </div>
  );
}

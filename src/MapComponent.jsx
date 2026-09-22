import React, { useEffect, useRef, useState, useMemo } from 'react';
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { TYPE_CONFIG, DETECTION_RADIUS_METERS, calcDistance } from './gameData';

// ── Estilo do Mapa — CARTO Dark Matter ───────────────────────────────────────
const MAP_STYLE = {
  version: 8,
  sources: {
    'carto-dark': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors © CARTO',
    },
  },
  layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark', minzoom: 0, maxzoom: 20 }],
};

// ── Avatar do Jogador — Missionário Pulsante ─────────────────────────────────
const PlayerAvatar = () => (
  <div className="player-avatar">
    <div className="player-pulse-ring" />
    <div className="player-pulse-ring delay-1" />
    <div className="player-bubble">👼</div>
  </div>
);

// ── Marcador de Local Sagrado ────────────────────────────────────────────────
const SacredMarker = ({ type, isNear, isCompleted }) => {
  const cfg = TYPE_CONFIG[type];
  return (
    <div
      className={`sacred-marker ${isNear ? 'near' : ''} ${isCompleted ? 'completed' : ''}`}
      style={{ '--marker-color': cfg.color, '--marker-glow': cfg.glowColor }}
    >
      {isCompleted && <div className="completed-badge">✓</div>}
      <div className="sacred-marker-inner">
        <span className="sacred-emoji">{cfg.emoji}</span>
      </div>
      {isNear && !isCompleted && <div className="mission-available-badge">!</div>}
    </div>
  );
};

// ── MapComponent ─────────────────────────────────────────────────────────────
const MapComponent = ({
  userLocation,
  locations,
  completedMissions,
  onLocationSelect,
  recenterSignal,
}) => {
  const mapRef = useRef();

  // ── Centraliza no usuário somente na 1ª localização OU quando sinal de recentrar ──
  const centeredOnce = useRef(false);

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;
    const map = mapRef.current.getMap();
    if (!map) return;

    const move = () => {
      try {
        map.easeTo({
          center: [userLocation.lon, userLocation.lat],
          zoom: 15.5,
          pitch: 60,
          duration: 1000,
        });
      } catch (e) { console.error(e); }
    };

    if (!centeredOnce.current) {
      centeredOnce.current = true;
      if (map.isStyleLoaded()) move();
      else map.once('load', move);
    }
  }, [userLocation]);

  // ── Recentrar quando o botão é pressionado ───────────────────────────────
  useEffect(() => {
    if (!recenterSignal || !userLocation || !mapRef.current) return;
    const map = mapRef.current.getMap();
    if (!map) return;
    try {
      map.easeTo({ center: [userLocation.lon, userLocation.lat], zoom: 15.5, pitch: 60, duration: 800 });
    } catch (e) { console.error(e); }
  }, [recenterSignal]); // eslint-disable-line

  // ── Detecta locais próximos ao jogador ───────────────────────────────────
  const nearbyIds = useMemo(() => {
    if (!userLocation) return new Set();
    return new Set(
      locations
        .filter(loc => calcDistance(userLocation.lat, userLocation.lon, loc.lat, loc.lon) <= DETECTION_RADIUS_METERS)
        .map(loc => loc.id)
    );
  }, [userLocation, locations]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -46.6333,
          latitude: -23.5505,
          zoom: 13,
          pitch: 45,
          bearing: 0,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapLib={maplibregl}
        maxPitch={85}
        dragPan
        scrollZoom
        touchZoomRotate
        doubleClickZoom
      >
        <NavigationControl position="top-right" showCompass={true} />

        {/* Avatar do jogador */}
        {userLocation && (
          <Marker longitude={userLocation.lon} latitude={userLocation.lat} anchor="center" style={{ zIndex: 100 }}>
            <PlayerAvatar />
          </Marker>
        )}

        {/* Raio de detecção */}
        {userLocation && (
          <Source
            id="radius-source"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [userLocation.lon, userLocation.lat] },
            }}
          >
            <Layer
              id="radius-fill"
              type="circle"
              paint={{
                'circle-radius': {
                  stops: [[0, 0], [20, metersToPixels(DETECTION_RADIUS_METERS, userLocation.lat, 20)]],
                  base: 2,
                },
                'circle-color': 'rgba(99, 179, 237, 0.07)',
                'circle-stroke-color': 'rgba(99, 179, 237, 0.35)',
                'circle-stroke-width': 1.5,
              }}
            />
          </Source>
        )}

        {/* Marcadores de locais sagrados */}
        {locations.map(loc => (
          <Marker
            key={loc.id}
            longitude={loc.lon}
            latitude={loc.lat}
            anchor="bottom"
            onClick={e => { e.originalEvent.stopPropagation(); onLocationSelect(loc); }}
          >
            <SacredMarker
              type={loc.type}
              isNear={nearbyIds.has(loc.id)}
              isCompleted={completedMissions.some(m => m.locationId === loc.id)}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

// Converte metros para pixels no zoom dado
function metersToPixels(meters, latitude, zoom) {
  const earthCircumference = 40075016.686;
  const latRad = latitude * Math.PI / 180;
  const metersPerPixel = (earthCircumference * Math.cos(latRad)) / (256 * Math.pow(2, zoom));
  return meters / metersPerPixel;
}

export default MapComponent;

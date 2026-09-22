// src/App.jsx — Meu Caminho do Convênio (Super App)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import HexMap from './HexMap';
import ProfileSetup from './ProfileSetup';
import PremiumDashboard from './PremiumDashboard';
import {
  MISSIONS,
  BUILDING_CONFIG,
  getLevelForXp,
  getNextLevel,
  getXpProgress,
  getActiveMissions,
} from './gameData';

const STORAGE_KEY = 'convenio_game_v3'; // Nova chave para o novo sistema
const TOTAL = MISSIONS.length;

function loadData() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (_) {}
  return { profile: null, xp: 0, completedIds: [] };
}
function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch (_) {}
}

// Componente: Construção holográfica 3D que cresce
function HoloBuilding({ buildingType, completedCount }) {
  const cfg = BUILDING_CONFIG[buildingType] || BUILDING_CONFIG.chapel;
  const floors = Math.max(1, Math.round((completedCount / TOTAL) * 8) + 1);
  const floorH = 22; 
  const towerH = floors * floorH;

  return (
    <div className="holo-building-scene">
      <div className="holo-beam-left" />
      <div className="holo-beam-right" />
      <div className="holo-tower-wrap">
        <div className="holo-spire" style={{ borderBottomColor: cfg.color }} />
        <div
          className="holo-tower-body"
          style={{
            height: towerH,
            borderColor: cfg.color,
            boxShadow: `0 0 20px ${cfg.color}, inset 0 0 20px rgba(0,212,255,0.15)`,
          }}
        >
          {Array.from({ length: floors }).map((_, fi) => (
            <div key={fi} className="holo-floor-row">
              {[0,1,2].map(wi => (
                <div
                  key={wi}
                  className="holo-window"
                  style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}`, animationDelay: `${(fi * 3 + wi) * 0.2}s` }}
                />
              ))}
            </div>
          ))}
          <div className="holo-scan" style={{ background: cfg.color }} />
        </div>
        <div className="holo-tower-base" style={{ borderColor: cfg.color }} />
      </div>
      <div className="holo-hex-platform" style={{ background: cfg.color }} />
      <div className="holo-building-label" style={{ color: cfg.color }}>{cfg.label}</div>
      {floors > 1 && (
        <div className="holo-floors-badge">{floors} andares · {completedCount} missões concluídas</div>
      )}
    </div>
  );
}

export default function App() {
  const [data, setData]         = useState(loadData);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase]       = useState(null);
  const [chosenIdx, setChosenIdx] = useState(null);
  const [xpToast, setXpToast]   = useState(null);
  const buildTimer = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => saveData(data), [data]);

  const activeMissions = data.profile ? getActiveMissions(data.profile.organization) : [];
  const TOTAL_ACTIVE = activeMissions.length || 1; // Proteção contra divisão por 0

  const level     = getLevelForXp(data.xp);
  const nextLevel = getNextLevel(data.xp);
  const totalPct  = Math.round((data.completedIds.length / TOTAL_ACTIVE) * 100);

  const handleSelect = useCallback((mission) => {
    setSelected(mission);
    setChosenIdx(null);
    setPhase('building');
    clearTimeout(buildTimer.current);
    buildTimer.current = setTimeout(() => setPhase('quiz'), 1800);
  }, []);

  const handleAnswer = useCallback((idx) => {
    if (phase !== 'quiz' || chosenIdx !== null) return;
    const correct = selected.quiz.options[idx].correct;
    setChosenIdx(idx);
    setTimeout(() => {
      setPhase(correct ? 'correct' : 'wrong');
      if (correct && !data.completedIds.includes(selected.id)) {
        const newData = {
          ...data,
          xp: data.xp + selected.xp,
          completedIds: [...data.completedIds, selected.id],
        };
        setData(newData);
        clearTimeout(toastTimer.current);
        setXpToast(`+${selected.xp} XP ✨`);
        toastTimer.current = setTimeout(() => setXpToast(null), 2400);
      }
    }, 700);
  }, [phase, chosenIdx, selected, data]);

  const handleClose = useCallback(() => {
    clearTimeout(buildTimer.current);
    setSelected(null);
    setPhase(null);
    setChosenIdx(null);
  }, []);

  const handleRetry = useCallback(() => {
    setPhase('quiz');
    setChosenIdx(null);
  }, []);

  // Se o usuário não tem perfil, renderiza a tela de Setup
  if (!data.profile) {
    return (
      <ProfileSetup
        onComplete={(newProfile) => {
          setData({ ...data, profile: newProfile });
        }}
      />
    );
  }

  // SEMPRE REDIRECIONAR PARA O DASHBOARD PREMIUM (O Jogo Antigo HexMap foi desativado)
  return (
    <PremiumDashboard 
      data={data} 
      updateData={setData} 
      onReset={() => { 
        localStorage.removeItem(STORAGE_KEY); 
        window.location.reload(); 
      }} 
    />
  );
}

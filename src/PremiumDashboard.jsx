import React, { useState } from 'react';
import './PremiumDashboard.css';
import { getQuestionsForProfile } from './gameContent';

export default function PremiumDashboard({ data, updateData, onReset }) {
  const [activeTab, setActiveTab] = useState('city'); 
  const [activeQuest, setActiveQuest] = useState(null);
  const [toast, setToast] = useState(null);
  const [isBuildOpen, setIsBuildOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
  // Novo Estado para o Quiz do Mapa
  const [activeCityQuiz, setActiveCityQuiz] = useState(null);
  const [quizPhase, setQuizPhase] = useState(null); // 'building', 'question', 'result'
  const [selectedOption, setSelectedOption] = useState(null);

  const treeLevel = data.tree?.level || 1;
  const treeWater = data.tree?.water || 0;
  const unlockedArmor = data.unlockedArmor || ['espada', 'escudo'];
  const completedQuests = data.completedQuests || [];
  const cityProgress = data.cityProgress || 0; 
  const completedCityNodes = data.completedCityNodes || [];

  const level = Math.floor(data.xp / 1000) + 1;
  
  const cityQuestions = getQuestionsForProfile(data.profile);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Função para regar a árvore (LIMITADA AO NÍVEL 7)
  const handleWaterTree = () => {
    if (treeLevel >= 7) {
      showToast("Sua árvore já atingiu a plenitude máxima! ✨🌳✨");
      return;
    }
    if (treeWater < 100) {
      let newWater = treeWater + 25;
      let newLevel = treeLevel;
      if (newWater >= 100) {
        newLevel += 1; newWater = 0;
        showToast(`A Árvore Cresceu para o Nível ${newLevel}! 🌳✨`);
      } else {
        showToast("Árvore Regada! +25% 💧");
      }
      updateData({ ...data, tree: { level: newLevel, water: newWater } });
    }
  };

  const handleBuildCity = () => {
    if (cityProgress >= 100) {
      updateData({ ...data, cityProgress: 0, xp: data.xp + 500 });
      showToast("Templo Concluído! +500 Azeite Bônus. Iniciando novo distrito! 🏙️✨");
      return;
    }
    if (data.xp >= 100) {
      updateData({ ...data, xp: data.xp - 100, cityProgress: Math.min(100, cityProgress + 10) });
      showToast("Construção Avançou! -100 Azeite 🏗️");
    } else {
      showToast("Azeite Insuficiente. Complete Missões! 💧");
    }
  };

  // ==========================================
  // LÓGICA DOS CRISTAIS (NOVO)
  // ==========================================
  const handleCrystalClick = (questionData) => {
    if (completedCityNodes.includes(questionData.id)) {
       showToast("Você já absorveu a luz desta revelação! ✨");
       return;
    }
    setActiveCityQuiz(questionData);
    setQuizPhase('building');
    
    // A Torre sobe rápido, em 1 segundo
    setTimeout(() => {
      setQuizPhase('question');
    }, 1000);
  };

  const handleAnswerCityQuiz = (optIndex) => {
    setSelectedOption(optIndex);
    const isCorrect = (activeCityQuiz.correct === optIndex);
    
    // Resposta mais rápida para não parecer que o jogo travou
    setTimeout(() => {
      if (isCorrect) {
        updateData({
          ...data,
          xp: data.xp + activeCityQuiz.xp,
          completedCityNodes: [...completedCityNodes, activeCityQuiz.id]
        });
        showToast(`Resposta Certa! +${activeCityQuiz.xp} Azeite 💧`);
      } else {
        showToast(`Incorreto. Estude mais e tente novamente depois.`);
      }
      
      // Fecha o quiz
      setActiveCityQuiz(null);
      setQuizPhase(null);
      setSelectedOption(null);
    }, 800);
  };


  const [proofState, setProofState] = useState({ uploaded: false, passedQuiz: false, selectedOption: null });

  const handleStartQuest = (quest) => {
    setActiveQuest(quest);
    setProofState({ uploaded: false, passedQuiz: false, selectedOption: null });
  };

  const handleCompleteQuest = () => {
    if (!activeQuest) return;
    
    // Verificações Anti-Trapaça
    if (activeQuest.proofType === 'quiz' && !proofState.passedQuiz) {
       showToast("Responda a pergunta do estudo corretamente primeiro! 📖");
       return;
    }
    if (activeQuest.proofType === 'upload' && !proofState.uploaded) {
       showToast("Envie a foto ou print para comprovar a missão! 📷");
       return;
    }

    const newUnlockedArmor = [...unlockedArmor];
    if (activeQuest.unlocks && !newUnlockedArmor.includes(activeQuest.unlocks)) {
      newUnlockedArmor.push(activeQuest.unlocks);
    }
    updateData({ ...data, xp: data.xp + activeQuest.xp, unlockedArmor: newUnlockedArmor, completedQuests: [...completedQuests, activeQuest.id] });
    showToast(`Missão Concluída com Sucesso! +${activeQuest.xp} Azeite ✨`);
    setActiveQuest(null);
  };

  // Missões dinâmicas (Crianças não têm missões de upload difíceis)
  const isCriança = data.profile.organization === 'Primária';
  
  const DASH_QUESTS = isCriança ? [
    { 
      id: 'q1', icon: '📖', title: 'Ler as Escrituras', desc: 'Leia uma história do Livro de Mórmon com seus pais.', xp: 300, 
      unlocks: 'cinto', unlockName: 'Cinto da Verdade', proofType: 'quiz', 
      quiz: { q: 'Néfi era um bom exemplo de...', options: ['Preguiça', 'Obediência', 'Desobediência', 'Tristeza'], correct: 1 } 
    },
    { id: 'q2', icon: '🎨', title: 'Desenho Especial', desc: 'Faça um desenho sobre a Criação do Mundo.', xp: 200, unlocks: 'calcados', unlockName: 'Calçados da Paz', proofType: 'quiz', quiz: { q: 'Quem criou a Terra sob a direção do Pai Celestial?', options: ['Adão', 'Jesus Cristo', 'Moisés', 'Noé'], correct: 1 } },
    { id: 'q3', icon: '🙏', title: 'Oração', desc: 'Faça sua oração pessoal antes de dormir.', xp: 200, unlocks: 'capacete', unlockName: 'Capacete da Salvação', proofType: 'quiz', quiz: { q: 'Para quem oramos?', options: ['Para os anjos', 'Para o Pai Celestial', 'Para o Profeta', 'Para nossos pais'], correct: 1 } }
  ] : [
    { 
      id: 'q1', icon: '📖', title: 'Estudo Profundo', desc: 'Leia o discurso "Pensar Celestialmente" do Pres. Nelson.', xp: 500, 
      unlocks: 'cinto', unlockName: 'Cinto da Verdade',
      proofType: 'quiz', 
      quiz: { 
        q: 'O que o Presidente Nelson pediu que fizéssemos ao enfrentar um dilema ou tentação?', 
        options: ['Ignorar o problema', 'Pensar Celestialmente', 'Reclamar com os líderes', 'Desistir'], 
        correct: 1 
      } 
    },
    { id: 'q2', icon: '🤝', title: 'Trabalho de Ministração', desc: 'Visite a família que você ministra.', xp: 300, unlocks: 'calcados', unlockName: 'Calçados da Paz', proofType: 'upload', uploadLabel: 'Envie um print da conversa do WhatsApp com a família ou foto da visita.' },
    { id: 'q3', icon: '🏛️', title: 'Indexação no FamilySearch', desc: 'Faça 1 lote de indexação.', xp: 1000, unlocks: 'capacete', unlockName: 'Capacete da Salvação', proofType: 'upload', uploadLabel: 'Envie um print da tela do FamilySearch mostrando o lote concluído.' },
    { id: 'q4', icon: '🧹', title: 'Limpar a Capela', desc: 'Participe da limpeza do seu edifício de reuniões.', xp: 1500, unlocks: 'espada', unlockName: 'Espada do Espírito', proofType: 'upload', uploadLabel: 'Tire uma selfie ou foto da equipe limpando a capela. A IA validará a imagem.' }
  ];

  const handleQuestQuizAnswer = (optIndex) => {
    setProofState({ ...proofState, selectedOption: optIndex });
    if (activeQuest.quiz.correct === optIndex) {
      setProofState({ ...proofState, passedQuiz: true, selectedOption: optIndex });
      showToast("Correto! Estudo comprovado. ✅");
    } else {
      setProofState({ ...proofState, passedQuiz: false, selectedOption: optIndex });
      showToast("Errado. Volte, estude o discurso novamente e tente depois.");
    }
  };

  return (
    <div className="premium-dash-container">
      {toast && <div className="dash-toast">{toast}</div>}

      <aside className="dash-sidebar" style={{zIndex: 100}}>
        <div className="avatar-section">
          <div className="avatar-circle"><img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${data.profile.name}&backgroundColor=030a14`} alt="Avatar" /></div>
          <h2 className="avatar-name">{data.profile.name}</h2>
          <div className="avatar-org">{data.profile.organization}</div>
          <div className="avatar-org" style={{color: '#f59e0b', fontSize: '0.75rem', marginTop: '5px'}}>{data.profile.memberType === 'antigo' ? 'Membro Antigo' : 'Pesquisador/Novo'}</div>
          <div className="level-badge mt-10">Nível {level}</div>
        </div>

        <nav className="dash-nav">
          <button className={`nav-btn ${activeTab === 'city' ? 'active' : ''}`} onClick={() => setActiveTab('city')}>🏰 Reino Celestial</button>
          <button className={`nav-btn ${activeTab === 'armor' ? 'active' : ''}`} onClick={() => setActiveTab('armor')}>🛡️ Arsenal Espiritual</button>
          <button className={`nav-btn ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}>📜 Diário de Missões</button>
          <button className={`nav-btn ${activeTab === 'tree' ? 'active' : ''}`} onClick={() => setActiveTab('tree')}>🌳 Árvore da Vida</button>
          
          <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
            <button className="nav-btn" style={{width: '100%', color: '#ef4444', borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.1)'}} onClick={onReset}>
              🚪 Trocar de Perfil
            </button>
          </div>
        </nav>

        <div className="resources-section mt-auto">
          <div className="resource-item"><span className="res-icon">💧</span><div className="res-info"><span className="res-label">Azeite (Fé)</span><span className="res-value">{data.xp} pts</span></div></div>
        </div>
      </aside>

      <main className={`dash-main-content ${activeTab === 'city' ? 'no-padding' : ''}`} style={{position: 'relative'}}>
        
        {activeTab === 'city' && (() => {
          // O usuário quer a estrutura de "castelo/jardim" 3D isométrica, mas que O CASTELO EM SI seja o Templo!
          // Usaremos as artes 3D isométricas personalizadas que acabamos de gerar para os templos reais!
          // Usando import.meta.env.BASE_URL para as imagens não quebrarem (fundo preto) quando mudamos o vite.config
          let bgImage = `url('${import.meta.env.BASE_URL}bg_templo.jpg')`; 
          let eraTitle = "Sião (Nível Máximo)";
          
          if (level < 5) {
            if (data.profile.memberType === 'novo') {
              bgImage = `url('${import.meta.env.BASE_URL}bg_kirtland_iso.jpg')`; 
              eraTitle = "Época da Restauração (Kirtland, 1830s)";
            } else {
              bgImage = `url('${import.meta.env.BASE_URL}bg_sp_iso.jpg')`; 
              eraTitle = "Templo Moderno (São Paulo)";
            }
          }

          // EVENTO MUNDIAL ALEATÓRIO (Rumores de Guerra, Frio, Calor) - Sistema de RPG
          const worldEvents = [
            "❄️ Evento Global: Inverno Rigoroso. Aqueça os membros com serviço.",
            "⚔️ Rumores de Guerra no oriente. Busque paz nas escrituras.",
            "☀️ Calor extremo e Seca. Necessidade de Jejum e Oração pela chuva.",
            "🌍 Terremotos em vários lugares. Mantenha seu kit de emergência em dia."
          ];
          const currentEvent = worldEvents[Math.floor((data.xp / 500)) % worldEvents.length];

          return (
            <div className="tab-fade-in city-builder-tab" style={{ position: 'relative' }}>
              
              {/* FUNDO DA CIDADE (CENÁRIO 3D ISOMÉTRICO DO TEMPLO REAL) */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center', 
                zIndex: 0
              }}></div>
              
              {/* BANNER DE EVENTO GLOBAL DA SEGUNDA VINDA */}
              <div style={{position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(239, 68, 68, 0.85)', color: 'white', textAlign: 'center', padding: '8px', zIndex: 6, fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '1px'}}>
                {currentEvent}
              </div>

              {/* TÍTULO DA ERA */}
              <div style={{position: 'absolute', top: '45px', width: '100%', textAlign: 'center', zIndex: 5, pointerEvents: 'none'}}>
                <h2 style={{margin: 0, color: '#fff', textShadow: '0 0 10px rgba(0,212,255,0.8), 0 2px 5px #000', fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', display: 'inline-block', padding: '5px 20px', borderRadius: '20px'}}>
                  {eraTitle}
                </h2>
              </div>

              {/* OVERLAY SOBRE OS DADOS (Agora visível em todos os níveis e adaptado com glassmorphism) */}
              {isStatsOpen && (
                <div className="real-stats-overlay scale-in" style={{
                   position: 'absolute', top: '15%', left: '2%', width: '25%', height: '45%',
                   background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '15px', zIndex: 15,
                   display: 'flex', flexDirection: 'column', gap: '10px',
                   border: '2px solid rgba(0, 212, 255, 0.3)', boxShadow: '0 10px 25px rgba(0,0,0,0.8)'
                }}>
                   <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <h3 style={{color: '#fff', fontSize: '1.1rem', margin: 0}}>Seu Progresso</h3>
                      <button onClick={() => setIsStatsOpen(false)} style={{background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem'}}>✖</button>
                   </div>
                   <div style={{background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.7), rgba(3, 105, 161, 0.7))', padding: '12px', borderRadius: '8px', color: 'white'}}>
                      <div style={{fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase'}}>Azeite (Pontos de Fé)</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>💧 {data.xp}</div>
                   </div>
                   <div style={{background: 'linear-gradient(90deg, rgba(202, 138, 4, 0.7), rgba(161, 98, 7, 0.7))', padding: '12px', borderRadius: '8px', color: 'white'}}>
                      <div style={{fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase'}}>Nível de Luz</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>✨ Nível {level}</div>
                   </div>
                   <div style={{background: 'linear-gradient(90deg, rgba(71, 85, 105, 0.7), rgba(51, 65, 85, 0.7))', padding: '12px', borderRadius: '8px', color: 'white'}}>
                      <div style={{fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase'}}>Revelações Alcançadas</div>
                      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>📜 {completedCityNodes.length} de {cityQuestions.length}</div>
                   </div>
                </div>
              )}

              {/* HOTSPOTS GLOBAIS - ATIVADOS EM QUALQUER NÍVEL AGORA */}
              <div style={{position: 'absolute', top: '15%', left: '2%', width: '20%', height: '40%', cursor: 'pointer', zIndex: 10}} onClick={() => setIsStatsOpen(!isStatsOpen)}></div>
              <div style={{position: 'absolute', top: '2%', right: '2%', width: '15%', height: '10%', cursor: 'pointer', zIndex: 10}} onClick={() => showToast("⚙️ Configurações em breve.")}></div>
              <div style={{position: 'absolute', bottom: '2%', left: '2%', width: '15%', height: '15%', cursor: 'pointer', zIndex: 10}} onClick={() => setIsBuildOpen(!isBuildOpen)}></div>
              
              {/* Ocultando hotspots vazios nas fotos reais se não for nivel 5, pois não fazem sentido na foto do Kirtland/SP */}
              {level >= 5 && (
                <>
                  <div style={{position: 'absolute', bottom: '2%', left: '18%', width: '40%', height: '15%', cursor: 'pointer', zIndex: 10}} onClick={() => showToast("🏢 Em breve!")}></div>
                  <div style={{position: 'absolute', bottom: '2%', right: '2%', width: '35%', height: '12%', cursor: 'pointer', zIndex: 10}} onClick={() => showToast("👥 Em breve!")}></div>
                  <div style={{position: 'absolute', top: '29%', right: '2%', width: '10%', height: '12%', cursor: 'pointer', zIndex: 20}} onClick={() => setIsBuildOpen(!isBuildOpen)}></div>
                  <div style={{position: 'absolute', top: '42%', right: '2%', width: '10%', height: '12%', cursor: 'pointer', zIndex: 20}} onClick={() => showToast("Pesquisa bloqueada!")}></div>
                  <div style={{position: 'absolute', top: '55%', right: '2%', width: '10%', height: '12%', cursor: 'pointer', zIndex: 20}} onClick={() => showToast("Decorações bloqueadas.")}></div>
                </>
              )}

            {/* CRISTAIS INTERATIVOS NO MAPA */}
            {cityQuestions.map((q, index) => {
               const positions = [
                 { top: '65%', left: '30%' },
                 { top: '75%', left: '50%' },
                 { top: '60%', left: '75%' },
                 { top: '40%', left: '70%' },
               ];
               const pos = positions[index % positions.length];
               const isDone = completedCityNodes.includes(q.id);

               return (
                 <div 
                   key={q.id} 
                   className={`map-crystal ${isDone ? 'crystal-done' : 'crystal-pulse'}`}
                   style={{...pos, zIndex: 15}}
                   onClick={() => handleCrystalClick(q)}
                 >
                   <div className="crystal-core">♦️</div>
                   <div className="crystal-label">{q.title}</div>
                 </div>
               );
            })}

            {/* PAINEL DE CONSTRUÇÃO (AGORA ABRE E FECHA PELO BOTÃO DA IMAGEM) */}
            {isBuildOpen && (
              <div className="city-panel main-build-panel scale-in" style={{
                 position: 'absolute', top: '25%', right: '14%', zIndex: 30, width: '380px',
                 boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                   <h3 style={{margin: 0, border: 'none', padding: 0}}>🏗️ Menu de Construção</h3>
                   <button onClick={() => setIsBuildOpen(false)} style={{background: 'transparent', border: 'none', color: '#ef4444', fontSize: '1.5rem', cursor: 'pointer', padding: '0 5px'}}>✖</button>
                </div>
                
                <div style={{marginBottom: '20px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                     <span style={{color: '#94a3b8'}}>Templo Principal</span>
                     <strong style={{color: '#f59e0b'}}>{cityProgress}%</strong>
                  </div>
                  <div className="water-bar-bg city-progress-bg" style={{height: '20px'}}><div className="water-bar-fill city-progress-fill" style={{ width: `${cityProgress}%` }}></div></div>
                </div>
                
                <button className="setup-btn glow-btn city-btn" onClick={handleBuildCity} disabled={cityProgress >= 100} style={{width: '100%', padding: '15px', fontSize: '1.1rem'}}>
                  {cityProgress >= 100 ? '✨ Templo Finalizado ✨' : 'Construir (-100 Azeite)'}
                </button>
              </div>
            )}

            {/* RPG HUD OVERLAY - BARRAS LATERAIS E INFERIORES */}
            <div style={{position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px', zIndex: 20}}>
              {[
                {icon: '👥', label: 'Cidadãos'},
                {icon: '🏆', label: 'Eventos'},
                {icon: '🛒', label: 'Mercado'},
                {icon: '🎒', label: 'Inventário'}
              ].map(btn => (
                <button key={btn.label} onClick={() => showToast(`🚧 Sistema de ${btn.label} está em desenvolvimento pela IA!`)} style={{
                  background: 'linear-gradient(180deg, #1e293b, #0f172a)', border: '2px solid #334155', borderRadius: '12px', padding: '10px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', width: '80px'
                }}>
                  <span style={{fontSize: '1.5rem'}}>{btn.icon}</span>
                  <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>{btn.label}</span>
                </button>
              ))}
            </div>

            <div style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 20}}>
              {[
                {icon: '🔨', label: 'Construir', action: () => setIsBuildOpen(true)},
                {icon: '📜', label: 'Pesquisa', action: () => showToast("🚧 Pesquisa de Doutrina em breve!")},
                {icon: '🌳', label: 'Decorar', action: () => showToast("🚧 Sistema de Decoração em breve!")}
              ].map(btn => (
                <button key={btn.label} onClick={btn.action} style={{
                  background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', border: '2px solid #60a5fa', borderRadius: '12px', padding: '10px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', width: '80px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                }}>
                  <span style={{fontSize: '1.5rem'}}>{btn.icon}</span>
                  <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
          );
        })()}

        {/* ========================================= */}
        {/* OVERLAY DO QUIZ 3D SOBRE A CIDADE         */}
        {/* ========================================= */}
        {activeCityQuiz && (
          <div className="dash-modal-overlay" style={{zIndex: 9999}}>
            
            {/* FASE 1: Animação da Torre subindo igual antes */}
            {quizPhase === 'building' && (
               <div className="holo-building scale-in">
                 <div className="holo-icon">🗼</div>
                 <div className="holo-title pulse-text">Acessando Arquivos Sagrados...</div>
               </div>
            )}

            {/* FASE 2: O Quiz Profundo */}
            {quizPhase === 'question' && (
               <div className="dash-modal scale-in" style={{textAlign: 'left'}}>
                 <h2 style={{color: '#00d4ff', borderBottom: '1px solid #00d4ff', paddingBottom: '10px'}}>{activeCityQuiz.title}</h2>
                 <p style={{fontSize: '1.2rem', marginTop: '20px', color: '#fff'}}>{activeCityQuiz.q}</p>
                 
                 <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px'}}>
                   {activeCityQuiz.options.map((optText, i) => {
                      let btnClass = "setup-btn";
                      if (selectedOption === i) {
                        btnClass += (i === activeCityQuiz.correct) ? " btn-correct" : " btn-wrong";
                      }
                      return (
                        <button 
                          key={i} 
                          className={btnClass} 
                          style={{textAlign: 'left', textTransform: 'none', background: 'rgba(15,23,42,0.8)'}}
                          onClick={() => selectedOption === null && handleAnswerCityQuiz(i)}
                        >
                          {String.fromCharCode(65 + i)}) {optText}
                        </button>
                      )
                   })}
                 </div>
               </div>
            )}
          </div>
        )}

        {/* AS OUTRAS ABAS CONTINUAM AQUI EMBAIXO... */}
        {activeTab === 'armor' && (
          <div className="tab-fade-in padding-content">
             <header className="dash-header">
                <h1>A Armadura de Deus</h1>
                <p>Equipe-se com proteção espiritual completando missões da vida real.</p>
             </header>

             <div className="rpg-armory-container" style={{display: 'flex', gap: '20px', background: 'rgba(15, 23, 42, 0.9)', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>
               {/* Centro - Personagem */}
               <div style={{flex: 1, border: '1px solid #334155', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)', padding: '30px 10px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'}}>
                 <div style={{fontSize: '5rem', filter: 'drop-shadow(0 0 20px #00d4ff)', marginBottom: '10px'}}>👤</div>
                 <h3 style={{color: '#00d4ff', margin: '10px 0 5px 0'}}>Guerreiro de Sião</h3>
                 <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>Nível {level} • Luz: {data.xp}</div>
                 
                 <div style={{marginTop: '20px', width: '90%', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px'}}>
                      <span style={{color: '#cbd5e1'}}>Defesa Espiritual</span><span style={{color: '#34d399'}}>{unlockedArmor.length * 15 + 10}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                      <span style={{color: '#cbd5e1'}}>Poder de Influência</span><span style={{color: '#f59e0b'}}>{unlockedArmor.length * 5 + 5}</span>
                    </div>
                 </div>
               </div>

               {/* Grid de Slots Direita */}
               <div style={{flex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                 {[
                   { id: 'capacete', name: 'Capacete da Salvação', icon: '🪖', slot: 'Cabeça' },
                   { id: 'couraca', name: 'Couraça da Justiça', icon: '🛡️', slot: 'Peito' },
                   { id: 'espada', name: 'Espada do Espírito', icon: '⚔️', slot: 'Mão Principal' },
                   { id: 'escudo', name: 'Escudo da Fé', icon: '🧿', slot: 'Mão Secundária' },
                   { id: 'cinto', name: 'Cinto da Verdade', icon: '🎗️', slot: 'Cintura' },
                   { id: 'calcados', name: 'Calçados da Paz', icon: '🥾', slot: 'Pés' }
                 ].map(p => {
                    const has = unlockedArmor.includes(p.id) || p.id === 'espada';
                    return (
                      <div key={p.id} style={{
                        background: has ? 'rgba(2, 132, 199, 0.15)' : 'rgba(15, 23, 42, 0.8)',
                        border: has ? '1px solid #0284c7' : '1px solid #334155',
                        padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '15px',
                        opacity: has ? 1 : 0.6,
                        boxShadow: has ? 'inset 0 0 10px rgba(2, 132, 199, 0.2)' : 'none',
                        transition: 'all 0.3s'
                      }}>
                         <div style={{
                           fontSize: '2rem', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '8px',
                           boxShadow: has ? '0 0 15px rgba(2, 132, 199, 0.5)' : 'none',
                           border: has ? '1px solid rgba(2, 132, 199, 0.5)' : '1px solid transparent'
                         }}>
                           {p.icon}
                         </div>
                         <div>
                           <div style={{fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px'}}>{p.slot}</div>
                           <div style={{color: has ? '#e0f2fe' : '#64748b', fontWeight: 'bold', fontSize: '1rem', margin: '2px 0'}}>{p.name}</div>
                           <div style={{fontSize: '0.8rem', color: has ? '#34d399' : '#ef4444'}}>{has ? 'Equipado' : 'Bloqueado'}</div>
                         </div>
                      </div>
                    )
                 })}
               </div>
             </div>
          </div>
        )}
        
        {activeTab === 'quests' && (
          <div className="tab-fade-in padding-content">
            <header className="dash-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h1>Missões da Vida Real</h1>
                <p>Traga o evangelho para a prática diária e ganhe azeite.</p>
              </div>
              <button 
                className="setup-btn glow-btn" 
                style={{padding: '10px 20px', fontSize: '0.9rem'}}
                onClick={() => {
                  updateData({...data, completedQuests: []});
                  showToast("Missões renovadas! 🌅");
                }}
              >
                🔄 Novo Dia (Renovar)
              </button>
            </header>
            <div className="quest-list">
              {DASH_QUESTS.map(q => {
                const isCompleted = completedQuests.includes(q.id);
                return (
                  <div key={q.id} className={`quest-item ${isCompleted ? 'completed' : ''}`}>
                    <div className="quest-icon">{q.icon}</div>
                    <div className="quest-details">
                      <h4>{q.title}</h4><p>{q.desc}</p>
                      <div className="quest-reward">+{q.xp} Azeite {q.unlockName && `| Desbloqueia: ${q.unlockName}`}</div>
                    </div>
                    {isCompleted ? (
                      <button className="start-quest-btn done" disabled>Concluída ✅</button>
                    ) : (
                      <button className="start-quest-btn" onClick={() => handleStartQuest(q)}>Fazer Missão</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'tree' && (
          <div className="tab-fade-in tree-tab-container padding-content">
            <div className="tree-visual-container">
              <div className="tree-emoji">🌳</div>
            </div>
          </div>
        )}

        {/* MODAL DE MISSÃO (SISTEMA ANTI-TRAPAÇA) */}
        {activeQuest && (
          <div className="dash-modal-overlay" style={{zIndex: 9999}}>
            <div className="dash-modal scale-in">
              <span className="dash-modal-icon" style={{fontSize: '3rem'}}>{activeQuest.icon}</span>
              <h2 style={{color: '#00d4ff', margin: '10px 0'}}>{activeQuest.title}</h2>
              <p style={{fontSize: '1.1rem'}}>{activeQuest.desc}</p>
              
              {/* ÁREA DE COMPROVAÇÃO DE MISSÃO */}
              {activeQuest.proofType === 'quiz' && !proofState.passedQuiz && (
                 <div style={{background: 'rgba(2, 132, 199, 0.2)', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #0284c7', textAlign: 'left'}}>
                   <h4 style={{margin: '0 0 10px 0', color: '#38bdf8'}}>📝 Validação de Leitura</h4>
                   <p style={{marginBottom: '10px'}}>{activeQuest.quiz.q}</p>
                   <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                     {activeQuest.quiz.options.map((opt, i) => (
                       <button key={i} className="setup-btn" style={{textAlign: 'left', background: proofState.selectedOption === i ? '#ef4444' : 'rgba(15,23,42,0.8)', textTransform: 'none'}} onClick={() => handleQuestQuizAnswer(i)}>
                         {opt}
                       </button>
                     ))}
                   </div>
                 </div>
              )}
              {activeQuest.proofType === 'quiz' && proofState.passedQuiz && (
                 <div style={{background: 'rgba(16, 185, 129, 0.2)', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #10b981'}}>
                   <h4 style={{margin: 0, color: '#34d399'}}>✅ Leitura Comprovada!</h4>
                 </div>
              )}

              {activeQuest.proofType === 'upload' && (
                 <div style={{background: 'rgba(245, 158, 11, 0.2)', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #f59e0b'}}>
                   <h4 style={{margin: '0 0 10px 0', color: '#fbbf24'}}>📷 Envio de Comprovante</h4>
                   <p style={{fontSize: '0.9rem', marginBottom: '10px'}}>{activeQuest.uploadLabel}</p>
                   <input 
                     type="file" 
                     className="setup-input" 
                     style={{width: '100%'}}
                     onChange={() => setProofState({...proofState, uploaded: true})}
                   />
                   {proofState.uploaded && <p style={{color: '#34d399', margin: '10px 0 0 0'}}>✅ Arquivo recebido!</p>}
                 </div>
              )}

              <div className="dash-modal-rewards" style={{background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '10px', marginTop: '20px', border: '1px solid #334155'}}>
                <strong>Recompensas:</strong><br/>
                <span style={{color: '#0ea5e9'}}>+{activeQuest.xp} Azeite</span><br/>
                {activeQuest.unlockName && <span style={{color: '#f59e0b'}}>Desbloqueio: {activeQuest.unlockName}</span>}
              </div>
              
              <div className="dash-modal-actions" style={{display: 'flex', gap: '15px', marginTop: '25px'}}>
                <button 
                  className={`setup-btn glow-btn ${((activeQuest.proofType === 'quiz' && !proofState.passedQuiz) || (activeQuest.proofType === 'upload' && !proofState.uploaded)) ? 'disabled' : ''}`}
                  onClick={handleCompleteQuest} 
                  style={{flex: 1}}
                >
                  ✅ Concluir
                </button>
                <button className="setup-btn" onClick={() => setActiveQuest(null)} style={{flex: 1, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444'}}>Voltar</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

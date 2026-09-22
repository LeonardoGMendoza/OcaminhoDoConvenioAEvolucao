import React, { useState } from 'react';
import './App.css';

export default function ProfileSetup({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', age: '', gender: '' });

  const handleNext = () => setStep((s) => s + 1);

  const determineOrganization = () => {
    const age = parseInt(profile.age);
    const g = profile.gender;
    if (age <= 11) return { name: 'Primária', theme: 'color-primary' };
    if (age <= 17 && g === 'M') return { name: 'Sacerdócio Aarônico', theme: 'color-youth' };
    if (age <= 17 && g === 'F') return { name: 'Moças', theme: 'color-youth' };
    if (age <= 30) return { name: 'Jovens Adultos (JAS)', theme: 'color-ysa' };
    if (g === 'M') return { name: 'Quórum de Élderes', theme: 'color-adult' };
    if (g === 'F') return { name: 'Sociedade de Socorro', theme: 'color-adult' };
    return { name: 'Membro', theme: 'color-adult' };
  };

  const handleFinish = () => {
    const org = determineOrganization();
    onComplete({ ...profile, organization: org.name, theme: org.theme });
  };

  return (
    <div className="setup-container">
      {step === 0 && (
        <div className="setup-step fade-in">
          <div className="epic-title">O Tempo Está Chegando</div>
          <p className="epic-text">
            Os sinais estão se cumprindo. O Salvador nos convidou a estarmos preparados e a termos azeite em nossas lâmpadas.
          </p>
          <button className="setup-btn glow-btn" onClick={handleNext}>ESTOU PRONTO</button>
        </div>
      )}

      {step === 1 && (
        <div className="setup-step fade-in">
          <h2 className="setup-title">Como devemos te chamar?</h2>
          <input className="setup-input" type="text" placeholder="Seu nome" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <button className="setup-btn" disabled={!profile.name.trim()} onClick={handleNext}>CONTINUAR</button>
        </div>
      )}

      {step === 2 && (
        <div className="setup-step fade-in">
          <h2 className="setup-title">Qual a sua idade?</h2>
          <p className="setup-subtitle">Isso definirá o seu Mundo na jornada.</p>
          <input className="setup-input text-center" type="number" placeholder="Ex: 25" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
          <button className="setup-btn" disabled={!profile.age || parseInt(profile.age) < 1} onClick={handleNext}>CONTINUAR</button>
        </div>
      )}

      {step === 3 && (
        <div className="setup-step fade-in">
          <h2 className="setup-title">Como você se identifica?</h2>
          <div className="gender-options">
            <button className={`gender-btn ${profile.gender === 'F' ? 'selected' : ''}`} onClick={() => setProfile({ ...profile, gender: 'F' })}>👩 Irmã</button>
            <button className={`gender-btn ${profile.gender === 'M' ? 'selected' : ''}`} onClick={() => setProfile({ ...profile, gender: 'M' })}>👨 Irmão</button>
          </div>
          <button className="setup-btn mt-20" disabled={!profile.gender} onClick={handleNext}>CONTINUAR</button>
        </div>
      )}

      {step === 4 && (
        <div className="setup-step fade-in">
          <h2 className="setup-title">Qual o seu tempo de Igreja?</h2>
          <p className="setup-subtitle">Isso ajustará o nível das perguntas e desafios.</p>
          <div className="gender-options" style={{ flexDirection: 'column' }}>
            <button className={`gender-btn ${profile.memberType === 'novo' ? 'selected' : ''}`} onClick={() => setProfile({ ...profile, memberType: 'novo' })}>
              🌱 Pesquisador / Novo Converso
            </button>
            <button className={`gender-btn ${profile.memberType === 'antigo' ? 'selected' : ''}`} onClick={() => setProfile({ ...profile, memberType: 'antigo' })}>
              📖 Membro Antigo (Experiente)
            </button>
          </div>
          <button className="setup-btn mt-20" disabled={!profile.memberType} onClick={handleNext}>DESCOBRIR MEU MUNDO</button>
        </div>
      )}

      {step === 5 && (
        <div className="setup-step fade-in scale-in">
          <h3 className="setup-subtitle">Bem-vindo(a) ao mundo da(o)</h3>
          <h1 className="epic-title org-title">{determineOrganization().name}</h1>
          <p className="epic-text mb-30">
            {profile.name}, sua jornada sagrada junto com seus irmãos e irmãs está prestes a começar. Junte azeite, equipe sua armadura e prepare-se!
          </p>
          <button className="setup-btn glow-btn" onClick={handleFinish}>ENTRAR NO MUNDO</button>
        </div>
      )}
    </div>
  );
}

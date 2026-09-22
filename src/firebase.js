// ──────────────────────────────────────────────────────────────────────────────
// firebase.js — Configuração Firebase para "Meu Caminho do Convênio"
// Projeto: meucaminhoaonvenio
//
// ⚠️  SUBSTITUA os valores abaixo pelos do seu projeto Firebase:
//      Firebase Console → ⚙️ Configurações → Geral → Seus Apps → Web → SDK
// ──────────────────────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            "COLE_AQUI_SUA_API_KEY",
  authDomain:        "meucaminhoaonvenio.firebaseapp.com",
  projectId:         "meucaminhoaonvenio",
  storageBucket:     "meucaminhoaonvenio.firebasestorage.app",
  messagingSenderId: "COLE_AQUI_O_MESSAGING_SENDER_ID",
  appId:             "COLE_AQUI_O_APP_ID",
};

const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);

// ── Auth anônimo ─────────────────────────────────────────────────────────────
export function initAuth(onUser) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onUser(user);
    } else {
      signInAnonymously(auth).catch(console.error);
    }
  });
}

// ── Salvar progresso do usuário ──────────────────────────────────────────────
export async function saveProgress(userId, data) {
  try {
    await setDoc(doc(db, 'players', userId), data, { merge: true });
  } catch (e) {
    console.warn('Firebase offline — salvando no localStorage', e);
    localStorage.setItem('convenio_progress', JSON.stringify(data));
  }
}

// ── Carregar progresso do usuário ────────────────────────────────────────────
export async function loadProgress(userId) {
  try {
    const snap = await getDoc(doc(db, 'players', userId));
    if (snap.exists()) return snap.data();
  } catch (e) {
    console.warn('Firebase offline — carregando do localStorage', e);
  }
  // fallback localStorage
  const local = localStorage.getItem('convenio_progress');
  return local ? JSON.parse(local) : null;
}

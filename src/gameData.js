// src/gameData.js — Meu Caminho do Convênio
// 21 tópicos oficiais: churchofjesuschrist.org/my-covenant-path

export const MISSIONS = [
  {
    id: 'intro', col: 1, row: 5,
    icon: '⭐', shortTitle: 'Início',
    title: 'Meu Caminho do Convênio',
    zone: 'blue', building: 'chapel', xp: 50,
    description: 'O guia "Meu Caminho do Convênio" ajuda líderes, missionários e membros a apoiar novos conversos em sua jornada espiritual após o batismo.',
    quiz: {
      question: 'O que é o guia "Meu Caminho do Convênio"?',
      options: [
        { text: 'Um recurso para novos membros progredirem no evangelho após o batismo', correct: true },
        { text: 'Um livro de histórias bíblicas para crianças da Igreja', correct: false },
        { text: 'Um manual exclusivo para missionários em campo', correct: false },
        { text: 'Um programa de atividades culturais da Igreja', correct: false },
      ],
    },
  },
  {
    id: 'amizades', col: 0, row: 4,
    icon: '🤝', shortTitle: 'Amizades',
    title: 'Fazer amizades com os membros de sua ala',
    zone: 'blue', building: 'chapel', xp: 80,
    description: 'Criar amizades genuínas na ala ajuda novos conversos a se sentirem parte da família da Igreja e a permanecerem fiéis.',
    quiz: {
      question: 'Por que é importante fazer amizades na ala após o batismo?',
      options: [
        { text: 'Para se sentir parte da família da Igreja e ter apoio espiritual', correct: true },
        { text: 'Para conseguir benefícios financeiros da organização religiosa', correct: false },
        { text: 'Porque é uma obrigação regulamentada pela Igreja', correct: false },
        { text: 'Para aprender idiomas e culturas diferentes', correct: false },
      ],
    },
  },
  {
    id: 'estudo', col: 2, row: 4,
    icon: '📖', shortTitle: 'Estudo',
    title: 'Aperfeiçoar o estudo do evangelho',
    zone: 'blue', building: 'chapel', xp: 80,
    description: 'O estudo diário das escrituras e a oração fortalecem o testemunho. A Escola Dominical e o "Vem e Segue-me" são ferramentas poderosas.',
    quiz: {
      question: 'Qual é uma boa prática para aperfeiçoar o estudo do evangelho?',
      options: [
        { text: 'Reservar tempo diário para ler as escrituras e orar', correct: true },
        { text: 'Estudar apenas quando os missionários visitarem', correct: false },
        { text: 'Assistir somente a filmes religiosos aos domingos', correct: false },
        { text: 'Esperar o bispo recomendar o que estudar cada semana', correct: false },
      ],
    },
  },
  {
    id: 'sacerdocio-aaronico', col: 0, row: 2,
    icon: '🛡️', shortTitle: 'Sacerd. Aarônico',
    title: 'Aprender sobre o Sacerdócio Aarônico e o programa dos Rapazes',
    zone: 'teal', building: 'meetinghouse', xp: 100,
    description: 'O Sacerdócio Aarônico é conferido a rapazes e adultos dignos. Seus portadores administram o sacramento, realizam batismos e servem na Igreja.',
    quiz: {
      question: 'Qual é um dos deveres dos portadores do Sacerdócio Aarônico?',
      options: [
        { text: 'Administrar o sacramento nas reuniões da Igreja', correct: true },
        { text: 'Presidir as conferências gerais da Igreja', correct: false },
        { text: 'Realizar cerimônias de selamento no templo', correct: false },
        { text: 'Dirigir os programas financeiros da Igreja', correct: false },
      ],
    },
  },
  {
    id: 'mocas', col: 1, row: 3,
    icon: '🌸', shortTitle: 'Moças',
    title: 'Aprender sobre o programa das Moças',
    zone: 'teal', building: 'meetinghouse', xp: 100,
    description: 'O Programa das Moças fortalece a fé, o caráter e o testemunho das jovens entre 11 e 18 anos, ajudando-as a descobrir sua identidade divina.',
    quiz: {
      question: 'O que o Programa das Moças busca fortalecer nas jovens?',
      options: [
        { text: 'A fé, a identidade divina e as virtudes cristãs', correct: true },
        { text: 'As habilidades esportivas e competitivas das jovens', correct: false },
        { text: 'A formação acadêmica e profissional exclusivamente', correct: false },
        { text: 'O engajamento em redes sociais religiosas', correct: false },
      ],
    },
  },
  {
    id: 'socorro', col: 2, row: 2,
    icon: '🤲', shortTitle: 'Soc. de Socorro',
    title: 'Aprender sobre a Sociedade de Socorro',
    zone: 'teal', building: 'meetinghouse', xp: 100,
    description: 'A Sociedade de Socorro é a maior organização feminina do mundo, fundada em 1842 para cuidar dos necessitados e fortalecer fé e família.',
    quiz: {
      question: 'Como é conhecida a Sociedade de Socorro?',
      options: [
        { text: 'A maior organização feminina do mundo, dedicada a cuidar dos necessitados', correct: true },
        { text: 'Um grupo de estudo bíblico exclusivo para mulheres idosas', correct: false },
        { text: 'Uma organização de caridade independente da Igreja', correct: false },
        { text: 'Um programa de voluntariado apenas para mulheres solteiras', correct: false },
      ],
    },
  },
  {
    id: 'primaria', col: 1, row: 1,
    icon: '👶', shortTitle: 'Primária',
    title: 'Aprender sobre a Primária — Servir às crianças',
    zone: 'teal', building: 'meetinghouse', xp: 100,
    description: 'A Primária é a organização para crianças de 18 meses a 11 anos. Ela ensina o evangelho de forma adaptada à idade, fortalecendo a fé desde cedo.',
    quiz: {
      question: 'Qual é o principal objetivo da Primária na Igreja?',
      options: [
        { text: 'Ensinar às crianças o evangelho de Jesus Cristo e fortalecer sua fé', correct: true },
        { text: 'Preparar crianças para competições esportivas da Igreja', correct: false },
        { text: 'Oferecer cuidados médicos às crianças da comunidade', correct: false },
        { text: 'Ensinar crianças a tocar instrumentos musicais litúrgicos', correct: false },
      ],
    },
  },
  {
    id: 'recomendacao', col: 3, row: 4,
    icon: '📜', shortTitle: 'Recom. Templo',
    title: 'Receber uma recomendação do templo para batismos e confirmações vicários',
    zone: 'magenta', building: 'temple', xp: 150,
    description: 'A recomendação limitada para o templo permite ao novo membro realizar batismos vicários. É obtida após entrevistas com o bispo, vivendo os mandamentos.',
    quiz: {
      question: 'O que um novo membro precisa fazer para receber a recomendação do templo?',
      options: [
        { text: 'Viver os mandamentos e passar por entrevista com o bispo', correct: true },
        { text: 'Pagar dízimos por no mínimo dois anos consecutivos', correct: false },
        { text: 'Completar um curso específico de 6 meses da Igreja', correct: false },
        { text: 'Ser indicado diretamente pelo presidente da missão', correct: false },
      ],
    },
  },
  {
    id: 'antepassados', col: 4, row: 3,
    icon: '🧬', shortTitle: 'Antepassados',
    title: 'Ajudar seus antepassados a receber ordenanças sagradas',
    zone: 'magenta', building: 'temple', xp: 150,
    description: 'Por meio da pesquisa genealógica e das ordenanças vicárias no templo, damos a nossos antepassados a oportunidade de aceitar o evangelho no além-vida.',
    quiz: {
      question: 'Por que realizamos ordenanças vicárias para nossos antepassados?',
      options: [
        { text: 'Para dar a eles a oportunidade de aceitar o evangelho no além-vida', correct: true },
        { text: 'Para acumular créditos espirituais extras para nós mesmos', correct: false },
        { text: 'Por exigência civil de registros históricos e genealógicos', correct: false },
        { text: 'Apenas para preservar a memória da história familiar', correct: false },
      ],
    },
  },
  {
    id: 'bencao-patriarcal', col: 3, row: 2,
    icon: '🌿', shortTitle: 'Bênção Patriarcal',
    title: 'Receber sua bênção patriarcal',
    zone: 'magenta', building: 'temple', xp: 150,
    description: 'A bênção patriarcal é uma mensagem pessoal e inspirada de Deus ao indivíduo. Ela declara a linhagem de Israel e oferece orientação e promessas para a vida.',
    quiz: {
      question: 'O que é uma Bênção Patriarcal?',
      options: [
        { text: 'Uma bênção inspirada que declara a linhagem de Israel e oferece orientação pessoal', correct: true },
        { text: 'Uma cura milagrosa para doenças físicas graves', correct: false },
        { text: 'Um certificado de conclusão do curso de conversão', correct: false },
        { text: 'Uma bênção especial dada somente dentro do templo', correct: false },
      ],
    },
  },
  {
    id: 'desanimo', col: 4, row: 1,
    icon: '💪', shortTitle: 'Vencer Desânimo',
    title: 'Vencer o desânimo e as dificuldades',
    zone: 'magenta', building: 'temple', xp: 120,
    description: 'Todos enfrentam dificuldades. A fé em Jesus Cristo, a oração, o serviço e o apoio da comunidade da Igreja são recursos poderosos para superar momentos difíceis.',
    quiz: {
      question: 'Qual é a principal fonte de força para vencer o desânimo?',
      options: [
        { text: 'A fé em Jesus Cristo e a aplicação de Seus ensinamentos', correct: true },
        { text: 'A força de vontade pessoal, sem necessidade de ajuda espiritual', correct: false },
        { text: 'Afastar-se temporariamente da Igreja para descansar a mente', correct: false },
        { text: 'Ignorar os problemas até que passem naturalmente', correct: false },
      ],
    },
  },
  {
    id: 'domingo', col: 5, row: 5,
    icon: '🕊️', shortTitle: 'Santificar Dom.',
    title: 'Santificar o Dia do Senhor',
    zone: 'green', building: 'home', xp: 100,
    description: 'O domingo é um dia sagrado de adoração. Participar da Reunião Sacramental, servir aos outros e atividades que unam a família a Deus são formas de santificá-lo.',
    quiz: {
      question: 'Como podemos santificar o Dia do Senhor?',
      options: [
        { text: 'Adorando a Deus, participando do sacramento e servindo aos outros', correct: true },
        { text: 'Assistindo a filmes educativos durante o dia inteiro', correct: false },
        { text: 'Apenas descansando e evitando qualquer tipo de atividade', correct: false },
        { text: 'Trabalhando em projetos de caridade individuais', correct: false },
      ],
    },
  },
  {
    id: 'servir', col: 6, row: 4,
    icon: '🙏', shortTitle: 'Servir',
    title: 'Servir ao próximo',
    zone: 'green', building: 'home', xp: 100,
    description: 'Servir aos outros é uma expressão fundamental do amor de Deus. Quando servimos aos outros, estamos servindo ao próprio Deus.',
    quiz: {
      question: 'Por que servir ao próximo é essencial no evangelho?',
      options: [
        { text: 'Porque ao servir aos outros, estamos servindo a Deus', correct: true },
        { text: 'Porque é uma exigência legal das organizações religiosas', correct: false },
        { text: 'Para melhorar nossa reputação na comunidade local', correct: false },
        { text: 'Porque acumula créditos espirituais para a vida eterna', correct: false },
      ],
    },
  },
  {
    id: 'compartilhar', col: 5, row: 3,
    icon: '✨', shortTitle: 'Compartilhar',
    title: 'Compartilhar o evangelho',
    zone: 'green', building: 'home', xp: 100,
    description: 'Todo membro é convidado a compartilhar o evangelho com amor e exemplo, convidando amigos e familiares a aprender mais sobre Jesus Cristo.',
    quiz: {
      question: 'Qual é a melhor forma de compartilhar o evangelho?',
      options: [
        { text: 'Vivendo com amor e bondade e convidando outros a aprender', correct: true },
        { text: 'Distribuindo panfletos religiosos em locais públicos', correct: false },
        { text: 'Convencendo outros por meio de argumentos religiosos', correct: false },
        { text: 'Compartilhando vídeos em todas as redes sociais possíveis', correct: false },
      ],
    },
  },
  {
    id: 'noite-lar', col: 6, row: 2,
    icon: '🏠', shortTitle: 'Noite no Lar',
    title: 'Participar de uma noite no lar',
    zone: 'green', building: 'home', xp: 100,
    description: 'A Noite de Família é uma reunião semanal para ensinar o evangelho, orar, compartilhar experiências e fortalecer os laços familiares.',
    quiz: {
      question: 'Qual é o propósito da Noite de Família (Noite no Lar)?',
      options: [
        { text: 'Fortalecer laços familiares com lições do evangelho, oração e diversão', correct: true },
        { text: 'Substituir as reuniões de domingo para famílias ocupadas', correct: false },
        { text: 'Organizar somente as tarefas domésticas da semana', correct: false },
        { text: 'Fazer refeições em família sem uso de dispositivos eletrônicos', correct: false },
      ],
    },
  },
  {
    id: 'profeta', col: 7, row: 3,
    icon: '👨‍💼', shortTitle: 'Seguir Profeta',
    title: 'Seguir o profeta',
    zone: 'green', building: 'home', xp: 120,
    description: 'Deus guia Sua Igreja hoje por meio de um profeta vivo, assim como fez na antiguidade. Seguir seus ensinamentos traz proteção espiritual e paz.',
    quiz: {
      question: 'Por que seguimos o profeta vivo da Igreja?',
      options: [
        { text: 'Porque Deus nos guia hoje através de um profeta, como fez na Bíblia', correct: true },
        { text: 'Porque é uma tradição cultural das religiões cristãs ocidentais', correct: false },
        { text: 'Para receber benefícios materiais da organização religiosa', correct: false },
        { text: 'Porque o profeta é eleito democraticamente pelos membros', correct: false },
      ],
    },
  },
  {
    id: 'mandamentos', col: 7, row: 5,
    icon: '⚖️', shortTitle: 'Mandamentos',
    title: 'Obedecer aos mandamentos',
    zone: 'green', building: 'home', xp: 120,
    description: 'Obedecer aos mandamentos de Deus traz paz interior, bênçãos e nos aproxima Dele. É um ato de amor, como um filho que segue os conselhos de pais amorosos.',
    quiz: {
      question: 'Como a obediência aos mandamentos nos beneficia?',
      options: [
        { text: 'Traz paz, bênçãos e nos aproxima de Deus e da felicidade', correct: true },
        { text: 'Garante saúde perfeita e prosperidade financeira imediata', correct: false },
        { text: 'Nos livra completamente de toda adversidade e sofrimento', correct: false },
        { text: 'Assegura que nunca mais cometeremos erros em nossa vida', correct: false },
      ],
    },
  },
  {
    id: 'autossuficiencia', col: 8, row: 4,
    icon: '🏦', shortTitle: 'Autossufic.',
    title: 'Ser autossuficiente',
    zone: 'gold', building: 'grandtemple', xp: 150,
    description: 'A autossuficiência é a capacidade de prover para si mesmo e a família em termos temporais e espirituais: educação, emprego, saúde e reservas.',
    quiz: {
      question: 'O que significa ser autossuficiente segundo a Igreja?',
      options: [
        { text: 'Prover para si e para a família, sem depender da caridade quando possível', correct: true },
        { text: 'Acumular riqueza para nunca precisar de qualquer ajuda', correct: false },
        { text: 'Rejeitar toda forma de ajuda governamental ou social', correct: false },
        { text: 'Ter independência absoluta de todas as pessoas ao redor', correct: false },
      ],
    },
  },
  {
    id: 'melquisedeque', col: 8, row: 2,
    icon: '🔑', shortTitle: 'Sacerd. Melquised.',
    title: 'Aprender sobre o Sacerdócio de Melquisedeque',
    zone: 'gold', building: 'grandtemple', xp: 200,
    description: 'O Sacerdócio de Melquisedeque é a ordem superior do sacerdócio. Seus portadores presidem a Igreja, dão bênçãos de cura e realizam ordenanças do templo.',
    quiz: {
      question: 'Qual é o principal propósito do Sacerdócio de Melquisedeque?',
      options: [
        { text: 'Administrar as ordenanças do evangelho e dirigir a Igreja de Cristo', correct: true },
        { text: 'Organizar eventos esportivos e culturais para os membros', correct: false },
        { text: 'Gerenciar as finanças e propriedades físicas da Igreja', correct: false },
        { text: 'Realizar apresentações musicais nas conferências gerais', correct: false },
      ],
    },
  },
  {
    id: 'investidura', col: 9, row: 3,
    icon: '🌟', shortTitle: 'Investidura',
    title: 'Receber sua investidura',
    zone: 'gold', building: 'grandtemple', xp: 300,
    description: 'A investidura do templo é uma das ordenanças mais sagradas. O membro faz convênios com Deus, recebe instrução espiritual e se prepara para voltar à presença de Deus.',
    quiz: {
      question: 'O que é a Investidura do Templo?',
      options: [
        { text: 'Uma ordenança sagrada onde fazemos convênios com Deus e recebemos instrução espiritual', correct: true },
        { text: 'Uma cerimônia de formatura para membros com 5 anos na Igreja', correct: false },
        { text: 'Um batismo especial realizado dentro do templo sagrado', correct: false },
        { text: 'Uma bênção dada pessoalmente pelo presidente da Igreja', correct: false },
      ],
    },
  },
  {
    id: 'selamento', col: 9, row: 1,
    icon: '💍', shortTitle: 'Selamento',
    title: 'Ser selado à sua família',
    zone: 'gold', building: 'grandtemple', xp: 300,
    description: 'O selamento familiar é o ponto culminante das ordenanças. Por meio do sacerdócio, os laços familiares transcendem a morte — famílias podem estar juntas para sempre.',
    quiz: {
      question: 'O que significa ser selado à família no templo?',
      options: [
        { text: 'Que os laços familiares podem ser eternos, transcendendo a morte', correct: true },
        { text: 'Que a família se compromete a viver na mesma cidade para sempre', correct: false },
        { text: 'Uma cerimônia legal de adoção reconhecida pelo governo civil', correct: false },
        { text: 'Um compromisso de se reunir toda semana obrigatoriamente na Igreja', correct: false },
      ],
    },
  },
];

export const ZONE_CONFIG = {
  blue:    { name: 'Fundamentos',       bg: '#0d2a5e', hex: '#1e3a8a', glow: '#3b82f6', border: '#60a5fa' },
  teal:    { name: 'Organizações',      bg: '#0d3d38', hex: '#0f5952', glow: '#14b8a6', border: '#2dd4bf' },
  magenta: { name: 'Templo',            bg: '#3b0f5e', hex: '#581c87', glow: '#c026d3', border: '#e879f9' },
  green:   { name: 'Discipulado',       bg: '#0a3320', hex: '#14532d', glow: '#10b981', border: '#34d399' },
  gold:    { name: 'Ordenanças Eternas',bg: '#432c08', hex: '#78350f', glow: '#f59e0b', border: '#fcd34d' },
  neutral: { name: '',                  bg: '#0a1020', hex: '#0f172a', glow: '#1e3a5f', border: '#1e293b' },
};

export const BUILDING_CONFIG = {
  chapel:       { emoji: '⛪', label: 'Capelinha',       color: '#3b82f6' },
  meetinghouse: { emoji: '🏛️', label: 'Centro',          color: '#14b8a6' },
  temple:       { emoji: '🕌', label: 'Templo',          color: '#c026d3' },
  home:         { emoji: '🏠', label: 'Lar',             color: '#10b981' },
  grandtemple:  { emoji: '🌟', label: 'Templo Sagrado',  color: '#f59e0b' },
};

export const LEVELS = [
  { level: 1, title: 'Recém-Batizado', minXp: 0,    icon: '🌱' },
  { level: 2, title: 'Amigo da Ala',   minXp: 300,  icon: '🤝' },
  { level: 3, title: 'Discípulo',      minXp: 700,  icon: '📖' },
  { level: 4, title: 'Servo Fiel',     minXp: 1200, icon: '🛡️' },
  { level: 5, title: 'Herdeiro',       minXp: 2000, icon: '👑' },
];

export function getLevelForXp(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.minXp) || LEVELS[0];
}
export function getNextLevel(xp) {
  return LEVELS.find(l => xp < l.minXp) || null;
}
export function getXpProgress(xp) {
  const cur = getLevelForXp(xp);
  const nxt = getNextLevel(xp);
  if (!nxt) return 100;
  return Math.round(((xp - cur.minXp) / (nxt.minXp - cur.minXp)) * 100);
}

export function getActiveMissions(organization) {
  if (!organization) return MISSIONS;
  const org = organization;
  const excludes = [];
  
  if (org === 'Quórum de Élderes') excludes.push('mocas', 'primaria', 'sacerdocio-aaronico', 'socorro');
  if (org === 'Sociedade de Socorro') excludes.push('mocas', 'primaria', 'sacerdocio-aaronico', 'melquisedeque');
  if (org === 'Moças') excludes.push('socorro', 'primaria', 'sacerdocio-aaronico', 'melquisedeque', 'selamento', 'investidura');
  if (org === 'Sacerdócio Aarônico') excludes.push('socorro', 'primaria', 'mocas', 'melquisedeque', 'selamento', 'investidura');
  if (org === 'Primária') excludes.push('socorro', 'sacerdocio-aaronico', 'mocas', 'melquisedeque', 'selamento', 'investidura', 'recomendacao', 'bencao-patriarcal');
  
  return MISSIONS.filter(m => !excludes.includes(m.id));
}

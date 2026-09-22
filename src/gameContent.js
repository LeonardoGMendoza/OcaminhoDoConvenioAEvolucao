// Banco de dados de perguntas e conteúdos focados e separados por nível/idade

export const QUIZ_BANK = {
  // PRIMÁRIA (Crianças) - Perguntas muito simples, Regras de Fé fáceis. SEM missões de upload.
  primaria: [
    { 
      id: 'prim_1', title: '1ª Regra de Fé',
      q: 'Em quem nós cremos segundo a primeira Regra de Fé?',
      options: ['Em Moisés', 'Em Deus, o Pai Eterno, em Seu Filho Jesus Cristo e no Espírito Santo', 'Nos anjos', 'Apenas no profeta'],
      correct: 1
    },
    { 
      id: 'prim_2', title: 'Livro de Mórmon Básico',
      q: 'Quem foi o profeta que orou o dia inteiro e a noite toda na floresta?',
      options: ['Néfi', 'Enos', 'Alma', 'Morôni'],
      correct: 1
    },
    { 
      id: 'prim_3', title: 'A Primeira Visão',
      q: 'Quantos personagens apareceram para Joseph Smith no Bosque Sagrado?',
      options: ['Nenhum', 'Um', 'Dois', 'Três'],
      correct: 2
    },
    { 
      id: 'prim_4', title: 'Batismo',
      q: 'Com quantos anos as crianças costumam ser batizadas na Igreja?',
      options: ['6 anos', '8 anos', '10 anos', '12 anos'],
      correct: 1
    },
    {
      id: 'prim_5', title: '3ª Regra de Fé',
      q: 'Por meio do que toda a humanidade pode ser salva?',
      options: ['Por ser rico', 'Pelo batismo apenas', 'Pela Expiação de Cristo', 'Por ir à Igreja aos domingos'],
      correct: 2
    }
  ],

  // NOVO CONVERSO (Pesquisador / Novo) - Focado na Restauração e princípios básicos.
  novo: [
    {
      id: 'novo_1', title: 'Restauração do Sacerdócio',
      q: 'Quem restaurou o Sacerdócio Aarônico a Joseph Smith e Oliver Cowdery?',
      options: ['Pedro, Tiago e João', 'João Batista', 'Morôni', 'Elias'],
      correct: 1
    },
    {
      id: 'novo_2', title: 'O Livro de Mórmon',
      q: 'Como Joseph Smith traduziu o Livro de Mórmon?',
      options: ['Lendo um dicionário antigo', 'Pelo dom e poder de Deus', 'Com a ajuda de professores de línguas', 'Ele não traduziu, ele mesmo escreveu'],
      correct: 1
    },
    {
      id: 'novo_3', title: 'Pérola de Grande Valor',
      q: 'Qual livro na Pérola de Grande Valor contém os escritos do profeta que libertou o povo do Egito?',
      options: ['Livro de Abraão', 'Livro de Moisés', 'Joseph Smith—Mateus', 'Regras de Fé'],
      correct: 1
    },
    {
      id: 'novo_4', title: 'Doutrina e Convênios',
      q: 'Qual é o nome da seção 89 de Doutrina e Convênios que fala sobre saúde?',
      options: ['A Lei do Dízimo', 'A Palavra de Sabedoria', 'O Juramento do Sacerdócio', 'A Visão das Glórias'],
      correct: 1
    },
    {
      id: 'novo_5', title: '13ª Regra de Fé',
      q: 'Qual é a primeira frase da 13ª Regra de Fé?',
      options: ['Cremos em ser honestos, verdadeiros, castos, benevolentes...', 'Cremos no dom de línguas...', 'Cremos que os homens serão punidos por seus próprios pecados...', 'Cremos na mesma organização...'],
      correct: 0
    }
  ],

  // MEMBRO ANTIGO (Avançado) - Doutrina profunda, livros específicos e história densa.
  antigo: [
    {
      id: 'antigo_1', title: 'Doutrina e Convênios - Mistérios',
      q: 'Na Seção 76 de Doutrina e Convênios, quem herda o Reino Telestial?',
      options: ['Os que são valentes no testemunho de Jesus.', 'Os mentirosos, feiticeiros, adúlteros e quem ama e inventa mentiras.', 'Os homens honoráveis da Terra cegados pela artimanha.', 'Aqueles que nunca ouviram o evangelho na Terra.'],
      correct: 1
    },
    {
      id: 'antigo_2', title: 'O Milagre do Perdão',
      q: 'De acordo com Spencer W. Kimball em "O Milagre do Perdão", o que é essencial para que o arrependimento seja completo além do abandono do pecado?',
      options: ['Esquecer que o pecado ocorreu.', 'Fazer uma oração repetitiva.', 'A restituição (consertar o dano na medida do possível).', 'Apenas pagar o dízimo.'],
      correct: 2
    },
    {
      id: 'antigo_3', title: 'Pérola de Grande Valor - Abraão',
      q: 'No Livro de Abraão, o que representa o "Kolob"?',
      options: ['O nome de um faraó.', 'A primeira criação de Deus na Terra.', 'A grande estrela ou corpo celestial mais próximo do trono de Deus.', 'O mar vermelho.'],
      correct: 2
    },
    {
      id: 'antigo_4', title: 'Jesus, O Cristo (Talmage)',
      q: 'Segundo James E. Talmage, qual foi a causa real da morte física de Jesus Cristo na cruz?',
      options: ['Asfixia devido à crucificação.', 'Hemorragia pelas chagas.', 'Um coração quebrantado devido à agonia espiritual suprema.', 'Elevação da temperatura.'],
      correct: 2
    },
    {
      id: 'antigo_5', title: 'W. Cleon Skousen',
      q: 'O que W. Cleon Skousen enfatiza sobre o papel da inteligência (ou das inteligências) na manutenção das leis físicas do universo e a Expiação?',
      options: ['Que as inteligências obedecem a Deus por honra, e o pecado quebra essa honra, exigindo que Cristo satisfaça a justiça para manter o universo coeso.', 'Que o universo é um caos e Deus força a obediência.', 'Que as inteligências não têm papel na lei eterna.', 'Que a Expiação afetou apenas a Terra e não o universo.'],
      correct: 0
    },
    {
      id: 'antigo_6', title: '9ª e 10ª Regras de Fé',
      q: 'O que a 10ª Regra de Fé declara sobre a coligação literal de Israel?',
      options: ['Que ela é apenas figurativa e espiritual.', 'Cremos na coligação literal de Israel e na restauração das Dez Tribos; que Sião será construída neste continente (América).', 'Cremos que Israel nunca será restaurada.', 'Cremos que Sião será na Europa.'],
      correct: 1
    }
  ]
};

export const getQuestionsForProfile = (profile) => {
  if (!profile) return QUIZ_BANK.primaria;
  
  // Se for criança, SEMPRE retorna primária, não importa se é antigo ou novo.
  if (profile.organization === 'Primária') {
    return QUIZ_BANK.primaria;
  }

  // Se for adulto/jovem adulto:
  if (profile.memberType === 'antigo') {
    return QUIZ_BANK.antigo; // Missões difíceis, livros profundos
  } else {
    return QUIZ_BANK.novo; // Missões de transição/Restauração
  }
};

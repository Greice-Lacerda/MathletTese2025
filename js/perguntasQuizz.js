export const quizData = [
  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u> QUESTÃO 1:</u></span> Qual é o primeiro passo de uma prova usando o Princípio da Indução Matemática? ",
    alternativas: [
      "A) Provar que P(n) é verdadeira",
      "B) O caso base n<sub>0</sub>",
      "C) O passo indutivo",
      "D) Provar que P(k) implica P(k + 1)",
      "E) Nenhuma das alternativas anteriores",
    ],
    respostaCorretaIndex: 1,
    justificativa:
      "O primeiro passo de uma prova usando o Princípio da Indução Matemática é o caso base n₀. Nele, você verifica que a proposição P(n) é verdadeira para o menor valor de n, geralmente n = 0 ou n = 1, dependendo do contexto do problema.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u> QUESTÃO 2:</u></span> Considerando a faixa da parábola y = x<sup>2</sup> no intervalo [0, 1], qual seria a área do primeiro polígono retangular inscrito, com sua altura determinada em x = 0?",
    alternativas: [
      "A) Área infinita.",
      "B) Área indefinida.",
      "C) Área negativa.",
      "D) Área zero.",
      "E) Área positiva.",
    ],
    respostaCorretaIndex: 3,
    justificativa:
      "A faixa da parábola se inicia no ponto x = 0. A altura do primeiro retângulo é determinada pela coordenada y nesse ponto. Como y = 0 quando x = 0, a altura é nula, resultando em uma área zero.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u> QUESTÃO 3:</u></span> Pelo seu conhecimento em geometria, se você tem uma faixa de parábola no intervalo de [0, 1] e a divide em duas partes iguais, como você descreveria o polígono retangular que se forma? ",
    alternativas: [
      "A) O polígono será composto por quatro retângulos.",
      "B) O polígono será composto por três retângulos.",
      "C) O polígono será composto por um único retângulo.",
      "D) O polígono será composto por dois retângulos.",
      "E) O polígono será composto por cinco retângulos.",
    ],
    respostaCorretaIndex: 3,
    justificativa:
      "Quando a faixa da parábola é dividida em duas partes iguais, o polígono retangular inscrito é composto por dois retângulos, um em cada subintervalo. Esta é a base do cálculo da área total para n=2.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u> QUESTÃO 4:</u></span> Dividindo a faixa da parabola y = x<sup>2</sup> determinada pelo intervalo [0, 1] em duas partes iguais, qual seria a medida do comprimento de cada subintervalo?",
    alternativas: [
      "A) Comprimento igual a zero.",
      "B) Comprimento igual a 1/4.",
      "C) Comprimento igual a 1/4.",
      "D) Comprimento igual a 1/2.",
      "E) Comprimento igual a 1.",
    ],
    respostaCorretaIndex: 3,
    justificativa:
      "Ao dividir a faixa da parábola em duas partes iguais, o comprimento de cada subintervalo seria 0,5. O cálculo é simples e não depende da função da parábola, apenas do intervalo. O comprimento do intervalo será igual a (1 - 0) = 1, dividindo-o ao meio temos 1/2.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u> QUESTÃO 5:</u></span> Ao dividir a faixa de [0, 1] em duas partes iguais, para o segundo subintervalo, qual seria a altura do polígono inscrito, considerando o valor de x no ponto inicial desse subintervalo?",
    alternativas: [
      "A) y = 0,25",
      "B) y = 0,5",
      "C) y = 0,75",
      "D) y = 1",
      "E) y = 2",
    ],
    respostaCorretaIndex: 0,
    justificativa:
      "O segundo subintervalo inicia em x = 1/2. Logo, a altura é y = (1/2)<sup>2</sup> = 1/4 = 0,25.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u>QUESTÃO 6:</u></span> Considerando a faixa da parábola y = x<sup>2</sup> no intervalo [0, 1] dividida em duas partes iguais, qual é a área total dos polígonos retangulares inscritos, utilizando a altura no **lado esquerdo** de cada subintervalo?",
    alternativas: ["A) 0,125", "B) 0,25", "C) 0,5", "D) 0,625", "E) 1,0"],
    respostaCorretaIndex: 0,
    justificativa:
      "A área total é a soma da área de cada polígono. A área do primeiro polígono é nula e a área do segundo é $0,5 \\times 0,25 = 0,125$. A soma total é $0 + 0,125 = 0,125$.",
  },

  {
    pergunta:
      "<span style='font-weight: bold; color: #3717eaff; text-shadow: 1px 1px 3px rgba(82, 65, 65, 0.9);'><u>QUESTÃO 7:</u></span> No Princípio da Indução Matemática, qual a função principal do Caso Base?",
    alternativas: ["A) Validar o passo de indução.", "B) Provar que a afirmação é verdadeira para um número infinito de casos", "C) Calcular o resultado final da afirmação.", "D) Estabelecer um ponto de partida para a prova.", "E) Refutar o passo de indução."],
    respostaCorretaIndex: 3,
    justificativa:
      "O Caso Base é fundamental para a prova de indução, pois ele estabelece um ponto de partida para a 'reação em cadeia' lógica. Sem o Caso Base, não há uma base sólida para a prova.",
  },

  
];
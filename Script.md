# JavaII

prática da OKR funcionando
________________________________________
Criar um Objetivo

•	Método: POST
•	URL: http://localhost:8080/api/objetivos
•	Body (JSON):

json
{
  "titulo": "Melhorar satisfação do cliente",
  "descricao": "Meta relacionada ao atendimento em 2025"
}

________________________________________

Resultado-Chave (KR) vinculado ao Objetivo
•	Método: POST
•	URL: http://localhost:8080/api/krs
•	Body:

json
{
  "descricao": "Aumentar NPS de 70 para 85",
  "meta": "Chegar a 85 de NPS",
  "objetivo": { "id": 1 }
}
________________________________________
Iniciativas para o KR

•	Método: POST
•	URL: http://localhost:8080/api/iniciativas
•	Body:

json
{
  "titulo": "Treinamento da equipe de suporte",
  "descricao": "Capacitação focada em empatia",
  "porcentagemConclusao": 100.0,
  "resultadoChave": { "id": 1 }
}

json
{
  "titulo": "Implementação de chatbot",
  "descricao": "Respostas instantâneas para perguntas frequentes",
  "porcentagemConclusao": 50.0,
  "resultadoChave": { "id": 1 }
}
________________________________________

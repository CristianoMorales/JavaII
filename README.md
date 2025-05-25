# Sistema de Gestão de OKRs

Este projeto é uma aplicação full-stack desenvolvida em **Java com Spring Boot** no back-end e **Next.js com JavaScript** no front-end. Seu objetivo é permitir a criação, visualização e gestão de **Objetivos**, **Resultados-Chave (KRs)** e **Iniciativas**, seguindo a metodologia de OKRs (Objectives and Key Results).

---

## 👨‍💻 Integrantes

- **Cristiano Morales** – RA: 10437953
- **João Trevisol** – RA: 10277893
- **Matheus Fernandes** – RA: 10435788

---

## 📦 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database (em memória)
- Maven

### Frontend
- Next.js (App Router)
- JavaScript (sem TypeScript)

---

## 📁 Estrutura do Projeto

### `model/` – Entidades do sistema
Contém as classes JPA que representam as tabelas do banco de dados:

- `Objetivo.java`: representa a meta principal.
  - Possui título, descrição, porcentagem de conclusão.
  - Relaciona com vários KRs (`@OneToMany`).
- `ResultadoChave.java`: representa os KRs ligados a um Objetivo.
  - Possui descrição, meta e porcentagem de conclusão.
  - Relaciona com um Objetivo (`@ManyToOne`) e várias Iniciativas.
- `Iniciativa.java`: ações práticas ligadas a um KR.
  - Possui título, descrição e porcentagem de conclusão manual.

> 💡 Hierarquia: Objetivo → Resultados-Chave → Iniciativas

---

### `repository/` – Camada de persistência
Interfaces que estendem `JpaRepository`, permitindo acesso ao banco sem necessidade de SQL manual.

- `ObjetivoRepository`
- `ResultadoChaveRepository`
- `IniciativaRepository`

---

### `service/` – Regras de negócio
Responsável por conter as regras da aplicação e cálculos automáticos.

- `ObjetivoService`: CRUD completo, calcula média das KRs.
- `ResultadoChaveService`: CRUD de KRs, calcula média das iniciativas.
- `IniciativaService`: atualiza a porcentagem do KR e do Objetivo automaticamente.

---

### `controller/` – API REST
Controladores que expõem os endpoints:

- `ObjetivoController`: `/api/objetivos`
- `ResultadoChaveController`: `/api/krs`
- `IniciativaController`: `/api/iniciativas`

Métodos utilizados: `@PostMapping`, `@GetMapping`, `@PutMapping`, `@DeleteMapping`.

---

## 🌐 Frontend (Next.js)

### Estrutura
- `/objetivos`: página que lista objetivos.
- `/krs`: página que lista os KRs.
- `/iniciativas`: página que lista as iniciativas.
- Cada uma possui botão para **criar novo**, e exibe a **porcentagem de conclusão**.

### Funcionalidades
- Consumo de dados com `fetch`.
- Criação e deleção de entidades.
- Edição da porcentagem de Iniciativas.
- Atualização dinâmica das porcentagens dos KRs e Objetivos.
- Navegação com `Link`.

---

## 🔁 Lógica do Cálculo de Porcentagem

- Quando uma **Iniciativa** é criada ou atualizada:
  - Atualiza a média do KR.
  - O KR atualiza a média do Objetivo automaticamente.
  
```text
Média do KR = média das porcentagens das Iniciativas ligadas a ele
Média do Objetivo = média das porcentagens dos seus KRs
```
## Observações Finais

- As porcentagens são atualizadas automaticamente conforme a média dos elementos filhos.
- Os formulários foram testados e validados.
- O sistema funciona localmente em `localhost:3000` para o front e `localhost:8080` para o back-end.
- O Thunder Client pode não funcionar corretamente com JSONs aninhados complexos (como `{ resultadoChave: { id: ... } }`), por isso o fetch do front foi ajustado para esse cenário.

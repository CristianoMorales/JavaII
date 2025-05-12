# 📊 Sistema de Gestão de OKRs

Este projeto é um sistema web simplificado para gerenciamento de **OKRs** (Objectives and Key Results), permitindo criar **Objetivos**, seus **Resultados-Chave** e as **Iniciativas** que compõem esses resultados. O backend foi desenvolvido com **Java + Spring Boot**, seguindo uma arquitetura em camadas bem definida.

## 🧠 Lógica do Sistema

A lógica principal do sistema gira em torno de três níveis:

- **Objetivo**: Uma meta principal qualitativa.
- **Resultado-Chave (KR)**: Submetas mensuráveis ligadas a um Objetivo.
- **Iniciativa**: Ações práticas que contribuem para alcançar um KR.

A hierarquia é a seguinte:

```
Objetivo
└── Resultado-Chave (KR)
    └── Iniciativa
```

As **porcentagens de conclusão** são calculadas da seguinte forma:
- A média das porcentagens das **Iniciativas** atualiza o **Resultado-Chave**.
- A média das porcentagens dos **KRs** atualiza o **Objetivo**.

---

## 📁 Estrutura de Pacotes

### `model/` – Entidades JPA

Contém as classes que representam as **tabelas do banco de dados**.

- `Objetivo.java`
  - Campos: `titulo`, `descricao`, `porcentagemConclusao`.
  - Relacionamento: `@OneToMany` com ResultadoChave.
  - Observação: `porcentagemConclusao` é calculada automaticamente.

- `ResultadoChave.java`
  - Campos: `descricao`, `meta`, `porcentagemConclusao`.
  - Relacionamentos:
    - `@ManyToOne` com Objetivo.
    - `@OneToMany` com Iniciativa.

- `Iniciativa.java`
  - Campos: `titulo`, `descricao`, `porcentagemConclusao` (manual).
  - Relacionamento: `@ManyToOne` com ResultadoChave.

---

### `repository/` – Acesso ao banco de dados

Interfaces que estendem `JpaRepository`, permitindo operações CRUD sem escrever SQL:

- `ObjetivoRepository`
- `ResultadoChaveRepository`
- `IniciativaRepository`

---

### `service/` – Lógica de negócio

Camada responsável pelas **regras e cálculos do sistema**.

- `ObjetivoService`
  - CRUD de Objetivos.
  - Atualiza a `porcentagemConclusao` com base nos KRs.

- `ResultadoChaveService`
  - CRUD de KRs.
  - Verifica se o Objetivo existe antes de associar.
  - Atualiza sua `porcentagemConclusao` com base nas Iniciativas.

- `IniciativaService` ⭐
  - CRUD de Iniciativas.
  - Após cada ação (criação, edição ou exclusão), **recalcula automaticamente** a média do ResultadoChave e do Objetivo.

---

### `controller/` – Endpoints REST

Expõe a API REST para consumo via Thunder Client ou Frontend:

- `ObjetivoController` → `/api/objetivos`
- `ResultadoChaveController` → `/api/krs`
- `IniciativaController` → `/api/iniciativas`

Cada controller contém:

- `@RestController`
- `@RequestMapping`
- Métodos HTTP: `@PostMapping`, `@GetMapping`, `@PutMapping`, `@DeleteMapping`

---

## 🔗 Exemplos de Endpoints

### 🔍 GET – Listar Objetivos
```
GET /api/objetivos
```

### 📝 POST – Criar Resultado-Chave
```
POST /api/krs
Body:
{
  "descricao": "Aumentar NPS",
  "meta": "Chegar a 85",
  "objetivoId": 1
}
```

### ✏️ PUT – Atualizar uma Iniciativa
```
PUT /api/iniciativas/3
Body:
{
  "titulo": "Nova campanha de marketing",
  "descricao": "Campanha com foco no WhatsApp",
  "porcentagemConclusao": 100
}
```

### ❌ DELETE – Excluir Objetivo
```
DELETE /api/objetivos/1
```

---

## 👥 Membros do Grupo

- Cristiano Morales – RA: 10437953
- João Trevisol – RA: 10277893
- Matheus Fernandes – RA: 10435788

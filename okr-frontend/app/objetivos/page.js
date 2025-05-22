'use client'

import { useEffect, useState } from 'react'

export default function ObjetivosPage() {
  const [objetivos, setObjetivos] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/objetivos')
      .then(response => response.json())
      .then(data => setObjetivos(data))
      .catch(error => console.error('Erro ao buscar objetivos:', error))
  }, [])

  return (
    <div style={{ padding: '1rem' }}>
      <a href="/objetivos/novo">
  <button style={{ marginBottom: '1rem' }}>➕ Criar Novo Objetivo</button>
</a>
      <h1>Lista de Objetivos</h1>
      {objetivos.length === 0 ? (
        <p>Nenhum objetivo encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {objetivos.map((objetivo) => (
            <li key={objetivo.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
              <h2>{objetivo.titulo}</h2>
              <p>{objetivo.descricao}</p>
              <strong>Conclusão: {objetivo.porcentagemConclusao.toFixed(2)}%</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

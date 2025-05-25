/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ObjetivosPage() {
  const [objetivos, setObjetivos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/objetivos')
      .then(res => res.json())
      .then(data => setObjetivos(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/objetivos/${id}`, { method: 'DELETE' });
    setObjetivos(objetivos.filter(obj => obj.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Objetivos</h1>
      <button
        onClick={() => router.push('/objetivos/novo')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
      >
        Criar novo Objetivo
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {objetivos.map(obj => (
          <li key={obj.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            background: '#f9f9f9'
          }}>
            <div><strong>{obj.titulo}</strong></div>
            <div>Descrição: {obj.descricao}</div>
            <div>Conclusão: {obj.porcentagemConclusao}%</div>
            <button
              onClick={() => handleDelete(obj.id)}
              style={{
                backgroundColor: '#ff6961',
                color: 'white',
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

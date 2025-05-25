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

export default function KRsPage() {
  const [krs, setKrs] = useState([]);  // Lista de Resultados-Chave
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/krs')
      .then(res => res.json())
      .then(data => setKrs(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/krs/${id}`, { method: 'DELETE' });
    setKrs(krs.filter(kr => kr.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Resultados-Chave</h1>
      <button
        onClick={() => router.push('/krs/novo')}
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
        Criar novo KR
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {krs.map(kr => (
          <li key={kr.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            background: '#f9f9f9'
          }}>
            <div><strong>{kr.descricao}</strong></div>
            <div>Meta: {kr.meta}</div>
            <div>Conclusão: {kr.porcentagemConclusao}%</div>
            <button
              onClick={() => handleDelete(kr.id)}
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

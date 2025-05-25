/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoObjetivo() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objetivo = { titulo, descricao };

    const res = await fetch('http://localhost:8080/api/objetivos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objetivo),
    });

    if (res.ok) {
      router.push('/objetivos');
    } else {
      alert('Erro ao criar objetivo');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Novo Objetivo</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          background: '#f9f9f9',
          maxWidth: '600px'
        }}
      >
        {/* Campo Título */}
        <div style={{ marginBottom: '15px' }}>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Descrição */}
        <div style={{ marginBottom: '15px' }}>
          <label>Descrição:</label><br />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Criar Objetivo
        </button>
      </form>
    </div>
  );
}

/*
 * Projeto: Sistema de Gestão de OKRs
 * Membros do grupo:
 * - Cristiano Morales – RA: 10437953
 * - João Trevisol – RA: 10277893
 * - Matheus Fernandes – RA: 10435788
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoKR() {
  const [descricao, setDescricao] = useState('');
  const [meta, setMeta] = useState('');
  const [objetivoId, setObjetivoId] = useState('');
  const [objetivos, setObjetivos] = useState([]);
  const router = useRouter();

  // Busca objetivos disponíveis para associar ao KR
  useEffect(() => {
    fetch('http://localhost:8080/api/objetivos')
      .then(res => res.json())
      .then(data => setObjetivos(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kr = { descricao, meta, objetivo: { id: objetivoId } };

    const res = await fetch('http://localhost:8080/api/krs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(kr),
    });

    if (res.ok) {
      router.push('/krs');
    } else {
      alert('Erro ao criar KR');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Novo Resultado-Chave</h1>
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
        {/* Campo Descrição */}
        <div style={{ marginBottom: '15px' }}>
          <label>Descrição:</label><br />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Meta */}
        <div style={{ marginBottom: '15px' }}>
          <label>Meta:</label><br />
          <input
            type="text"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo de seleção de Objetivo */}
        <div style={{ marginBottom: '15px' }}>
          <label>Objetivo:</label><br />
          <select
            value={objetivoId}
            onChange={(e) => setObjetivoId(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecione um objetivo</option>
            {objetivos.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.titulo}
              </option>
            ))}
          </select>
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
          Criar KR
        </button>
      </form>
    </div>
  );
}

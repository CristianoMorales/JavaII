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
    <div style={{ padding: '1rem' }}>
      <h1>Novo Objetivo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label><br />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Objetivo</button>
      </form>
    </div>
  );
}

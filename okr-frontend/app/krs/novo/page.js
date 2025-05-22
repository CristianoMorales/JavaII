'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoKR() {
  const [descricao, setDescricao] = useState('');
  const [meta, setMeta] = useState('');
  const [objetivoId, setObjetivoId] = useState('');
  const [objetivos, setObjetivos] = useState([]);
  const router = useRouter();

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
    <div style={{ padding: '1rem' }}>
      <h1>Novo Resultado-Chave</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição:</label><br />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Meta:</label><br />
          <input
            type="text"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Objetivo:</label><br />
          <select value={objetivoId} onChange={(e) => setObjetivoId(e.target.value)} required>
            <option value="">Selecione um objetivo</option>
            {objetivos.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Criar KR</button>
      </form>
    </div>
  );
}
